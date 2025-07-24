'use client';

import { motion, Transition } from 'framer-motion';
import { useEffect, useRef, useState, useMemo } from 'react';

type BlurTextProps = {
  text: string;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  delay?: number;
  threshold?: number;
};

export default function BlurText({
  text,
  className,
  animateBy = 'words',
  direction = 'top',
  delay = 100,
  threshold = 0.1,
}: BlurTextProps) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  const baseY = direction === 'top' ? 20 : -20;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  const words = useMemo(() => {
    return animateBy === 'letters'
      ? text.split('')
      : text.split(/(\s+)/); // keep spaces
  }, [text, animateBy]);

  return (
    <div ref={ref} className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: baseY, filter: 'blur(4px)' }}
          animate={
            visible
              ? {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                }
              : {}
          }
          transition={{
            duration: 0.4,
            delay: visible ? index * (delay / 1000) : 0,
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
