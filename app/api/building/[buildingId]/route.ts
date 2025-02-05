import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Fetch building details with rooms and floors
    try {
      const { buildingId, buildingName } = req.query;

      if (!buildingId || !buildingName) {
        return res.status(400).json({ message: 'Building ID and name are required' });
      }

      const building = await prisma.building.findUnique({
        where: { id: String(buildingId) },
        include: {
          floors: {
            include: {
              rooms: true,
            },
          },
        },
      });

      if (!building) {
        return res.status(404).json({ message: 'Building not found' });
      }

      const rooms = building.floors.flatMap((floor) =>
        floor.rooms.map((room) => ({
          floorNumber: floor.number,
          roomNumber: room.number,
          roomId: room.id,
        }))
      );

      return res.status(200).json({
        buildingId: building.id,
        buildingName: building.name,
        totalRooms: rooms.length,
        rooms,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error });
    }
  }

  if (req.method === 'POST') {
    // Create a new resident for a specific room
    try {
      const { name, email, phone, password, roomId, societyId } = req.body;

      if (!name || !email || !phone || !password || !roomId || !societyId) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const existingResident = await prisma.resident.findUnique({ where: { roomId } });
      if (existingResident) {
        return res.status(400).json({ message: 'Room already has a resident' });
      }

      const resident = await prisma.resident.create({
        data: {
          name,
          email,
          phone,
          password,
          room: { connect: { id: roomId } },
          society: { connect: { id: societyId } },
        },
      });

      return res.status(201).json({ message: 'Resident created successfully', resident });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
