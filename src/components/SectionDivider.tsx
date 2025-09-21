"use client";

interface SectionDividerProps {
  className?: string;
}

export default function SectionDivider({ className = "" }: SectionDividerProps) {
  return (
    <div className={`relative my-8 z-10 ${className}`} aria-hidden>
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 rotate-[-2deg]">
        <div className="w-full border-t border-dashed border-gray-600/50" />
      </div>
    </div>
  );
}


