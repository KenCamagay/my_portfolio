"use client";

import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Meteors from "@/components/ui/meteors"; 
import type { Project } from "@/data/projects";
import { useState } from "react";

type Props = {
  p: Project;
  priorityImage?: boolean;
  className?: string;
};

export default function ProjectCard({ p, priorityImage, className = "" }: Props) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const primaryHref = p.live ?? p.repo ?? "#";
  const isClickable = primaryHref !== "#";

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
    <article
      className={[
        // glassy bento look (inline, no @apply)
        "group relative overflow-hidden rounded-2xl md:rounded-[28px]",
        "border border-white/10",
        "bg-[radial-gradient(800px_400px_at_-10%_-10%,rgba(255,255,255,0.08),transparent),linear-gradient(to_bottom,rgba(255,255,255,0.06),rgba(255,255,255,0.03))]",
        "backdrop-blur",
        "shadow-[0_1px_0_rgba(255,255,255,0.08),0_20px_60px_-20px_rgba(0,0,0,0.5)]",
        "transition-transform duration-300 will-change-transform hover:-translate-y-[3px]",
        "hover:shadow-[0_1px_0_rgba(255,255,255,0.1),0_28px_80px_-28px_rgba(0,0,0,0.6)]",
        className,
      ].join(" ")}
    >
      {/* shine sweep */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl md:rounded-[28px]">
        <span className="absolute -inset-y-10 -left-1/3 w-1/2 rotate-12 bg-gradient-to-r from-white/0 via-white/10 to-white/0 blur-xl animate-[shine_3.5s_linear_infinite]" />
      </span>

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
    </article>
  );
}
