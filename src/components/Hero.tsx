'use client';

import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';
import SplitText from '@/components/SplitText';
import BlurText from './BlurText';
import TechStackHover from '@/components/TechStackHover';
import { FloatingDockDemo } from "@/components/FloatingDock";
export default function Hero() {
  return (
    <section  id="about" className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-between gap-4 md:gap-10 px-6 sm:px-10 md:px-20 py-8 md:py-12 bg-gradient-to-br from-gray-900 to-black text-white">
      
      {/* LEFT SIDE - text */}
      <div className="w-full md:w-1/2 max-w-xl space-y-6 text-center md:text-left">
        
        {/* Split Text Name */}
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

        {/* Blur Text Description */}
        <BlurText
          text="I'm a full-stack developer passionate about building intuitive, scalable web and mobile applications. Currently building HabiScan AI."
          delay={100}
          animateBy="words"
          direction="top"
          className="text-lg md:text-xl text-gray-300 max-w-xl"
        />

        {/* Social Links */}
        <section className="relative pb-">
          {/* ...Hero content... */}
          <FloatingDockDemo />
        </section>
      </div>

      {/* RIGHT SIDE - Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="/your-image.png"
          alt="Profile"
          className="w-40 h-40 sm:w-48 sm:h-48 md:w-72 md:h-72 object-cover rounded-full border-4 border-white shadow-lg"
        />
      </div>
    </section>
  );
}
