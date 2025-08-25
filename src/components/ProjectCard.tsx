"use client";

import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import type { Project } from "@/data/projects";
import { useState, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";

type Props = {
  p: Project;
  priorityImage?: boolean;
  className?: string;
};

export default function ProjectCard({ p, priorityImage, className = "" }: Props) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const primaryHref = p.live ?? p.repo ?? "#";
  const isClickable = primaryHref !== "#";

  // in‑view state to sync bg + content
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px", amount: 0.35 });

  // tiny mouse parallax (background only)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-40, 40], [3, -3]);
  const rotateY = useTransform(mx, [-40, 40], [-3, 3]);

  const CardWrapper = ({ children }: { children: React.ReactNode }) =>
    isClickable ? (
      <Link
        href={primaryHref}
        target={primaryHref.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        aria-label={`${p.title} — open ${p.live ? "live site" : "repository"}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-2xl"
      >
        {children}
      </Link>
    ) : (
      <div className="rounded-2xl">{children}</div>
    );

  function Action({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
    if (isClickable) {
      return (
        <button
          type="button"
          aria-label={label}
          className="underline hover:opacity-80"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open(href, "_blank", "noopener,noreferrer");
          }}
        >
          {children}
        </button>
      );
    }
    return (
      <Link href={href} target="_blank" rel="noreferrer" className="underline hover:opacity-80" aria-label={label}>
        {children}
      </Link>
    );
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        mx.set(e.clientX - (rect.left + rect.width / 2));
        my.set(e.clientY - (rect.top + rect.height / 2));
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.65, y: 12, scale: 0.995 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={[
        "group relative overflow-hidden rounded-2xl md:rounded-[28px]",
        "border border-white/10 backdrop-blur",
        "shadow-[0_1px_0_rgba(255,255,255,0.08),0_20px_60px_-20px_rgba(0,0,0,0.5)]",
        "bg-transparent", // bg handled by animated layers below
        "transition-transform duration-300 will-change-transform hover:-translate-y-[3px]",
        "hover:shadow-[0_1px_0_rgba(255,255,255,0.1),_0_28px_80px_-28px_rgba(0,0,0,0.6)]",
        className,
      ].join(" ")}
      style={{ perspective: 800 }}
    >
      {/* ==== SYNced BACKGROUND LAYERS ==== */}
      {/* radial + linear glass gradient */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-2xl md:rounded-[28px]"
        initial={{ opacity: 0, scale: 0.98, backgroundPosition: "0% 0%" }}
        animate={
          inView
            ? { opacity: 1, scale: 1, backgroundPosition: "100% 100%" }
            : { opacity: 0.6, scale: 0.995, backgroundPosition: "0% 0%" }
        }
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          backgroundImage:
            "radial-gradient(800px 400px at -10% -10%, rgba(255,255,255,0.08), transparent), linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
          backgroundSize: "200% 200%",
          rotateX,
          rotateY,
        }}
      />
      {/* shine sweep tied to view */}
      <motion.span
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl md:rounded-[28px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0.5 }}
        transition={{ duration: 0.4 }}
      >
        <motion.span
          className="absolute -inset-y-10 -left-1/3 w-1/2 rotate-12 bg-gradient-to-r from-white/0 via-white/10 to-white/0 blur-xl"
          animate={{ x: inView ? ["-20%", "140%"] : "-20%" }}
          transition={{ duration: 3.8, ease: "linear", repeat: inView ? Infinity : 0 }}
        />
      </motion.span>

      <CardWrapper>
        {/* Image */}
        <div className="relative aspect-[3/2] w-full overflow-hidden">
          <div className="absolute inset-0 rounded-2xl md:rounded-[28px] ring-0 ring-white/0 transition-all duration-300 group-hover:ring-1 group-hover:ring-white/10 pointer-events-none" />
          {p.image && (
            <Image
              src={p.image}
              alt={`${p.title} preview`}
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className={`object-cover transition-transform duration-500 group-hover:scale-[1.03] ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
              priority={priorityImage}
              onLoad={() => setImgLoaded(true)}
            />
          )}
          {!imgLoaded && <div className="absolute inset-0 animate-pulse bg-white/10" />}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 via-black/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="mb-2 flex items-center gap-2">
            <Badge>{p.tag}</Badge>
          </div>

          <h3 className="text-lg font-semibold leading-snug">{p.title}</h3>
          <p className="mt-2 text-sm text-white/70">{p.description}</p>

          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
            {p.tech.map((t) => (
              <span key={t} className="text-[11px] uppercase tracking-wide text-white/60">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
            {p.live && (
              <Action href={p.live} label={`${p.title} live demo`}>
                Live
              </Action>
            )}
            {p.repo && (
              <Action href={p.repo} label={`${p.title} repository`}>
                Code
              </Action>
            )}
          </div>
        </div>
      </CardWrapper>
    </motion.article>
  );
}
