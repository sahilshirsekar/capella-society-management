import { z } from "zod";
import { hash } from "bcrypt";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const userSchema = z.object({
  email: z.string().email("Invalid email format"),
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Request body:", body); // Debug incoming data

    const { email, username, password } = userSchema.parse(body); // Validate input

    // Check if email already exists
    const existingUserByEmail = await db.user.findUnique({
      where: { email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Check if username already exists
    const existingUserByUsername = await db.user.findUnique({
      where: { username },
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        { user: null, message: "User with this username already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create new user
    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Exclude password from response
    const { password: _, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation errors:", error.errors);
      return NextResponse.json(
        { message: "Validation failed", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("Unexpected error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
