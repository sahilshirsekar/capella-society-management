import { db } from "@/lib/db";
import { error } from "console";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

async function verifyToken(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return null;
  }
}

//create notice (admin only)
export async function POST(request: Request) {
  const user = await verifyToken(request);
  if (!user)
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const { title, description, attachments, expiresAt, societyId } =
    await request.json();

  try {
    const notice = await db.notice.create({
      data: {
        title,
        description,
        attachments,
        expiresAt,
        societyId,
      },
    });
    return NextResponse.json(notice, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating notice" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const notices = await db.notice.findMany();
    return NextResponse.json(notices, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching notices" },
      { status: 500 }
    );
  }
}

export async function createPoll(request: Request) {
  const user = await verifyToken(request);
  if (!user)
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const { question, options, expiresAt, societyId } = await request.json();

  try {
    const poll = await db.poll.create({
      data: {
        question,
        options,
        votes: {},
        expiresAt,
        societyId,
      },
    });
    return NextResponse.json(poll, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating poll" }, { status: 500 });
  }
}

export async function PUT(request: Request) { 
  const user = await verifyToken(request);
  if (!user)
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const { pollId, option } = await request.json();
  try {
    const poll = await db.poll.findUnique({
      where: { id: pollId },
    });

    let votes: Record<string, number> = (poll?.votes as Record<string, number>) || {};
    votes[option] = (votes[option] || 0) + 1;

    const updatedPoll = await db.poll.update({
      where: { id: pollId },
      data: { votes },
    });

    return NextResponse.json(updatedPoll);
  } catch (error) {
    return NextResponse.json(
      { error: "Error voting in poll" },
      { status: 500 }
    );
  }
}

