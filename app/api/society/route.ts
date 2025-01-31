import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { sendMail } from "@/lib/email"; // Send temporary password
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import crypto from "crypto";

// const societySchema = z.object({
//   pinCode: z.string().length(6, "PinCode must be exactly 6 digits").regex(/^\d{6}$/, "PinCode must contain only numbers"),
//   email: z.string().email("Invalid email format"),
//   phone: z.string().length(10, "Phone number must be exactly 10 digits").regex(/^\d{10}$/, "Phone number must contain only numbers"),
// });
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);

    const { name, address, pinCode, email, phone, logo, members, buildings } = body;

    const existingSocietyByEmail = await db.society.findUnique({
      where: { email },
    });
    if (existingSocietyByEmail) {
      return NextResponse.json(
        { society: null, message: "Society with this email already exists" },
        { status: 409 }
      );
    }

    // Hash passwords for committee members and send temporary login credentials
    const hashedMembers = await Promise.all(
      members.map(async (member: any) => {
        const tempPassword = crypto.randomBytes(6).toString("hex");
        const hashedPassword = await hash(tempPassword, 10);

        await sendMail(
          member.email,
          "Your Society Committee Credentials",
          `Welcome to ${name} Society!
          You have been added as a ${member.role}.
          
          Login Details:
          Email : ${member.email}
          Temporary Password : ${tempPassword}
          
          Please change your password after logging in.`
        );

        return {
          ...member,
          password: hashedPassword,
        };
      })
    );

    // Create Society along with members and buildings
    const newSociety = await db.society.create({
      data: {
        name,
        address,
        pinCode,
        email,
        phone,
        logo: logo || null,
        members: {
          create: hashedMembers.map((member) => ({
            name: member.name,
            email: member.email,
            phone: member.phone,
            role: member.role,
            password: member.password,
          })),
        },
        buildings: {
          create: buildings.map((building: { name: string }) => ({
            name: building.name,
          })),
        },
      },
      include: {
        members: true, 
        buildings: true
      },
    });

    return NextResponse.json(
      {
        message: "Society registered successfully!",
        society: {
          ...newSociety,
          committeeMembers: newSociety.members.map(({ name, email, phone, role } : any) => ({
            name,
            email,
            phone,
            role,
          })),e
          buildings: newSociety.buildings.map(({ id, name } : any) => ({ id, name })),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
