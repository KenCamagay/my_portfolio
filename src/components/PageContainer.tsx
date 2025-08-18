// components/PageContainer.tsx
"use client";
import { ReactNode } from "react";
import { NavbarDemo } from "@/components/Navbar";

export default function PageContainer({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="fixed top-0 left-0 w-full z-50">
        <NavbarDemo />
      </div>
      <div className="pt-12">{children}</div> {/* Push down content below navbar */}
    </div>
  );
}
