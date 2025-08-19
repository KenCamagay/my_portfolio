"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  phrases: string[];
  typingSpeed?: number;     // ms per character while typing
  deletingSpeed?: number;   // ms per character while deleting
  holdTime?: number;        // ms to hold full text before deleting
  className?: string;
};

export default function AnimatedTagline({
  phrases,
  typingSpeed = 40,
  deletingSpeed = 28,
  holdTime = 1200,
  className = "",
}: Props) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState("");
  const [mode, setMode] = useState<"typing" | "holding" | "deleting">("typing");

  useEffect(() => {
    if (phrases.length === 0) return;
    const current = phrases[index % phrases.length];

    if (mode === "typing") {
      if (sub.length < current.length) {
        const t = setTimeout(() => setSub(current.slice(0, sub.length + 1)), typingSpeed);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setMode("holding"), holdTime);
        return () => clearTimeout(t);
      }
    }

    if (mode === "holding") {
      const t = setTimeout(() => setMode("deleting"), holdTime / 2);
      return () => clearTimeout(t);
    }

    if (mode === "deleting") {
      if (sub.length > 0) {
        const t = setTimeout(() => setSub(sub.slice(0, -1)), deletingSpeed);
        return () => clearTimeout(t);
      } else {
        setIndex((i) => (i + 1) % phrases.length);
        setMode("typing");
      }
    }
  }, [sub, mode, index, phrases, typingSpeed, deletingSpeed, holdTime]);

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index} // lets us fade slightly when phrase changes
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.8 }}
          transition={{ duration: 0.25 }}
          className="inline-flex items-center"
        >
          <span className="whitespace-pre-wrap">{sub}</span>
          {/* caret */}
          <span className="ml-1 inline-block w-[2px] h-[1.2em] translate-y-[2px] bg-white/80 animate-[blink_1.15s_steps(2,start)_infinite]" />
        </motion.div>
      </AnimatePresence>
      {/* caret blink keyframes (scoped) */}
      <style jsx>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
