import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { sendEmail } from "@/lib/email"; // Send temporary password
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, address, pinCode, email, phone, logo, members } = req.body;

    // Validate minimum 5 members
    if (members.length < 5 || members.length > 10) {
      return res.status(400).json({ error: "Committee must have 5 to 10 members" });
    }

    // Create society
    const society = await db.society.create({
      data: { name, address, pinCode, email, phone, logo },
    });

    // Store members with temporary password
    for (const member of members) {
      const tempPassword = Math.random().toString(36).slice(-8); // Generate temp password
      const hashedPassword = await hash(tempPassword, 10);

      await db.committeeMember.create({
        data: {
          societyId: society.id,
          name: member.name,
          email: member.email,
          phone: member.phone,
          role: member.role,
          password: hashedPassword,
        },
      });

      // Send email with temp password
      await sendEmail(member.email, "Your Admin Login", `Your temporary password: ${tempPassword}`);
    }

    return res.status(201).json({ message: "Society registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
}
