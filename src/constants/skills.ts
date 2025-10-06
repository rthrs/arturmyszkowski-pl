import {
    FiCode as Code,
    FiDatabase as Database,
    FiGlobe as Globe,
    FiSmartphone as Smartphone,
    FiBarChart2 as BarChart
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
}

export const SKILLS: SkillDef[] = [
    {
        name: "Frontend Development",
        icon: Globe,
        description:
            "JavaScript, TypeScript, React, Next.js, HTML5, CSS3, Tailwind CSS, Styled-Components, Chakra-UI, Framer Motion",
        iconColorClass: "from-blue-900/60 to-gray-900/60 group-hover:bg-blue-700/60",
        cardBgClass: "from-blue-900/60 to-gray-900/60 hover:from-blue-800/60 hover:to-gray-800/60",
        animation: "rotate",
        hoverAnimation: {
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1.05, 1],
            transition: { duration: 0.6, ease: "easeInOut" as const }
        }
    },
    {
        name: "Mobile Development",
        icon: Smartphone,
        description: "React Native, iOS, Android",
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
        name: "Backend & Databases",
        icon: Database,
        description: "Node.js, Express, Python, Django, REST API, GraphQL, Firebase, PostgreSQL, DuckDB, Firestore",
        iconColorClass: "from-green-900/60 to-gray-900/60 group-hover:bg-green-700/60",
        cardBgClass: "from-green-900/60 to-gray-900/60 hover:from-green-800/60 hover:to-gray-800/60",
        animation: "scale",
        hoverAnimation: {
            scale: [1, 1.08, 1],
            transition: { duration: 0.6, ease: "easeInOut" as const }
        }
    },
    {
        name: "Graphics & Visualization",
        icon: BarChart,
        description: "WebGL, Three.js, D3.js",
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
        name: "State Management",
        icon: Code,
        description: "Redux, RxJS, Redux Saga, TanStack Query, Immer, Immutable.js",
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
        name: "DevOps & Leadership",
        icon: Code,
        description: "Git, Webpack, Rollup, AWS, Netlify, Hugo, Mentoring, Agile, Scrum Kanban",
        iconColorClass: "from-cyan-900/60 to-gray-900/60 group-hover:bg-cyan-700/60",
        cardBgClass: "from-cyan-900/60 to-gray-900/60 hover:from-cyan-800/60 hover:to-gray-800/60",
        animation: "float",
        hoverAnimation: {
            y: [0, -3, -6, -3, 0],
            scale: [1, 1.03, 1.05, 1.03, 1],
            transition: { duration: 0.6, ease: "easeInOut" as const }
        }
    }
];
