'use client';

import { motion } from 'framer-motion';

export default function DarkVeil() {
  return (
    <motion.div
      className="fixed inset-0 -z-10 bg-black overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm" />
    </motion.div>
  );
}
