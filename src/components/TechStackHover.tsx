'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaReact, FaLaravel, FaCss3Alt } from 'react-icons/fa';
import { SiFirebase, SiTailwindcss } from 'react-icons/si';



const techs = [
  { name: 'React', icon: <FaReact size={20} className="text-cyan-400" /> },
  { name: 'Tailwind', icon: <SiTailwindcss size={20} className="text-sky-400" /> },
  { name: 'Laravel', icon: <FaLaravel size={20} className="text-red-500" /> },
  { name: 'Firebase', icon: <SiFirebase size={20} className="text-yellow-400" /> },
];


export default function TechStackHover() {
  return (
    <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-4">
      {techs.map((tech, index) => (
        <HoverBadge key={index} name={tech.name} icon={tech.icon} />
      ))}
    </div>
  );
}

function HoverBadge({ name, icon }: { name: string; icon: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="px-4 py-1 rounded-full bg-gray-800 text-sm cursor-pointer min-w-[80px] text-center"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={false}
      animate={{ scale: hovered ? 1.05 : 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <AnimatePresence mode="wait">
        {hovered ? (
          <motion.div
            key="icon"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="flex justify-center items-center"
          >
            {icon}
          </motion.div>
        ) : (
          <motion.div
            key="text"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {name}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
