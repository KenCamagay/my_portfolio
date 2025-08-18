export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 px-2 py-0.5 text-[11px] leading-5 text-white/80">
      {children}
    </span>
  );
}
