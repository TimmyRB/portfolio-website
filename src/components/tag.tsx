"use client";

export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row gap-2 items-center text-sm bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 shadow-sm text-white font-medium text-nowrap">
      {children}
    </div>
  );
}
