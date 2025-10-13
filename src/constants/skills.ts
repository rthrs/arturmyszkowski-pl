import {
    FiGlobe as Globe,
    FiSmartphone as Smartphone,
    FiServer as Server,
    FiCloud as Cloud,
    FiUsers as Users
} from "react-icons/fi";

import type { IconType } from "react-icons";

export enum SkillId {
    FRONTEND_CORE = "frontend-core",
    FRONTEND_ADVANCED = "frontend-advanced",
    MOBILE = "mobile",
    BACKEND = "backend",
    DEVOPS = "devops",
    LEADERSHIP = "leadership"
}

export interface TechGroup {
    label?: string; // Optional - if not provided, renders as simple list without label
    technologies: string[];
    gridPosition?: string; // Custom grid position for specific layouts
}

export interface SkillDef {
    name: string;
    icon: IconType;
    description: TechGroup[]; // Always use array of tech groups
    gridClass?: string; // Grid classes for layout
    iconColorClass: string;
    cardBgClass: string;
    spanClass?: string; // responsive grid column span class, e.g., "lg:col-span-2"
}

const SKILL_DEFINITIONS: Record<SkillId, SkillDef> = {
    [SkillId.FRONTEND_CORE]: {
        name: "Frontend Core",
        icon: Globe,
        description: [
            {
                label: "Core",
                technologies: ["React", "Next.js", "Vue.js", "JavaScript", "TypeScript", "HTML5", "CSS3"]
            },

            {
                label: "Styling",
                technologies: ["Tailwind CSS", "Framer Motion", "Styled Components", "Chakra UI"]
            },

            {
                label: "State Management",
                technologies: [
                    "Redux",
                    "RxJS",
                    "Redux Saga",
                    "TanStack Query",
                    "React Router",
                    "Immer",
                    "React Hook Form"
                ],
                gridPosition: "md:col-span-2"
            }
        ],
        gridClass: "grid-cols-1 md:grid-cols-[repeat(2,auto)]",
        iconColorClass: "from-blue-900/60 to-gray-900/60 group-hover:bg-blue-700/60",
        cardBgClass: "from-blue-900/60 to-gray-900/60 hover:from-blue-800/60 hover:to-gray-800/60"
    },
    [SkillId.FRONTEND_ADVANCED]: {
        name: "Frontend Advanced",
        icon: Globe,
        description: [
            {
                label: "Graphics",
                technologies: ["WebGL", "Three.js", "Shaders", "D3.js"]
            },
            {
                label: "Low-level",
                technologies: ["WebAssembly", "Emscripten", "WebWorkers"]
            },
            {
                label: "Build Tools",
                technologies: ["Vite", "Webpack", "Rollup", "Electron", "Hugo"]
            }
        ],
        iconColorClass: "from-indigo-900/60 to-gray-900/60 group-hover:bg-indigo-700/60",
        cardBgClass: "from-indigo-900/60 to-gray-900/60 hover:from-indigo-800/60 hover:to-gray-800/60"
    },
    [SkillId.BACKEND]: {
        name: "Backend",
        icon: Server,
        description: [
            {
                label: "Core",
                technologies: ["Node.js", "Express", "Python", "Django", "Flask", "C/C++"]
            },
            {
                label: "APIs",
                technologies: ["REST API", "GraphQL", "Postgraphile"]
            },
            {
                label: "Databases",
                technologies: ["PostgreSQL", "SQLite", "Firebase", "DuckDB", "Neo4j"]
            }
        ],
        iconColorClass: "from-green-900/60 to-gray-900/60 group-hover:bg-green-700/60",
        cardBgClass: "from-green-900/60 to-gray-900/60 hover:from-green-800/60 hover:to-gray-800/60"
    },
    [SkillId.MOBILE]: {
        name: "Mobile",
        icon: Smartphone,
        description: [
            {
                technologies: ["React Native", "Expo", "OpenGL ES"]
            }
        ],
        iconColorClass: "from-purple-900/60 to-gray-900/60 group-hover:bg-purple-700/60",
        cardBgClass: "from-purple-900/60 to-gray-900/60 hover:from-purple-800/60 hover:to-gray-800/60"
    },
    [SkillId.DEVOPS]: {
        name: "DevOps & Cloud",
        icon: Cloud,
        description: [
            {
                technologies: ["AWS", "Google Cloud", "Netlify", "Docker", "CI/CD", "Git"]
            }
        ],
        iconColorClass: "from-cyan-900/60 to-gray-900/60 group-hover:bg-cyan-700/60",
        cardBgClass: "from-cyan-900/60 to-gray-900/60 hover:from-cyan-800/60 hover:to-gray-800/60"
    },
    [SkillId.LEADERSHIP]: {
        name: "Leadership",
        icon: Users,
        description: [
            {
                technologies: ["Agile", "Scrum", "Kanban", "Code Review", "Audits", "Mentoring", "Team Collaboration"]
            }
        ],
        iconColorClass: "from-slate-900/60 to-gray-900/60 group-hover:bg-slate-700/60",
        cardBgClass: "from-slate-900/60 to-gray-900/60 hover:from-slate-800/60 hover:to-gray-800/60"
    }
};

// Skill ordering
const SKILL_ORDER = [
    SkillId.FRONTEND_CORE,
    SkillId.FRONTEND_ADVANCED,
    SkillId.BACKEND,
    SkillId.DEVOPS,
    SkillId.MOBILE,
    SkillId.LEADERSHIP
] as const;

// Export ordered skills array
export const SKILLS: SkillDef[] = SKILL_ORDER.map((key) => SKILL_DEFINITIONS[key]);
