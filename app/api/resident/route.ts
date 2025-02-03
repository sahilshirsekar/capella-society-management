import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"; // Import bcrypt for hashing passwords
import * as z from "zod";

const residentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  societyId: z.string().cuid("Invalid Society ID format"),
  roomId: z.string().cuid("Invalid Room ID format"),
});

// Define TypeScript type based on the Zod schema
type ResidentInput = z.infer<typeof residentSchema>;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);
    const { name, email, phone, password, societyId, roomId } = body;
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { message: "Invalid JSON format" },
        { status: 400 }
      );
    }
    const parsedBody: ResidentInput = residentSchema.parse(body);

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create the new resident
    console.log(
      "Final payload : ",
      JSON.stringify({
        name,
        email,
        phone,
        password,
        societyId,
        roomId
      })
    );
    const newResident = await db.resident.create({
      data: {
        name: parsedBody.name,
        email: parsedBody.email,
        phone: parsedBody.phone,
        password: hashedPassword, // Save the hashed password
        society: {
          connect: { id: parsedBody.societyId }, // Connect resident to an existing society by ID
        },
        room: {
          connect: { id: parsedBody.roomId },
        },
      },
    });

    return NextResponse.json(
      { message: "Resident created successfully", newResident },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation Error", errors: error.flatten() },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
