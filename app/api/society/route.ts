import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { z } from "zod"

// Define Zod schemas

const roomSchema = z.object({
  number: z.string(),
  // resident: residentSchema.nullable(),
})

const floorSchema = z.object({
  number: z.string(),
  rooms: z.array(roomSchema).nonempty("Each floor must have at least one room"),
})

const buildingSchema = z.object({
  name: z.string().min(3, "Building name must be at least 3 characters long"),
  floors: z.array(floorSchema).nonempty("Each building must have at least one floor"),
})

const memberSchema = z.object({
  name: z.string().min(3, "Member name must be at least 3 characters long"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  role: z.enum(["PRESIDENT", "VICE_PRESIDENT", "TREASURER", "ASSISTANT_TREASURER", "SECRETARY", "MEMBER"]),
})

const societySchema = z.object({
  name: z.string().min(3, "Society name must be at least 3 characters long"),
  societyNumber: z.string().min(3, "Society number is required"),
  address: z.string().min(5, "Address must be at least 5 characters long"),
  pinCode: z.string().min(6, "Pin Code must be at least 6 characters long"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  logo: z.string().url("Invalid logo URL").optional(),
  members: z.array(memberSchema).nonempty("At least one committee member is required"),
  buildings: z.array(buildingSchema).nonempty("At least one building is required"),
})

// Define TypeScript interfaces
// type Resident = z.infer<typeof residentSchema>;
type Room = z.infer<typeof roomSchema>
type Floor = z.infer<typeof floorSchema>
type Building = z.infer<typeof buildingSchema>
type Member = z.infer<typeof memberSchema>
type Society = z.infer<typeof societySchema>

export async function GET() {
  try {
    const societies = await db.society.findMany()
    return NextResponse.json({ societies }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 400,
      },
    )
  }
}

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json() // Ensure unknown type before validation

    console.log("Received Data:", body)
    if (!body) {
      return NextResponse.json({ message: "Request body is missing" }, { status: 400 })
    }

    // Validate request body
    const validatedData: Society = societySchema.parse(body)

    const { name, societyNumber, address, pinCode, email, phone, logo, members, buildings } = validatedData

    const existingSocietyByEmail = await db.society.findUnique({
      where: { email },
    })

    if (existingSocietyByEmail) {
      return NextResponse.json({ society: null, message: "Society with this email already exists" }, { status: 409 })
    }

    // Create Society with related buildings, floors, rooms, and residents
    console.log(
      "Final Payload Before Create:",
      JSON.stringify(
        {
          name,
          societyNumber,
          address,
          pinCode,
          email,
          phone,
          logo,
          members,
          buildings,
        },
        null,
        2,
      ),
    )
    const newSociety = await db.society.create({
      data: {
        name,
        societyNumber,
        address,
        pinCode,
        email,
        phone,
        logo: logo || null,
        members: {
          create: members.map((member: Member) => ({
            name: member.name,
            email: member.email,
            phone: member.phone,
            role: member.role,
          })),
        },
        buildings: {
          create: buildings.map((building: Building) => ({
            name: building.name,
            floors: {
              create:
                building.floors?.map((floor: Floor) => ({
                  number: floor.number,
                  rooms: {
                    create:
                      floor.rooms?.map((room: Room) => ({
                        number: room.number,
                      })) || [],
                  },
                })) || [],
            },
          })),
        },
      },
      include: {
        members: true,
        buildings: {
          include: {
            floors: {
              include: {
                rooms: true,
              },
            },
          },
        },
      },
    })

    console.log("Society created:", newSociety)

    return NextResponse.json(
      {
        message: "Society registered successfully!",
        society: {
          ...newSociety,
          buildings: newSociety.buildings.map((building) => ({
            id: building.id,
            name: building.name,
            floors: building.floors.map((floor) => ({
              id: floor.id,
              number: floor.number,
              rooms: floor.rooms.map((room) => ({
                id: room.id,
                number: room.number,
              })),
            })),
          })),
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation error", errors: error.errors }, { status: 400 })
    }

    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const url = new URL(req.url);
    const id = url.searchParams.get('id'); // Get id from query parameters

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }


    const validatedData = societySchema.parse(body)

    const updatedSociety = await db.society.update({
      where: { id },
      data: {
        name: validatedData.name,
        societyNumber: validatedData.societyNumber,
        address: validatedData.address,
        pinCode: validatedData.pinCode,
        email: validatedData.email,
        phone: validatedData.phone,
        logo: validatedData.logo,
        buildings: {
          deleteMany: {},
          create: validatedData.buildings.map((building) => ({
            name: building.name,
            floors: {
              create: building.floors.map((floor) => ({
                number: floor.number,
                rooms: {
                  create: floor.rooms.map((room) => ({
                    number: room.number,
                  })),
                },
              })),
            },
          })),
        },
        members: {
          deleteMany: {},
          create: validatedData.members.map((member) => ({
            name: member.name,
            email: member.email,
            phone: member.phone,
            role: member.role,
          })),
        },
      },
      include: {
        buildings: {
          include: {
            floors: {
              include: {
                rooms: true,
              },
            },
          },
        },
        members: true,
      },
    })

    return NextResponse.json({ society: updatedSociety }, { status: 200 })
  } catch (error) {
    console.error("Error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation error", errors: error.errors }, { status: 400 })
    }

    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

