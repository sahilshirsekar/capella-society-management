import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const { refreshToken } = await request.json();

  if (!refreshToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);
    const userId = (decoded as any).userId;

    // Retrieve the stored refresh token from the database
    const resident = await db.resident.findUnique({
      where: { id: userId },
      select: { refreshToken: true },
    });

    if (!resident || resident.refreshToken !== refreshToken) {
      return NextResponse.json({ error: "Invalid refresh token" }, { status: 403 });
    }

    // Generate a new access token
    const newAccessToken = jwt.sign(
      { userId },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    return NextResponse.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Refresh token error:", error);
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
  }
}
