import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { sendEmail } from "@/lib/email"; // Send temporary password
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

// const societySchema = z.object({
//   pinCode: z.string().length(6, "PinCode must be exactly 6 digits").regex(/^\d{6}$/, "PinCode must contain only numbers"),
//   email: z.string().email("Invalid email format"),
//   phone: z.string().length(10, "Phone number must be exactly 10 digits").regex(/^\d{10}$/, "Phone number must contain only numbers"),
// });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);

    const { name, address, pinCode, email, phone, logo, members } = body;

    const existingSocietyByEmail = await db.society.findUnique({
      where: { email },
    });
    if (existingSocietyByEmail) {
      return NextResponse.json(
        {
          society: null,
          message: "Society with this email already exists",
        },
        {
          status: 409,
        }
      );
    }

    // const existingSocietyByName = await db.society.findUnique({
    //   where: { name },
    // });
    // if (existingSocietyByName) {
    //   return NextResponse.json(
    //     { society: null, message: "Society with this name already exists" },
    //     { status: 409 }
    //   );
    // }

    const hashedMembers = await Promise.all(
      members.map(async (member: any) => {
        const hashedPassword = await hash(member.password, 10);
        return {
          ...member,
          password: hashedPassword,
        };
      })
    );

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
      },
      include: { members: true },
    });

    return NextResponse.json(
      {
        message: "Society registered successfully!",
        society: {
          ...newSociety,
          committeeMembers: newSociety.members.map(
            ({ name , email, phone, role}) => ({
              name, email, phone, role
            })
          ),
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    const societies = await db.society.findMany({
      include: {
        members: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true, 
          },
        },
      },
    });

    return NextResponse.json({ societies }, { status: 200 });
  } catch (error) {
    console.error("Error fetching societies:", error);
    return NextResponse.json(
      { message: "Failed to fetch societies" },
      { status: 500 }
    );
  }
}