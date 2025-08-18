"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo } from "react";

type Props = {
  text: string;
  className?: string; // e.g., "text-2xl font-semibold"
};

// Splits text into characters and floats each a bit on scroll
export default function ScrollFloatTitle({ text, className = "" }: Props) {
  const { scrollYProgress } = useScroll();

  const chars = useMemo(() => text.split(""), [text]);

  return (
    <div className={`flex select-none flex-wrap ${className}`} aria-label={text}>
      {chars.map((ch, i) => {
        // create a tiny phase shift per character
        const start = i * 0.002;
        const end = start + 0.6;

        // Move each char up/down slightly as you scroll
        const y = useTransform(scrollYProgress, [start, end], [-4, 4]);
        const opacity = useTransform(scrollYProgress, [start, end], [0.95, 1]);

        return (
          <motion.span
            key={i + ch}
            style={{ y, opacity }}
            className="inline-block"
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        );
      })}
    </div>
  );
}
