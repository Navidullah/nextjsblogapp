import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { email, message } = await request.json();
    if (!email || !message) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Contact Message",
      text: `From: ${email}\n\n${message}`, // <--- user's email in message
      replyTo: email, // <--- this helps with the next point
    });

    return Response.json({ success: true });
  } catch (e) {
    return Response.json({ error: "Failed to send message" }, { status: 500 });
  }
}
