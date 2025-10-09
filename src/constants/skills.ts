import {
    FiDatabase as Database,
    FiGlobe as Globe,
    FiSmartphone as Smartphone,
    FiBarChart2 as BarChart,
    FiServer as Server,
    FiCloud as Cloud,
    FiUsers as Users,
    FiLayers as Layers,
    FiGitMerge as GitMerge
} from "react-icons/fi";

import type { IconType } from "react-icons";
import type { HTMLMotionProps } from "framer-motion";

export interface SkillDef {
    name: string;
    icon: IconType;
    description: string;
    iconColorClass: string;
    cardBgClass: string;
    animation: string;
    hoverAnimation: HTMLMotionProps<"div">["animate"];
    spanClass?: string; // responsive grid column span class, e.g., "lg:col-span-2"
}

export const SKILLS: SkillDef[] = [
    {
        name: "Frontend",
        icon: Globe,
        description:
            "React, Next.js, TypeScript, JavaScript, WebAssembly, Emscripten, WebWorkers, HTML5, CSS3, Vite, Webpack, Rollup",
        iconColorClass: "from-blue-900/60 to-gray-900/60 group-hover:bg-blue-700/60",
        cardBgClass: "from-blue-900/60 to-gray-900/60 hover:from-blue-800/60 hover:to-gray-800/60",
        animation: "rotate",
        hoverAnimation: {
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1.05, 1],
            transition: { duration: 0.6, ease: "easeInOut" as const }
        },
        spanClass: ""
    },
    {
        name: "UI Styling",
        icon: Layers,
        description: "Tailwind CSS, Framer Motion, Styled-Components, Chakra-UI",
        iconColorClass: "from-indigo-900/60 to-gray-900/60 group-hover:bg-indigo-700/60",
        cardBgClass: "from-indigo-900/60 to-gray-900/60 hover:from-indigo-800/60 hover:to-gray-800/60",
        animation: "pulse",
        hoverAnimation: {
            scale: [1, 1.05, 1],
            transition: { duration: 0.6, ease: "easeInOut" as const }
        }
    },
    {
        name: "UI State Management",
        icon: GitMerge,
        description: "Redux, Redux Saga, TanStack Query, React Router, RxJS, Immer, Immutable.js",
        iconColorClass: "from-yellow-900/60 to-gray-900/60 group-hover:bg-yellow-700/60",
        cardBgClass: "from-yellow-900/60 to-gray-900/60 hover:from-yellow-800/60 hover:to-gray-800/60",
        animation: "wiggle",
        hoverAnimation: {
            rotate: [0, -3, 3, -3, 0],
            scale: [1, 1.05, 1.05, 1.05, 1],
            transition: { duration: 0.6, ease: "easeInOut" as const }
        }
    },
    {
        name: "Mobile",
        icon: Smartphone,
        description: "React Native, Expo, iOS",
        iconColorClass: "from-purple-900/60 to-gray-900/60 group-hover:bg-purple-700/60",
        cardBgClass: "from-purple-900/60 to-gray-900/60 hover:from-purple-800/60 hover:to-gray-800/60",
        animation: "bounce",
        hoverAnimation: {
            y: [0, -4, 0],
            scale: [1, 1.05, 1],
            transition: { duration: 0.6, ease: "easeInOut" as const }
        }
    },
    {
        name: "Backend",
        icon: Server,
        description: "Node.js, Express, REST API, GraphQL, Python, Django, C/C++",
        iconColorClass: "from-green-900/60 to-gray-900/60 group-hover:bg-green-700/60",
        cardBgClass: "from-green-900/60 to-gray-900/60 hover:from-green-800/60 hover:to-gray-800/60",
        animation: "scale",
        hoverAnimation: {
            scale: [1, 1.08, 1],
            transition: { duration: 0.6, ease: "easeInOut" as const }
        },
        spanClass: ""
    },
    {
        name: "Databases",
        icon: Database,
        description: "PostgreSQL, SQLite, Firestore, Realtime Database, DuckDB",
        iconColorClass: "from-emerald-900/60 to-gray-900/60 group-hover:bg-emerald-700/60",
        cardBgClass: "from-emerald-900/60 to-gray-900/60 hover:from-emerald-800/60 hover:to-gray-800/60",
        animation: "scale",
        hoverAnimation: {
            scale: [1, 1.05, 1],
            transition: { duration: 0.6, ease: "easeInOut" as const }
        }
    },
    {
        name: "Graphics & Visualization",
        icon: BarChart,
        description: "WebGL, Three.js, Shaders, D3.js",
        iconColorClass: "from-pink-900/60 to-gray-900/60 group-hover:bg-pink-700/60",
        cardBgClass: "from-pink-900/60 to-gray-900/60 hover:from-pink-800/60 hover:to-gray-800/60",
        animation: "pulse",
        hoverAnimation: {
            scale: [1, 1.05, 1],
            opacity: [1, 0.9, 1],
            transition: { duration: 0.6, ease: "easeInOut" as const }
        }
    },
    {
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
        }
    },
    {
        name: "Leadership",
        icon: Users,
        description: "Code Review, Audits, Mentoring, Agile, Scrum, Kanban",
        iconColorClass: "from-slate-900/60 to-gray-900/60 group-hover:bg-slate-700/60",
        cardBgClass: "from-slate-900/60 to-gray-900/60 hover:from-slate-800/60 hover:to-gray-800/60",
        animation: "pulse",
        hoverAnimation: {
            scale: [1, 1.03, 1],
            transition: { duration: 0.6, ease: "easeInOut" as const }
        }
    }
];
