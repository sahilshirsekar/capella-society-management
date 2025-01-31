import nodemailer from "nodemailer";

export async function sendMail(to: string, subject: string, text: string) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"RamRajya - Society Management" <${process.env.EMAIL_USER}`,
    to,
    subject,
    text,
  });
}
