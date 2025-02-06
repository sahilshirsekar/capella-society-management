import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"; // For hashing passwords
import * as z from "zod";
import { sendMail } from "@/lib/email"; // Import sendMail from email.ts

const residentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  societyId: z.string().cuid("Invalid Society ID format"),
  roomId: z.string().cuid("Invalid Room ID format"),
});

// Define TypeScript type based on the Zod schema
type ResidentInput = z.infer<typeof residentSchema>;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedBody: ResidentInput = residentSchema.parse(body);
    console.log(parsedBody)

    // Check if the room is already assigned to a resident
    const existingResident = await db.resident.findUnique({
      where: { roomId: parsedBody.roomId },
    });

    if (existingResident) {
      return NextResponse.json(
        { message: "A resident is already assigned to this room." },
        { status: 400 }
      );
    }

    // Generate a temporary password
    const tempPassword = Math.random().toString(36).slice(-8);

    // Hash the temporary password
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // Create the new resident
    const newResident = await db.resident.create({
      data: {
        name: parsedBody.name,
        email: parsedBody.email,
        phone: parsedBody.phone,
        password: hashedPassword, // Save hashed temporary password
        society: {
          connect: { id: parsedBody.societyId },  // Connect resident to an existing society by ID
        },
        room: {
          connect: { id: parsedBody.roomId },
        },
      },
    });

    // Email content
    const emailSubject = "Welcome to RamRajya - Society Management";
    const emailText = `Hi ${parsedBody.name},

Welcome to RamRajya Society Management! Below are your account details:

- Room ID: ${parsedBody.roomId}
- Email: ${parsedBody.email}
- Temporary Password: ${tempPassword}

Please log in and change your password immediately for security purposes.

Best regards,
RamRajya - Society Management Team`;

    // Send the email
    await sendMail(parsedBody.email, emailSubject, emailText);

    return NextResponse.json(
      { message: "Resident created successfully, and email sent.", newResident },
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
