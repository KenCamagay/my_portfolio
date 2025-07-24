'use client';

import { motion } from 'framer-motion';

export default function FaultyTerminal() {
  return (
    <motion.div
      className="fixed inset-0 -z-10 overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(#00ff99_1px,transparent_1px)] [background-size:12px_12px] opacity-10" />
        <div className="absolute inset-0 mix-blend-screen">
          <div className="absolute w-[300%] h-[300%] -top-1/2 -left-1/2 animate-[spin_60s_linear_infinite] bg-gradient-to-br from-green-400/20 via-transparent to-cyan-400/20" />
        </div>
      </div>
    </motion.div>
  );
}
