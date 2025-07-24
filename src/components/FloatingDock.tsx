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
    { title: "GitHub", icon: <IconBrandGithub />, href: "https://github.com/…" },
    { title: "LinkedIn", icon: <IconBrandLinkedin />, href: "https://linkedin.com/…" },
    { title: "Facebook", icon: <IconBrandFacebook />, href: "https://facebook.com/…" },
  ];
  return (
   <div className="mt-6 w-full flex justify-center">
    <div className="translate-x-[-40px]">
        <FloatingDock
        items={links.map(link => ({
            ...link,
            icon: React.cloneElement(link.icon, {
            className: "text-white opacity-80 hover:opacity-100 transition",
            }),
        }))}
        mobileClassName="translate-y-4"
        />
    </div>
    </div>
  );
}
