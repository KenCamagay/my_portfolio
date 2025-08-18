"use client";

import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
  IconBrandLinkedin,
  IconBrandFacebook,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";


const items = [
  { title: "GitHub", icon: <IconBrandGithub />, href: "https://github.com/…" },
  { title: "LinkedIn", icon: <IconBrandLinkedin />, href: "https://linkedin.com/…" },
  { title: "Facebook", icon: <IconBrandFacebook />, href: "https://facebook.com/…" },
];

export function FloatingDockDemo() {
  const links = [
    { title: "GitHub", icon: <IconBrandGithub />, href: "https://github.com/..." },
    { title: "LinkedIn", icon: <IconBrandLinkedin />, href: "https://linkedin.com/..." },
    { title: "Facebook", icon: <IconBrandFacebook />, href: "https://facebook.com/..." },
  ];

  return (
    <div className="flex gap-3 mt-6">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0e0e10]/70 border border-gray-600 shadow-md hover:scale-105 transition-all duration-150"
        >
          {React.cloneElement(link.icon, {
            className: "w-5 h-5 text-slate-200",
          })}
        </a>
      ))}
    </div>
  );
}

