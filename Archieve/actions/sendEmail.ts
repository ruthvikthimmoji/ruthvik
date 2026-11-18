"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get("senderName");
  const email = formData.get("senderEmail");
  const message = formData.get("message");

  try {
    await resend.emails.send({
      from: "Portfolio Inquiry <onboarding@resend.dev>",
      to: "thimmojiruthvik@gmail.com", // Your email
      subject: `New Project Inquiry from ${name}`,
      replyTo: email as string,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
    });
    return { success: true };
  } catch (error) {
    return { error: "Failed to send email" };
  }
}