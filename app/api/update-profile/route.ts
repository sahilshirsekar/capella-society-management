import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { verifyToken } from "@/lib/auth"
import { db } from "@/lib/db"
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  const token = request.headers.get("Authorization")?.split(" ")[1]

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const decoded = verifyToken(token)
    const userId = decoded.userId

    const formData = await request.formData()
    const name = formData.get("name") as string
    const phoneNumber = formData.get("phoneNumber") as string
    const newPassword = formData.get("newPassword") as string
    const profilePicture = formData.get("profilePicture") as File | null

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    const newRefreshToken = jwt.sign(
      { userId },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" }
    );

    // Update user profile in the database
    const updatedResident = await db.resident.update({
      where: { id: userId },
      data: {
        name,
        phone: phoneNumber,
        password: hashedPassword,
        refreshToken: newRefreshToken, 
        isFirstLogin: false
      },
    })

    return NextResponse.json({
      message: "Profile updated successfully",
      user: {
        id: updatedResident.id,
        name: updatedResident.name,
        email: updatedResident.email,
      },
      refreshToken: newRefreshToken
    })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  } finally {
    await db.$disconnect()
  }
}
