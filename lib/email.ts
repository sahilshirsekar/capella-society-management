import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // or use SMTP settings for production
  auth: {
    user: process.env.EMAIL_USER, // Your email (e.g., Gmail, SendGrid)
    pass: process.env.EMAIL_PASS, // Your email app password
  },
});

/**
 * Sends an email with the given subject and content.
 * @param to Recipient email address
 * @param subject Email subject
 * @param text Plain text content of the email
 */
export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};
