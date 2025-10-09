import {
    FiGlobe as Globe,
    FiSmartphone as Smartphone,
    FiServer as Server,
    FiCloud as Cloud,
    FiUsers as Users
} from "react-icons/fi";

import type { IconType } from "react-icons";
import type { HTMLMotionProps } from "framer-motion";

export enum SkillId {
    FRONTEND = "frontend",
    MOBILE = "mobile",
    BACKEND = "backend",
    DEVOPS = "devops",
    LEADERSHIP = "leadership"
}

export interface TechGroup {
    label: string;
    technologies: string[];
}

export interface SkillDef {
    name: string;
    icon: IconType;
    description: string;
    groupedDescription?: TechGroup[]; // Optional grouped tech badges with labels
    iconColorClass: string;
    cardBgClass: string;
    animation: string;
    hoverAnimation: HTMLMotionProps<"div">["animate"];
    spanClass?: string; // responsive grid column span class, e.g., "lg:col-span-2"
}

// Skill definitions
const SKILL_DEFINITIONS: Record<SkillId, SkillDef> = {
    [SkillId.FRONTEND]: {
        name: "Frontend Development",
        icon: Globe,
        description:
            "React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Framer Motion, Styled-Components, Chakra-UI, Redux, Redux Saga, TanStack Query, React Router, RxJS, Immer, Immutable.js, WebGL, Three.js, Shaders, D3.js, WebAssembly, Emscripten, WebWorkers, Vite, Webpack, Rollup",
        groupedDescription: [
            {
                label: "Core",
                technologies: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3"]
            },
            {
                label: "Styling",
                technologies: ["Tailwind CSS", "Framer Motion", "Styled-Components", "Chakra-UI"]
            },
            {
                label: "State Management",
                technologies: ["Redux", "Redux Saga", "TanStack Query", "React Router", "RxJS", "Immer", "Immutable.js"]
            },
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
                technologies: ["Vite", "Webpack", "Rollup"]
            }
        ],
        iconColorClass: "from-blue-900/60 to-gray-900/60 group-hover:bg-blue-700/60",
        cardBgClass: "from-blue-900/60 to-gray-900/60 hover:from-blue-800/60 hover:to-gray-800/60",
        animation: "rotate",
        hoverAnimation: {
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1.05, 1],
            transition: { duration: 0.6, ease: "easeInOut" as const }
        },
        spanClass: "md:col-span-2 lg:col-span-4"
    },
    [SkillId.MOBILE]: {
        name: "Mobile Development",
        icon: Smartphone,
        description: "React Native, Expo, iOS",
        iconColorClass: "from-purple-900/60 to-gray-900/60 group-hover:bg-purple-700/60",
        cardBgClass: "from-purple-900/60 to-gray-900/60 hover:from-purple-800/60 hover:to-gray-800/60",
        animation: "bounce",
        hoverAnimation: {
            y: [0, -4, 0],
            scale: [1, 1.05, 1],
            transition: { duration: 0.6, ease: "easeInOut" as const }
        },
        spanClass: "lg:col-span-2"
    },
    [SkillId.BACKEND]: {
        name: "Backend Development",
        icon: Server,
        description:
            "Node.js, Express, REST API, GraphQL, Python, Django, C/C++, PostgreSQL, SQLite, Firestore, Realtime Database, DuckDB",
        groupedDescription: [
            {
                label: "Core",
                technologies: ["Node.js", "Express", "Python", "Django", "C/C++"]
            },
            {
                label: "APIs",
                technologies: ["REST API", "GraphQL"]
            },
            {
                label: "Databases",
                technologies: ["PostgreSQL", "SQLite", "Firestore", "Realtime Database", "DuckDB"]
            }
        ],
        iconColorClass: "from-green-900/60 to-gray-900/60 group-hover:bg-green-700/60",
        cardBgClass: "from-green-900/60 to-gray-900/60 hover:from-green-800/60 hover:to-gray-800/60",
        animation: "scale",
        hoverAnimation: {
            scale: [1, 1.08, 1],
            transition: { duration: 0.6, ease: "easeInOut" as const }
        },
        spanClass: "md:col-span-2 lg:col-span-2"
    },
    [SkillId.DEVOPS]: {
        name: "DevOps & Cloud",
        icon: Cloud,
        description: "AWS, Firebase, Google Cloud, Netlify, Git, Hugo, CI/CD",
        iconColorClass: "from-cyan-900/60 to-gray-900/60 group-hover:bg-cyan-700/60",
        cardBgClass: "from-cyan-900/60 to-gray-900/60 hover:from-cyan-800/60 hover:to-gray-800/60",
        animation: "float",
        hoverAnimation: {
            y: [0, -3, -6, -3, 0],
            scale: [1, 1.03, 1.05, 1.03, 1],
            transition: { duration: 0.6, ease: "easeInOut" as const }
        },
        spanClass: "lg:col-span-2"
    },
    [SkillId.LEADERSHIP]: {
        name: "Leadership",
        icon: Users,
        description: "Code Review, Audits, Mentoring, Agile, Scrum, Kanban",
        iconColorClass: "from-slate-900/60 to-gray-900/60 group-hover:bg-slate-700/60",
        cardBgClass: "from-slate-900/60 to-gray-900/60 hover:from-slate-800/60 hover:to-gray-800/60",
        animation: "pulse",
        hoverAnimation: {
            scale: [1, 1.03, 1],
            transition: { duration: 0.6, ease: "easeInOut" as const }
        },
        spanClass: "lg:col-span-2"
    }
};

// Skill ordering
const SKILL_ORDER = [SkillId.FRONTEND, SkillId.BACKEND, SkillId.MOBILE, SkillId.DEVOPS, SkillId.LEADERSHIP] as const;

// Export ordered skills array
export const SKILLS: SkillDef[] = SKILL_ORDER.map((key) => SKILL_DEFINITIONS[key]);
