"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });

async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setStatus("sending");

  const form = e.currentTarget;
  const payload = {
    name: (form.elements.namedItem("name") as HTMLInputElement).value,
    email: (form.elements.namedItem("email") as HTMLInputElement).value,
    message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    company: (form.elements.namedItem("company") as HTMLInputElement).value,
  };

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // Try JSON, fall back to text so we see any error
    let data: any = {};
    const text = await res.text();
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    if (!res.ok) {
      console.error("Contact failed:", { status: res.status, data });
      throw new Error(data?.error || `HTTP ${res.status}`);
    }

    setStatus("sent");
    form.reset();
  } catch (err) {
    console.error(err);
    setStatus("error");
  }
}



  // shared transitions
  const t = { duration: 0.6, ease: "easeOut" };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-20 md:py-28 bg-zinc-950"
      aria-labelledby="contact-heading"
    >

      <div className="pointer-events-none absolute inset-0 -z-10">

        <div className="absolute inset-0 bg-[radial-gradient(1000px_500px_at_-10%_-10%,rgba(255,255,255,0.06),transparent),linear-gradient(to_bottom,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]" />

        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-600/20 blur-3xl" />
        <div className="absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-orange-900/25 blur-3xl" />
      </div>

      <div
    ref={ref}
    className="
        mx-auto grid max-w-8xl grid-cols-1 items-start 
        gap-10 px-20
        md:grid-cols-2 
        md:gap-12 
        lg:gap-20 
        xl:gap-38
    "
    >


        <motion.div
          initial={{ opacity: 0, x: -60, y: 24 }}
          animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0.35, x: -60, y: 12 }}
          transition={t}
          className="relative"
        >
        
            <span className="absolute -inset-y-16 -left-1/3 w-1/2 rotate-12 
                bg-gradient-to-r from-transparent via-white/5 to-transparent 
                blur-2xl opacity-40 animate-[shine_5s_linear_infinite]" />

          <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold tracking-tight">
            Let’s{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300">
              talk
            </span>
          </h2>
          <p className="mt-3 text-zinc-300/80 max-w-prose">
            Tell me about your idea, collaboration, or internship opportunity. I read every message
            and usually reply within a day.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            {/* honeypot */}
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Your Name" htmlFor="name">
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="Jane Doe"
                  className="w-full rounded-xl bg-zinc-900/70 border border-white/10 px-4 py-3 text-white placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-amber-400/60"
                />
              </Field>
              <Field label="Your Email" htmlFor="email">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="w-full rounded-xl bg-zinc-900/70 border border-white/10 px-4 py-3 text-white placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-amber-400/60"
                />
              </Field>
            </div>

            <Field label="Your Message" htmlFor="message">
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Hi Ken, I’m interested in working together on..."
                className="w-full resize-none rounded-xl bg-zinc-900/70 border border-white/10 px-4 py-3 text-white placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-amber-400/60"
              />
            </Field>

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-5 py-3 font-semibold text-zinc-950 shadow-[0_10px_30px_-10px_rgba(245,158,11,0.55)] transition hover:brightness-95 disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>

            {status === "sent" && (
              <p className="text-sm text-emerald-300/90">Thanks! I’ll get back to you soon.</p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-300/90">Something went wrong. Try again or email me directly.</p>
            )}
          </form>
        </motion.div>

        {/* RIGHT: info card */}
        <motion.div
          initial={{ opacity: 0, x: 60, y: 24 }}
          animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0.35, x: 60, y: 12 }}
          transition={{ ...t, delay: 0.06 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/70 p-6 md:p-8 backdrop-blur">
            {/* subtle brown gloss */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_300px_at_110%_-10%,rgba(255,255,255,0.08),transparent)]" />
            {/* shine sweep */}
            <span className="pointer-events-none absolute inset-0 overflow-hidden">
              <span className="absolute -inset-y-14 -left-1/3 w-1/2 rotate-12 bg-gradient-to-r from-white/0 via-white/10 to-white/0 blur-xl animate-[shine_4s_linear_infinite]" />
            </span>

            <div className="relative z-10 grid gap-4">
              <InfoRow label="Email" value="kencamagay03@gmail.com" href="mailto:you@yourdomain.com" />
              <InfoRow label="Location" value="Calasiao, Pangasinan, Philippines (UTC+8)" />
              <InfoRow label="Available for" value="Internships, Collabs, Freelance" />
              <div className="mt-4 flex flex-wrap gap-3">
                <ContactPill href="https://github.com/KenCamagay">GitHub</ContactPill>
                <ContactPill href="https://www.linkedin.com/in/ken-camagay-530441380/">LinkedIn</ContactPill>
                <ContactPill href="https://www.facebook.com/ken.devenecia.98">FaceBook</ContactPill>
              </div>
            </div>

            {/* warm accent blob */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-amber-500/25 blur-3xl"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1 block text-sm text-zinc-300/80">{label}</span>
      {children}
    </label>
  );
}

function InfoRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center justify-between gap-6 rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3">
      <span className="text-zinc-300/70 text-sm">{label}</span>
      <span className="text-zinc-100 text-sm font-medium">{value}</span>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className="block hover:opacity-90 transition">
      {content}
    </a>
  ) : (
    content
  );
}

function ContactPill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="rounded-full border border-white/10 bg-zinc-900/70 px-4 py-1.5 text-sm text-zinc-100 hover:bg-zinc-800/70 transition"
    >
      {children}
    </a>
  );
}
