import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || "587"),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: "webmail@jacobbrasil.com",
            subject: `New message from ${name}`,
            text: message,
        });

        await transporter.sendMail({
            from: `"Jacob Brasil" <noreply@jacobbrasil.com>`,
            to: email,
            subject: `Copy of your message to Jacob Brasil`,
            text: `Hello ${name},\nThis is a confirmation of receipt of your message. Please find a copy of your message below.\n\n${message}`,
        });

        return NextResponse.json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Email send error:", error);
        return NextResponse.json({ message: "Failed to send email" }, { status: 500 });
    }
}
