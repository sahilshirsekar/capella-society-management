import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

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

export async function GET() {
  try {
    const polls = await db.poll.findMany();
    return NextResponse.json(polls, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching notices" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
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
