import {
    FiGlobe as Globe,
    FiSmartphone as Smartphone,
    FiServer as Server,
    FiCloud as Cloud,
    FiUsers as Users,
    FiZap as Zap
} from "react-icons/fi";

import type { IconType } from "react-icons";

export enum SkillId {
    FRONTEND_CORE = "frontend-core",
    GRAPHICS_AND_LOW_LEVEL = "graphics-and-low-level",
    MOBILE = "mobile",
    BACKEND = "backend",
    DEVOPS_AND_CLOUD = "devops-and-cloud",
    SOFT_SKILLS = "soft-skills"
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

export const SKILLS_GRID_CLASS_NAME =
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[repeat(3,auto)] gap-4";

const SKILL_DEFINITIONS: Record<SkillId, SkillDef> = {
    [SkillId.FRONTEND_CORE]: {
        name: "Frontend",
        icon: Globe,
        description: [
            {
                label: "Core",
                technologies: ["React", "Next.js", "Vue.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "WebWorkers"]
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
                ]
            },
            {
                label: "Build Tools",
                technologies: ["Vite", "Webpack", "Rollup", "Electron", "Hugo"]
            }
        ],
        spanClass: "sm:row-span-3",
        iconColorClass: "from-blue-900/60 to-gray-900/60 group-hover:bg-blue-700/60",
        cardBgClass: "from-blue-900/60 to-gray-900/60 hover:from-blue-800/60 hover:to-gray-800/60"
    },
    [SkillId.GRAPHICS_AND_LOW_LEVEL]: {
        name: "Graphics & Low-level",
        icon: Zap,
        description: [
            {
                technologies: ["WebGL", "Three.js", "Shaders", "D3.js", "WebAssembly", "Emscripten"]
            }
        ],
        spanClass: "sm:row-start-1 sm:col-start-2 lg:row-start-auto lg:col-start-auto",
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
                technologies: ["REST API", "GraphQL", "PostGraphile"]
            },
            {
                label: "Databases",
                technologies: ["PostgreSQL", "SQLite", "Firebase", "DuckDB", "Neo4j"]
            }
        ],
        spanClass: "sm:row-span-2",
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
    [SkillId.DEVOPS_AND_CLOUD]: {
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
    [SkillId.SOFT_SKILLS]: {
        name: "Soft Skills",
        icon: Users,
        description: [
            {
                technologies: [
                    "Leadership",
                    "Client Communication",
                    "Agile",

                    "Problem Solving",
                    "Team Collaboration",

                    "Scrum",
                    "Kanban",
                    "Code Review",

                    "Documentation",
                    "Design Docs"
                ]
            }
        ],
        spanClass: "sm:row-span-2 lg:row-span-1",
        iconColorClass: "from-slate-900/60 to-gray-900/60 group-hover:bg-slate-700/60",
        cardBgClass: "from-slate-900/60 to-gray-900/60 hover:from-slate-800/60 hover:to-gray-800/60"
    }
};

// Skill ordering
const SKILL_ORDER = [
    SkillId.FRONTEND_CORE,
    SkillId.BACKEND,

    SkillId.MOBILE,
    SkillId.SOFT_SKILLS,
    SkillId.GRAPHICS_AND_LOW_LEVEL,

    SkillId.DEVOPS_AND_CLOUD
] as const;

// Export ordered skills array
export const SKILLS: SkillDef[] = SKILL_ORDER.map((key) => SKILL_DEFINITIONS[key]);
