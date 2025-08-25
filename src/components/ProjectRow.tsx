"use client";

import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import type { Project } from "@/data/projects";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ProjectRow({ p, reversed }: { p: Project; reversed?: boolean }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rowRef, { margin: "-20% 0px -20% 0px", amount: 0.3 });

  const OFFSET = 80;
  const imgFromX = reversed ? OFFSET : -OFFSET;
  const textFromX = reversed ? OFFSET - 20 : -(OFFSET - 20);

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.4, y: 12, scale: 0.995 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative w-full max-w-[1600px] px-6 md:px-12 py-8 md:py-12 rounded-2xl md:rounded-[32px] overflow-hidden border border-white/10 backdrop-blur shadow-[0_1px_0_rgba(255,255,255,0.08),0_30px_80px_-30px_rgba(0,0,0,0.6)]"
    >
      {/* === BG that syncs with inView === */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-2xl md:rounded-[32px]"
        initial={{ opacity: 0, scale: 0.98, backgroundPosition: "0% 0%" }}
        animate={
          inView
            ? { opacity: 1, scale: 1, backgroundPosition: "100% 100%" }
            : { opacity: 0.6, scale: 0.995, backgroundPosition: "0% 0%" }
        }
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          backgroundImage:
            "radial-gradient(900px 500px at 0% 0%, rgba(255,255,255,0.07), transparent), linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(255,255,255,0.025))",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Shine sweep across row (runs only when visible) */}
      <motion.span
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl md:rounded-[32px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0.5 }}
        transition={{ duration: 0.4 }}
      >
        <motion.span
          className="absolute -inset-y-10 -left-1/3 w-1/2 rotate-12 bg-gradient-to-r from-white/0 via-white/10 to-white/0 blur-xl"
          animate={{ x: inView ? ["-20%", "140%"] : "-20%" }}
          transition={{ duration: 5, ease: "linear", repeat: inView ? Infinity : 0 }}
        />
      </motion.span>

      {/* Inner grid */}
      <div
        className={[
          "relative grid items-center md:grid-cols-2 gap-8 md:gap-12 will-change-transform",
          reversed
            ? "md:translate-x-[20px] lg:translate-x-[40px] xl:translate-x-[56px]"
            : "md:-translate-x-[20px] lg:-translate-x-[40px] xl:-translate-x-[56px]",
        ].join(" ")}
      >
        {/* Image column */}
        <motion.div
          initial={{ opacity: 0, y: 24, x: imgFromX }}
          animate={inView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0.35, y: 16, x: imgFromX }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className={reversed ? "md:order-2" : ""}
        >
          <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden">
            {p.image && (
              <Image
                src={p.image}
                alt={`${p.title} preview`}
                fill
                sizes="(min-width: 1536px) 800px, (min-width: 1024px) 600px, 100vw"
                className="object-cover"
              />
            )}
          </div>
        </motion.div>

        {/* Text column */}
        <motion.div
          initial={{ opacity: 0, y: 28, x: textFromX }}
          animate={inView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0.35, y: 18, x: textFromX }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
          className={reversed ? "md:order-1" : ""}
        >
          <Badge>{p.tag}</Badge>
          <h3 className="mt-4 text-3xl font-semibold">{p.title}</h3>
          <p className="mt-4 text-white/70 leading-relaxed text-lg">{p.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {p.tech.map((t) => (
              <span key={t} className="text-[13px] uppercase tracking-wide text-white/60">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-7 flex gap-6 text-base">
            {p.live && (
              <Link href={p.live} target="_blank" rel="noreferrer" className="underline hover:opacity-80">
                Live
              </Link>
            )}
            {p.repo && (
              <Link href={p.repo} target="_blank" rel="noreferrer" className="underline hover:opacity-80">
                Code
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
