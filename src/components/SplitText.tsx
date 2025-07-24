'use client';

import { motion } from 'framer-motion';

type Props = {
  text: string;
  className?: string;
};

export default function SplitText({ text, className }: Props) {
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ delay: index * 0.03, duration: 0.4, ease: 'easeOut' }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}
