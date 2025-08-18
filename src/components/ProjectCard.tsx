"use client";

import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import type { Project } from "@/data/projects";
import { useState } from "react";

type Props = {
  p: Project;
  priorityImage?: boolean;
  className?: string;
};

export default function ProjectCard({ p, priorityImage, className = "" }: Props) {
  const [imgLoaded, setImgLoaded] = useState(false);

  // Prefer a single primary link: "live" > "repo" > "#"
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

  // Inner action element: avoid nested <a> when outer is a link
  function Action({
    href,
    label,
    children,
  }: {
    href: string;
    label: string;
    children: React.ReactNode;
  }) {
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
      <Link
        href={href}
        target="_blank"
        rel="noreferrer"
        className="underline hover:opacity-80"
        aria-label={label}
      >
        {children}
      </Link>
    );
  }

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition hover:border-white/20 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08)] ${className}`}
    >
      <CardWrapper>
        {/* Image */}
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-white/5">
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
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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

          {/* Actions: NEVER render <a> inside the outer <a> */}
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
