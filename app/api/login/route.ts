import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  const { email, password } = await request.json()

  try {
    const resident = await db.resident.findUnique({ where: { email } })

    if (!resident) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const isPasswordValid = await bcrypt.compare(password, resident.password)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }
    const accessToken = jwt.sign({ userId: resident.id, email: resident.email }, process.env.JWT_SECRET!, { expiresIn: "15m" })

    const refreshToken = jwt.sign({ userId: resident.id }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" })

    await db.resident.update({
      where: { id: resident.id },
      data: { refreshToken },
    });

    const isFirstLogin = resident.isFirstLogin; 

    return NextResponse.json({
      accessToken,
      refreshToken,
      user: {
        id: resident.id,
        name: resident.name,
        email: resident.email,
      },
      isFirstLogin,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  } finally {
    await db.$disconnect()
  }
}
