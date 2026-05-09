import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

const CONTACT_TO_EMAIL = "lucascanuto.contato@gmail.com";

/** Basic HTML-escape to prevent injection */
function esc(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const sendgridApiKey = process.env.SENDGRID_API_KEY;
    const fromEmail = process.env.SENDGRID_FROM_EMAIL || CONTACT_TO_EMAIL;
    const fromName = process.env.SENDGRID_FROM_NAME || "Portfolio Contact";

    if (!sendgridApiKey) {
      console.error("SENDGRID_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 }
      );
    }

    sgMail.setApiKey(sendgridApiKey);

    const safeName = esc(name);
    const safeEmail = esc(email);
    const safeMessage = esc(message);

    await sgMail.send({
      to: CONTACT_TO_EMAIL,
      from: { email: fromEmail, name: `${name} via ${fromName}` },
      replyTo: { email, name },
      subject: `Portfolio message from ${name} <${email}>`,
      categories: ["portfolio-contact"],
      text: [
        `From: ${name}`,
        `Email: ${email}`,
        "",
        message,
      ].join("\n"),
      html: `<p><b>From:</b> ${safeName} &lt;${safeEmail}&gt;</p>
<p><b>Message:</b></p>
<p>${safeMessage.replace(/\n/g, "<br>")}</p>`,
    });

    return NextResponse.json(
      { success: true, message: "Message sent!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("SendGrid error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
