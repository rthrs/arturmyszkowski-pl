"use client";

import TechBadge from "@/components/ui/TechBadge";

interface TechGroup {
    label?: string; // Optional - if not provided, renders as simple list without label
    technologies: string[];
    gridPosition?: string; // Custom grid position for specific layouts
}

interface GroupedTechBadgesListProps {
    groups: TechGroup[];
    gridClass?: string;
}

export default function GroupedTechBadgesList({ groups, gridClass = "grid-cols-1" }: GroupedTechBadgesListProps) {
    return (
        <div className={`grid ${gridClass} gap-x-1 gap-y-3`}>
            {groups.map((group, index) => (
                <div key={group.label || index} className={`flex flex-col gap-1 ${group.gridPosition || ""}`}>
                    {group.label && (
                        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                            {group.label}
                        </span>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                        {group.technologies.map((tech) => (
                            <TechBadge key={tech} name={tech} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
