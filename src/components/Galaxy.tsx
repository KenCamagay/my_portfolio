'use client';

export default function Galaxy({ className }: { className?: string }) {
  return (
    <div className="fixed inset-0 h-screen w-screen pointer-events-none z-0 overflow-hidden [mask-image:radial-gradient(ellipse_at_center,white,transparent)] bg-black">
        <div className="absolute inset-0 animate-stars bg-[radial-gradient(#ffffff40_1px,transparent_1px)] bg-[length:40px_40px]" />
        <div className="absolute inset-0 animate-twinkle bg-[radial-gradient(#ffffff10_1px,transparent_1px)] bg-[length:80px_80px]" />
    </div>

  );
}
