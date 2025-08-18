"use client";

import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import SplitText from "@/components/SplitText";
import type { Project } from "@/data/projects";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ProjectRow({ p, reversed }: { p: Project; reversed?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.35, y: 16 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`grid gap-8 md:gap-16 items-center md:grid-cols-2 w-full max-w-6xl`} // bigger width + gap
    >
      {/* Image */}
      <div
        className={`relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-white/5 shadow-lg ${
          reversed ? "md:order-2" : ""
        }`}
      >
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

      {/* Text */}
      <div className={`${reversed ? "md:order-1" : ""}`}>
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
      </div>
    </motion.div>
  );
}
