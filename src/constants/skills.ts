import {
    FiSmartphone as Smartphone,
    FiServer as Server,
    FiCloud as Cloud,
    FiUsers as Users,
    FiZap as Zap,
    FiCode as Code,
    FiLayers as Layers,
    FiBox as Box,
    FiTool as Tool,
    FiDatabase as Database,
    FiClipboard as Clipboard,
    FiCpu as Cpu
} from "react-icons/fi";

import type { IconType } from "react-icons";

export enum SkillId {
    FRONTEND_CORE = "frontend-core",
    FRONTEND_STATE = "frontend-state",
    FRONTEND_STYLING = "frontend-styling",
    FRONTEND_GRAPHICS = "frontend-graphics",
    FRONTEND_LOW_LEVEL = "frontend-low-level",
    FRONTEND_BUILD = "frontend-build",

    BACKEND = "backend",
    DATABASES = "databases",
    MOBILE = "mobile",
    DEVOPS_AND_CLOUD = "devops-and-cloud",
    PROJECT_MANAGEMENT = "project-management",
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

export const SKILLS_GRID_CLASS_NAME = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4";

const SKILL_DEFINITIONS: Record<SkillId, SkillDef> = {
    [SkillId.FRONTEND_CORE]: {
        name: "Core",
        icon: Code,
        description: [
            {
                technologies: ["React", "Next.js", "Vue.js", "TypeScript", "JavaScript", "HTML5", "CSS3"]
            }
        ],
        iconColorClass: "from-cyan-900/40 to-gray-900/40 group-hover:bg-cyan-700/40",
        cardBgClass: "from-cyan-900/40 to-gray-900/40 hover:from-cyan-800/40 hover:to-gray-800/40"
    },
    [SkillId.FRONTEND_STATE]: {
        name: "State Management",
        icon: Box,
        description: [
            {
                technologies: ["Redux", "RxJS", "Redux Saga", "TanStack Query", "React Hook Form", "Immer"]
            }
        ],
        iconColorClass: "from-sky-900/40 to-gray-900/40 group-hover:bg-sky-700/40",
        cardBgClass: "from-sky-900/40 to-gray-900/40 hover:from-sky-800/40 hover:to-gray-800/40"
    },
    [SkillId.FRONTEND_STYLING]: {
        name: "Styling",
        icon: Layers,
        description: [
            {
                technologies: ["Tailwind CSS", "Framer Motion", "Chakra UI", "Styled Components"]
            }
        ],
        iconColorClass: "from-blue-900/40 to-gray-900/40 group-hover:bg-blue-700/40",
        cardBgClass: "from-blue-900/40 to-gray-900/40 hover:from-blue-800/40 hover:to-gray-800/40"
    },
    [SkillId.FRONTEND_GRAPHICS]: {
        name: "Graphics & Visualization",
        icon: Zap,
        description: [
            {
                technologies: ["WebGL", "Three.js", "React Three Fiber", "D3.js"]
            }
        ],
        iconColorClass: "from-indigo-900/40 to-gray-900/40 group-hover:bg-indigo-700/40",
        cardBgClass: "from-indigo-900/40 to-gray-900/40 hover:from-indigo-800/40 hover:to-gray-800/40"
    },
    [SkillId.FRONTEND_LOW_LEVEL]: {
        name: "Low-level & Performance",
        icon: Cpu,
        description: [
            {
                technologies: ["WebWorkers", "WebAssembly", "Web Vitals Optimisation", "API Refactoring"]
            }
        ],
        iconColorClass: "from-violet-900/40 to-gray-900/40 group-hover:bg-violet-700/40",
        cardBgClass: "from-violet-900/40 to-gray-900/40 hover:from-violet-800/40 hover:to-gray-800/40"
    },
    [SkillId.FRONTEND_BUILD]: {
        name: "Build Tools",
        icon: Tool,
        description: [
            {
                technologies: ["Vite", "Webpack", "Rollup", "Electron", "Hugo", "Emscripten"]
            }
        ],
        iconColorClass: "from-purple-900/40 to-gray-900/40 group-hover:bg-purple-700/40",
        cardBgClass: "from-purple-900/40 to-gray-900/40 hover:from-purple-800/40 hover:to-gray-800/40"
    },
    [SkillId.BACKEND]: {
        name: "Backend",
        icon: Server,
        description: [
            {
                technologies: ["Node.js", "Express", "Python", "Django", "Flask", "C/C++"]
            }
        ],
        iconColorClass: "from-green-900/40 to-gray-900/40 group-hover:bg-green-700/40",
        cardBgClass: "from-green-900/40 to-gray-900/40 hover:from-green-800/40 hover:to-gray-800/40"
    },
    [SkillId.DATABASES]: {
        name: "Databases & APIs",
        icon: Database,
        description: [
            {
                technologies: ["PostgreSQL", "Firebase", "DuckDB", "Neo4j", "REST", "GraphQL"]
            }
        ],
        iconColorClass: "from-emerald-900/40 to-gray-900/40 group-hover:bg-emerald-700/40",
        cardBgClass: "from-emerald-900/40 to-gray-900/40 hover:from-emerald-800/40 hover:to-gray-800/40"
    },
    [SkillId.DEVOPS_AND_CLOUD]: {
        name: "DevOps & Cloud",
        icon: Cloud,
        description: [
            {
                technologies: ["AWS", "Google Cloud", "Vercel", "Netlify", "Docker", "CI/CD", "Git"]
            }
        ],
        iconColorClass: "from-teal-900/40 to-gray-900/40 group-hover:bg-teal-700/40",
        cardBgClass: "from-teal-900/40 to-gray-900/40 hover:from-teal-800/40 hover:to-gray-800/40"
    },
    [SkillId.MOBILE]: {
        name: "Mobile",
        icon: Smartphone,
        description: [
            {
                technologies: ["React Native", "Expo", "OpenGL ES"]
            }
        ],
        iconColorClass: "from-fuchsia-900/40 to-gray-900/40 group-hover:bg-fuchsia-700/40",
        cardBgClass: "from-fuchsia-900/40 to-gray-900/40 hover:from-fuchsia-800/40 hover:to-gray-800/40"
    },
    [SkillId.PROJECT_MANAGEMENT]: {
        name: "Project Management",
        icon: Clipboard,
        description: [
            {
                technologies: ["Agile", "Scrum", "Kanban", "Code Review", "Documentation", "Design Docs"]
            }
        ],
        iconColorClass: "from-orange-900/40 to-gray-900/40 group-hover:bg-orange-700/40",
        cardBgClass: "from-orange-900/40 to-gray-900/40 hover:from-orange-800/40 hover:to-gray-800/40"
    },
    [SkillId.SOFT_SKILLS]: {
        name: "Soft Skills",
        icon: Users,
        description: [
            {
                technologies: [
                    "Leadership",
                    "Communication",
                    "Problem-solving",
                    "Team Collaboration",
                    "English Professional",
                    "Polish Native"
                ]
            }
        ],
        iconColorClass: "from-neutral-900/40 to-gray-900/40 group-hover:bg-neutral-700/40",
        cardBgClass: "from-neutral-900/40 to-gray-900/40 hover:from-neutral-800/40 hover:to-gray-800/40"
    }
};

// Skill ordering for Frontend expertise
const FRONTEND_EXPERTISE_ORDER = [
    SkillId.FRONTEND_CORE,
    SkillId.FRONTEND_STATE,
    SkillId.FRONTEND_STYLING,

    SkillId.FRONTEND_GRAPHICS,
    SkillId.FRONTEND_LOW_LEVEL,
    SkillId.FRONTEND_BUILD
] as const;

// Skill ordering for other skills
const OTHER_SKILLS_ORDER = [
    SkillId.BACKEND,
    SkillId.DATABASES,
    SkillId.DEVOPS_AND_CLOUD,
    SkillId.MOBILE,
    SkillId.PROJECT_MANAGEMENT,
    SkillId.SOFT_SKILLS
] as const;

// Export ordered skills arrays
export const FRONTEND_EXPERTISE_SKILLS: SkillDef[] = FRONTEND_EXPERTISE_ORDER.map((key) => SKILL_DEFINITIONS[key]);
export const OTHER_SKILLS: SkillDef[] = OTHER_SKILLS_ORDER.map((key) => SKILL_DEFINITIONS[key]);
