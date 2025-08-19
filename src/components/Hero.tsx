'use client';

import SplitText from '@/components/SplitText';
import BlurText from './BlurText';
import { FloatingDockDemo } from "@/components/FloatingDock";
import AnimatedTagline from "../components/AnimatedTagline";

export default function Hero() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-6 md:gap-30 px-6 sm:px-10 md:px-16 py-8 md:py-12 bg-gradient-to-br from-gray-900 to-black text-white"
    >
      {/* LEFT SIDE - Text */}
      <div className="w-full md:w-1/3 space-y-6 text-center md:text-left">
        <SplitText
          text="Ken D. Camagay"
          className="text-5xl md:text-6xl font-bold"
          delay={100}
          duration={0.8}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
        />
        <AnimatedTagline
          className="text-gray-400 text-lg leading-relaxed"
          phrases={[
            "Full-stack: Laravel • React • Flutter",
            "Clean UX, fast performance, readable code",
            "APIs, Auth, Realtime, Integrations",
            "Open to collabs & internships",
          ]}
          typingSpeed={42}
          deletingSpeed={30}
          holdTime={1100}
        />

        <section>
          <FloatingDockDemo />
        </section>
      </div>

      {/* CENTER - Image */}
      <div className="w-full md:w-auto flex justify-center">
        <img
          src="/your-image.png"
          alt="Profile"
          className="w-40 h-40 sm:w-48 sm:h-48 md:w-72 md:h-72 object-cover rounded-full border-4 border-white shadow-lg"
        />
      </div>

      {/* RIGHT SIDE - Dynamic Tagline */}
      <div className="w-full md:w-1/3 text-center md:text-left space-y-4">
        <BlurText
          text="I'm a full-stack developer passionate about building intuitive, scalable web and mobile applications. Currently building HabiScan AI."
          delay={100}
          animateBy="words"
          direction="top"
          className="text-lg md:text-xl text-gray-300"
        />
      </div>
    </section>
  );
}
