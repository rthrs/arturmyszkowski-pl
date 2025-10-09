"use client";

import TechBadge from "@/components/ui/TechBadge";

interface TechGroup {
    label: string;
    technologies: string[];
}

interface GroupedTechBadgesListProps {
    groups: TechGroup[];
    gridClass?: string;
}

export default function GroupedTechBadgesList({ groups, gridClass = "grid-cols-1" }: GroupedTechBadgesListProps) {
    return (
        <div className={`grid ${gridClass} gap-3`}>
            {groups.map((group) => (
                <div key={group.label} className="flex flex-col gap-2">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{group.label}</span>
                    <div className="flex flex-wrap gap-2">
                        {group.technologies.map((tech) => (
                            <TechBadge key={tech} name={tech} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
