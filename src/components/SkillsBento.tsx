"use client";

import { motion } from "framer-motion";
import TechStackHover from "@/components/TechStackHover";

// Parent/child variants for staggered entrance
const parent = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const child = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function SkillsBento() {
  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="max-w-full px-4 sm:px-6 md:px-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-12">
          Skills
        </h2>

        {/* GRID: mobile auto height; md+ fixed row height */}
        <motion.div
          variants={parent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 md:grid-cols-6 auto-rows-auto md:auto-rows-[220px]"
        >
          {/* ===== Languages (Hero) ===== */}
          <motion.div
            variants={child}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
            className="
              relative md:col-span-3 md:row-span-2
              rounded-2xl md:rounded-[32px]
              p-5 sm:p-6 md:p-8 lg:p-10
              bg-[radial-gradient(800px_400px_at_-10%_-10%,rgba(255,255,255,0.08),transparent),linear-gradient(to_bottom,rgba(255,255,255,0.06),rgba(255,255,255,0.03))]
              border border-white/10 shadow-[0_1px_0_rgba(255,255,255,0.08),0_30px_80px_-30px_rgba(0,0,0,0.6)]
              backdrop-blur overflow-hidden flex flex-col
            "
          >
            {/* floaty corner glow */}
            <motion.div
              initial={{ y: 0, opacity: 0.7 }}
              animate={{ y: [-4, 4, -4], opacity: [0.6, 0.8, 0.6] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute -right-24 -top-24 h-40 w-40 md:h-64 md:w-64 rounded-full bg-white/5 blur-2xl"
            />
            {/* shine sweep */}
            <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl md:rounded-[32px]">
              <span className="absolute -inset-y-10 -left-1/3 w-1/2 rotate-12 bg-gradient-to-r from-white/0 via-white/10 to-white/0 blur-xl animate-[shine_3.5s_linear_infinite]" />
            </span>

            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] sm:text-[11px] uppercase tracking-wide text-white/70 w-fit">
              Languages
            </div>

            <h3 className="mt-3 md:mt-4 text-xl sm:text-2xl md:text-3xl font-semibold text-white/95">
              Daily Drivers &amp; Foundations
            </h3>
            <p className="mt-1.5 md:mt-2 text-xs sm:text-sm md:text-base text-white/65">
              Hover to explore my core languages and frameworks.
            </p>

            {/* Tech pills (transparent bg) */}
            <div className="mt-4 sm:mt-6 lg:mt-8 min-h-[96px] sm:min-h-[120px] md:min-h-[140px]">
              <TechStackHover />
            </div>

            {/* condensed tech line */}
            <div className="mt-4 md:mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[11px] md:text-[12px] text-white/55">
              <span>React</span><span>Tailwind</span><span>Laravel</span><span>PHP</span>
              <span>JavaScript</span><span>C#</span><span>Java</span><span>HTML</span>
              <span>CSS</span><span>MySQL</span><span>PostgreSQL</span><span>Firebase</span>
            </div>
          </motion.div>

          {/* ===== Technical Skills (Hero) ===== */}
          <motion.div
            variants={child}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
            className="
              relative md:col-span-3 md:row-span-2
              rounded-2xl md:rounded-[32px]
              p-5 sm:p-6 md:p-8 lg:p-10
              bg-[radial-gradient(800px_400px_at_110%_-10%,rgba(255,255,255,0.08),transparent),linear-gradient(to_bottom,rgba(255,255,255,0.06),rgba(255,255,255,0.03))]
              border border-white/10 shadow-[0_1px_0_rgba(255,255,255,0.08),0_30px_80px_-30px_rgba(0,0,0,0.6)]
              backdrop-blur overflow-hidden flex flex-col
            "
          >
            {/* shine sweep */}
            <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl md:rounded-[32px]">
              <span className="absolute -inset-y-10 -left-1/3 w-1/2 rotate-12 bg-gradient-to-r from-white/0 via-white/10 to-white/0 blur-xl animate-[shine_3.5s_linear_infinite]" />
            </span>

            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] sm:text-[11px] uppercase tracking-wide text-white/70 w-fit">
              Built for speed
            </div>

            <h3 className="mt-3 md:mt-4 text-xl sm:text-2xl md:text-3xl font-semibold text-white/95">
              Technical Skills
            </h3>
            <p className="mt-1.5 md:mt-2 text-xs sm:text-sm md:text-base text-white/65">
              Ship polished apps quickly: web, mobile, APIs, and integrations.
            </p>

            <ul className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 sm:gap-y-2 gap-x-6 sm:gap-x-8 text-sm md:text-[15px] text-white/85">
              <li className="list-disc marker:text-white/40 ml-5">Web Development</li>
              <li className="list-disc marker:text-white/40 ml-5">Mobile Development</li>
              <li className="list-disc marker:text-white/40 ml-5">REST APIs</li>
              <li className="list-disc marker:text-white/40 ml-5">Auth &amp; Security</li>
              <li className="list-disc marker:text-white/40 ml-5">Realtime &amp; Chat</li>
              <li className="list-disc marker:text-white/40 ml-5">AI Integration</li>
            </ul>

            <div className="mt-4 md:mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[11px] md:text-[12px] text-white/55">
              <span>Next.js</span><span>Flutter</span><span>Firebase</span>
              <span>FastAPI</span><span>Bootstrap</span><span>Tailwind</span>
            </div>
          </motion.div>

          {/* ===== Row 2 tiles ===== */}
          <Tile
            title="Tools"
            subtitle="Everyday Stack"
            items={["Git & GitHub", "VS Code", "Postman", "Figma"]}
            i={2}
          />
          <Tile
            title="Databases"
            subtitle="Storage & Data"
            items={["MySQL", "PostgreSQL", "Firebase", "SQLite"]}
            i={3}
            extra="md:row-span-1"
          />
          <Tile
            title="Soft Skills"
            subtitle="How I Work"
            items={["Teamwork", "Problem Solving", "Communication", "Adaptability"]}
            i={4}
          />
        </motion.div>
      </div>
    </section>
  );
}

/** Reusable small tile (mobile-friendly) */
function Tile({
  title,
  subtitle,
  items,
  i,
  extra = "",
}: {
  title: string;
  subtitle: string;
  items: string[];
  i: number;
  extra?: string;
}) {
  return (
    <motion.div
      variants={child}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
      className={`
        relative md:col-span-2 ${extra}
        rounded-2xl md:rounded-[28px]
        p-5 sm:p-6
        bg-gradient-to-b from-white/[0.06] to-white/[0.03]
        border border-white/10 shadow-[0_1px_0_0_rgba(255,255,255,0.08),0_20px_60px_-20px_rgba(0,0,0,0.5)]
        backdrop-blur flex flex-col justify-between
      `}
    >
      {/* shine sweep */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl md:rounded-[28px]">
        <span className="absolute -inset-y-10 -left-1/3 w-1/2 rotate-12 bg-gradient-to-r from-white/0 via-white/10 to-white/0 blur-xl animate-[shine_3.5s_linear_infinite]" />
      </span>

      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] sm:text-[11px] text-white/70 w-fit">
          {title}
        </div>
        <h3 className="mt-2 sm:mt-3 text-base sm:text-lg font-semibold text-white/90">
          {subtitle}
        </h3>
      </div>

      <ul className="mt-3 space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-white/80">
        {items.map((it) => (
          <li key={it}>• {it}</li>
        ))}
      </ul>
    </motion.div>
  );
}
