import { NextResponse } from "next/server";
import { Resend } from "resend";

// Force Node runtime (SDK needs Node APIs)
export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

// GET /api/contact -> quick health
export async function GET() {
  return NextResponse.json({
    ok: true,
    hasKey: Boolean(process.env.RESEND_API_KEY),
    fromSet: Boolean(process.env.CONTACT_FROM),
    toSet: Boolean(process.env.CONTACT_TO),
  });
}

export async function POST(req: Request) {
  try {
    const { name, email, message, company } = await req.json();

    // honeypot / basic validation
    if (company) return NextResponse.json({ ok: false, error: "bot" }, { status: 400 });
    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ ok: false, error: "No RESEND_API_KEY" }, { status: 500 });
    }
    if (!process.env.CONTACT_TO) {
      return NextResponse.json({ ok: false, error: "No CONTACT_TO" }, { status: 500 });
    }

    // For quick testing, allow Resend's onboarding sender if CONTACT_FROM is not set
    const from = process.env.CONTACT_FROM || "Portfolio Bot <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from,
      to: [process.env.CONTACT_TO],
      reply_to: email,
      subject: `Portfolio inquiry from ${name}`,
      html: `
        <div style="font-family:Inter,system-ui;line-height:1.6">
          <h2>New portfolio contact</h2>
          <p><b>Name:</b> ${String(name)}</p>
          <p><b>Email:</b> ${String(email)}</p>
          <p><b>Message:</b></p>
          <pre style="white-space:pre-wrap;background:#f6f7f9;padding:12px;border-radius:8px">${String(message)}</pre>
        </div>`,
    });

    if (error) {
      console.error("Resend error:", error);
      // Send the error back so the client can display it
      return NextResponse.json({ ok: false, error: String(error) }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json({ ok: false, error: err?.message || "Unknown error" }, { status: 500 });
  }
}
