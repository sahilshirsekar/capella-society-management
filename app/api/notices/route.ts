import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const data = {
  user: {
    name: "ramrajya",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

// Create Notice (Requires Auth)

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  console.log("Session data :", session);

  // ✅ Ensure user is authenticated
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { title, description, attachments, expiresAt, societyId } =
      await request.json();

    // ✅ Validate required fields
    if (!title || !description || !expiresAt || !societyId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Create notice
    const notice = await db.notice.create({
      data: {
        title,
        description,
        attachments: attachments ?? [],
        expiresAt: new Date(expiresAt),
        societyId,
      },
    });

    return NextResponse.json(notice, { status: 201 });
  } catch (error) {
    console.error("Error creating notice:", error);
    return NextResponse.json(
      { error: "Error creating notice" },
      { status: 500 }
    );
  }
}

// Fetch Notices (Only Active Notices)
export async function GET() {
  try {
    const notices = await db.notice.findMany({
      where: {
        expiresAt: {
          gte: new Date(), // Fetch only non-expired notices
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(notices, { status: 200 });
  } catch (error) {
    console.error("Error fetching notices:", error);
    return NextResponse.json(
      { error: "Error fetching notices" },
      { status: 500 }
    );
  }
}
