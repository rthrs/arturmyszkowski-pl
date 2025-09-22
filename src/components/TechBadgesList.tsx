"use client";

import TechBadge from "@/components/TechBadge";

interface TechBadgesListProps {
    csv: string;
}

export default function TechBadgesList({ csv }: TechBadgesListProps) {
    const items = csv
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    return (
        <div className="flex flex-wrap gap-2">
            {items.map((label) => (
                <TechBadge key={label} name={label} />
            ))}
        </div>
    );
}
