"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

export default function Meteors({
  number = 24,
  className,
}: { number?: number; className?: string }) {
  const seeds = useMemo(
    () =>
      Array.from({ length: number }).map(() => ({
        top: Math.random() * 100,
        left: 60 + Math.random() * 60,   // start off to the right
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 8,
        size: 6 + Math.random() * 10,
        blur: Math.random() * 1.2,
      })),
    [number]
  );

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)}>
      {seeds.map((s, i) => (
        <span
          key={i}
          className="meteor"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            filter: `blur(${s.blur}px)`,
            animation: `meteor ${s.duration}s linear ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
