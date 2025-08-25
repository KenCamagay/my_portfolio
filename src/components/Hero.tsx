'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import SplitText from '@/components/SplitText';
import BlurText from './BlurText';
import AnimatedTagline from '../components/AnimatedTagline';

const spring = { type: 'spring', stiffness: 90, damping: 16 };

const makeVariants = (side: 'left' | 'center' | 'right') => {
  const base = { opacity: 0, filter: 'blur(3px)' };
  const map = {
    left:  { ...base, x: -80, y: 80 },
    center:{ ...base, x: 0,   y: 100 },
    right: { ...base, x: 80,  y: 80  },
  } as const;
  return {
    enter:  { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', transition: { ...spring, duration: 0.7 } },
    exit:   { ...map[side], transition: { duration: 0.45, ease: 'easeIn' } },
    hidden: map[side],
  };
};

export default function Hero() {
  // refs + controls for scroll in/out
  const leftRef = useRef(null);
  const midRef = useRef(null);
  const rightRef = useRef(null);

  const inLeft  = useInView(leftRef,  { margin: '-10% 0% -10% 0%' });
  const inMid   = useInView(midRef,   { margin: '-10% 0% -10% 0%' });
  const inRight = useInView(rightRef, { margin: '-10% 0% -10% 0%' });

  const leftCtrl  = useAnimation();
  const midCtrl   = useAnimation();
  const rightCtrl = useAnimation();

  useEffect(() => { leftCtrl.start(inLeft  ? 'enter' : 'exit');  }, [inLeft,  leftCtrl]);
  useEffect(() => { midCtrl.start(inMid   ? 'enter' : 'exit');   }, [inMid,   midCtrl]);
  useEffect(() => { rightCtrl.start(inRight? 'enter' : 'exit');  }, [inRight, rightCtrl]);

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-center
                 gap-8 md:gap-16 xl:gap-24 px-6 sm:px-10 md:px-16 py-8 md:py-12
                 bg-gradient-to-br from-gray-900 to-black text-white"
    >
      {/* LEFT — Name, pill, tagline, CTAs */}
      <motion.div
        ref={leftRef}
        variants={makeVariants('left')}
        initial="hidden"
        animate={leftCtrl}
        className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left space-y-4"
      >
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

        {/* Status pill */}
        <motion.div
          whileHover={{ scale: 1.04, boxShadow: '0 0 0 1px rgba(16,185,129,.35)' }}
          className="self-center md:self-start inline-flex items-center gap-2 rounded-full
                     border border-white/10 bg-white/5 px-3 py-1 text-[12px] text-white/70"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Open to internships & collabs
        </motion.div>

        <AnimatedTagline
          className="text-gray-400 text-lg leading-relaxed max-w-xl"
          phrases={[
            'Full-stack: Laravel • React • Flutter',
            'Clean UX, fast performance, readable code',
            'APIs, Auth, Realtime, Integrations',
            'Open to collabs & internships',
          ]}
          typingSpeed={42}
          deletingSpeed={30}
          holdTime={1100}
        />

        {/* CTAs */}
        <div className="mt-1 flex flex-wrap items-center gap-3 justify-center md:justify-start">
          {[
            { href: '#projects', label: 'View Projects', primary: true },
            { href: 'mailto:kencamagay.dev@gmail.com', label: 'Contact Me' },
            { href: '/KenCamagay_Resume.pdf', label: 'Download Résumé' },
          ].map((b) => (
            <motion.a
              key={b.label}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href={b.href}
              className={
                b.primary
                  ? 'px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:opacity-90 transition'
                  : 'px-4 py-2 rounded-full border border-white/20 text-sm hover:bg-white/10 transition'
              }
            >
              {b.label}
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* CENTER — Avatar */}
      <motion.div
        ref={midRef}
        variants={makeVariants('center')}
        initial="hidden"
        animate={midCtrl}
        whileHover={{ rotate: 1.2, scale: 1.02 }}
        transition={spring}
        className="w-full md:w-auto flex justify-center shrink-0"
      >
        <div className="relative">
          <motion.div
            className="absolute inset-0 -z-10 rounded-full blur-2xl bg-white/10"
            animate={{ scale: [1, 1.03, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <img
            src="/your-image.png"
            alt="Profile"
            className="w-40 h-40 sm:w-48 sm:h-48 md:w-72 md:h-72 object-cover rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </motion.div>

      {/* RIGHT — Blurb + Stats */}
      <motion.div
        ref={rightRef}
        variants={makeVariants('right')}
        initial="hidden"
        animate={rightCtrl}
        className="w-full md:w-1/3 text-center md:text-left space-y-4 md:pl-10 xl:pl-14"
      >
        <BlurText
          text="I'm a full-stack developer passionate about building intuitive, scalable web and mobile applications. Currently building HabiScan AI."
          delay={100}
          animateBy="words"
          direction="top"
          className="text-lg md:text-xl text-gray-300 max-w-xl"
        />

        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          {[
            { k: 'Projects', v: '8+' },
            { k: 'Tech', v: '12+' },
            { k: 'Years', v: '2' },
          ].map((s) => (
            <motion.div
              key={s.k}
              whileHover={{ y: -3 }}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2"
            >
              <div className="text-xl font-semibold">{s.v}</div>
              <div className="text-[12px] text-white/60">{s.k}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* scroll cue (unchanged) */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none">
        <a
          href="#projects"
          className="group pointer-events-auto inline-flex flex-col items-center text-white/60 hover:text-white"
        >
          <span className="text-xs mb-1">Scroll</span>
          <span className="h-6 w-[2px] bg-white/40 relative overflow-hidden">
            <span className="absolute inset-x-0 -top-6 h-6 bg-white/90 animate-[scrollbar_1.8s_ease-in-out_infinite]" />
          </span>
        </a>
      </div>
    </section>
  );
}
