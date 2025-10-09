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
    groupedGridClass?: string; // Grid classes for grouped layout
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
            "React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Framer Motion, Styled-Components, Chakra-UI, Redux, Redux Saga, TanStack Query, React Router, RxJS, Immer, Immutable.js, WebGL, Three.js, Shaders, D3.js, WebAssembly, Emscripten, WebWorkers, Vite, Webpack, Rollup, Vue.js, Electron",
        groupedDescription: [
            {
                label: "Core",
                technologies: ["React", "Next.js", "Vue.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "WebWorkers"]
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
                technologies: ["WebAssembly", "Emscripten"]
            },
            {
                label: "Build Tools",
                technologies: ["Vite", "Webpack", "Rollup", "Electron"]
            }
        ],
        groupedGridClass: "grid-cols-1 md:grid-cols-3",
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
        description: "React Native, Expo, iOS, OpenGL ES",
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
            "Node.js, Express, REST API, GraphQL, Python, Django, C/C++, PostgreSQL, SQLite, Firestore, Realtime Database, DuckDB, WebSockets, Postgraphile",
        groupedDescription: [
            {
                label: "Core",
                technologies: ["Node.js", "Express", "Python", "Django", "C/C++"]
            },
            {
                label: "APIs",
                technologies: ["REST API", "GraphQL", "Postgraphile"]
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
        description: "Agile, Scrum, Kanban, Code Review, Audits, Mentoring, Documentation",
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
