import { FiCode as Code, FiDatabase as Database, FiGlobe as Globe, FiSmartphone as Smartphone } from "react-icons/fi";

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
        description: "JavaScript, TypeScript, React, Next.js, HTML5, CSS3, Tailwind CSS, Styled-Components, Chakra-UI",
        iconColorClass: "from-blue-900/50 to-gray-900/50 group-hover:bg-blue-700/50",
        cardBgClass: "from-blue-900/8 to-gray-900/50 hover:from-blue-800/20 hover:to-gray-800/40",
        animation: "rotate",
        hoverAnimation: {
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1.1, 1],
            transition: { duration: 0.9, ease: "easeInOut" as const }
        }
    },
    {
        name: "Mobile Development",
        icon: Smartphone,
        description: "React Native, iOS, Android",
        iconColorClass: "from-purple-900/50 to-gray-900/50 group-hover:bg-purple-700/50",
        cardBgClass: "from-purple-900/8 to-gray-900/50 hover:from-purple-800/20 hover:to-gray-800/40",
        animation: "bounce",
        hoverAnimation: {
            y: [0, -8, 0],
            scale: [1, 1.1, 1],
            transition: { duration: 0.9, ease: "easeInOut" as const }
        }
    },
    {
        name: "Backend & Databases",
        icon: Database,
        description: "Node.js, Express, Python, Django, Firebase, PostgreSQL, DuckDB, Firestore",
        iconColorClass: "from-green-900/50 to-gray-900/50 group-hover:bg-green-700/50",
        cardBgClass: "from-green-900/8 to-gray-900/50 hover:from-green-800/20 hover:to-gray-800/40",
        animation: "scale",
        hoverAnimation: {
            scale: [1, 1.2, 1],
            transition: { duration: 0.9, ease: "easeInOut" as const }
        }
    },
    {
        name: "Graphics & Visualization",
        icon: Code,
        description: "WebGL, Three.js, D3.js",
        iconColorClass: "from-pink-900/50 to-gray-900/50 group-hover:bg-pink-700/50",
        cardBgClass: "from-pink-900/8 to-gray-900/50 hover:from-pink-800/20 hover:to-gray-800/40",
        animation: "pulse",
        hoverAnimation: {
            scale: [1, 1.1, 1],
            opacity: [1, 0.8, 1],
            transition: { duration: 0.9, ease: "easeInOut" as const }
        }
    },
    {
        name: "State Management",
        icon: Code,
        description: "Redux, RxJS, Redux Saga, TanStack Query, Immer, Immutable.js",
        iconColorClass: "from-yellow-900/50 to-gray-900/50 group-hover:bg-yellow-700/50",
        cardBgClass: "from-yellow-900/8 to-gray-900/50 hover:from-yellow-800/20 hover:to-gray-800/40",
        animation: "wiggle",
        hoverAnimation: {
            rotate: [0, -5, 5, -5, 0],
            scale: [1, 1.1, 1.1, 1.1, 1],
            transition: { duration: 0.9, ease: "easeInOut" as const }
        }
    },
    {
        name: "DevOps & Leadership",
        icon: Code,
        description: "Git, Webpack, Rollup, AWS, Netlify, Hugo, Mentoring, Agile, Scrum Kanban",
        iconColorClass: "from-cyan-900/50 to-gray-900/50 group-hover:bg-cyan-700/50",
        cardBgClass: "from-cyan-900/8 to-gray-900/50 hover:from-cyan-800/20 hover:to-gray-800/40",
        animation: "float",
        hoverAnimation: {
            y: [0, -5, -10, -5, 0],
            scale: [1, 1.05, 1.1, 1.05, 1],
            transition: { duration: 0.9, ease: "easeInOut" as const }
        }
    }
];
