"use client";

import type { ReactNode } from "react";
import {
    SiJavascript,
    SiTypescript,
    SiReact,
    SiNextdotjs,
    SiGit,
    SiHtml5,
    SiCss3,
    SiSass,
    SiTailwindcss,
    SiStyledcomponents,
    SiChakraui,
    SiNodedotjs,
    SiExpress,
    SiPython,
    SiDjango,
    SiFirebase,
    SiPostgresql,
    SiSqlite,
    SiD3Dotjs,
    SiRedux,
    SiReactquery,
    SiReactrouter,
    SiReactivex,
    SiDuckdb,
    SiAmazonwebservices,
    SiGooglecloud,
    SiNetlify,
    SiHugo,
    SiWebpack,
    SiRollupdotjs,
    SiThreedotjs,
    SiApple,
    SiAndroid,
    SiWebgl,
    SiImmer,
    SiFramer,
    SiGraphql,
    SiWebassembly,
    SiReduxsaga,
    SiVite,
    SiExpo,
    SiCplusplus,
    SiVuedotjs,
    SiElectron,
    SiOpengl,
    SiDocker,
    SiReacthookform,
    SiFlask,
    SiZod,
    SiNeo4J
} from "react-icons/si";
import {
    FiSettings,
    FiUsers,
    FiMessageCircle,
    FiTrendingUp,
    FiZap,
    FiCheckCircle,
    FiFileText,
    FiEdit3
} from "react-icons/fi";

interface TechBadgeProps {
    name: string;
}

const iconMap: Record<string, { icon: ReactNode; colorClass: string }> = {
    JavaScript: { icon: <SiJavascript />, colorClass: "text-yellow-400" },
    Typescript: { icon: <SiTypescript />, colorClass: "text-blue-400" },
    TypeScript: { icon: <SiTypescript />, colorClass: "text-blue-400" },
    React: { icon: <SiReact />, colorClass: "text-cyan-300" },
    "Framer Motion": { icon: <SiFramer />, colorClass: "text-white" },
    "Next.js": { icon: <SiNextdotjs />, colorClass: "text-white" },
    Git: { icon: <SiGit />, colorClass: "text-red-500" },
    "REST API": {
        icon: "API",
        colorClass: "text-gray-200 font-bold leading-none"
    },
    GraphQL: {
        icon: <SiGraphql />,
        colorClass: "text-pink-500"
    },
    HTML5: { icon: <SiHtml5 />, colorClass: "text-orange-500" },
    CSS3: { icon: <SiCss3 />, colorClass: "text-blue-500" },
    Sass: { icon: <SiSass />, colorClass: "text-pink-400" },
    "Tailwind CSS": { icon: <SiTailwindcss />, colorClass: "text-sky-400" },
    "Styled Components": {
        icon: <SiStyledcomponents />,
        colorClass: "text-pink-300"
    },
    "Chakra UI": { icon: <SiChakraui />, colorClass: "text-teal-300" },
    "React Native": { icon: <SiReact />, colorClass: "text-cyan-300" },
    iOS: { icon: <SiApple />, colorClass: "text-gray-200" },
    Android: { icon: <SiAndroid />, colorClass: "text-green-500" },
    "Node.js": { icon: <SiNodedotjs />, colorClass: "text-green-500" },
    Express: { icon: <SiExpress />, colorClass: "text-gray-200" },
    Python: { icon: <SiPython />, colorClass: "text-yellow-400" },
    Django: { icon: <SiDjango />, colorClass: "text-green-600" },
    Firebase: { icon: <SiFirebase />, colorClass: "text-amber-400" },
    PostgreSQL: { icon: <SiPostgresql />, colorClass: "text-sky-400" },
    "D3.js": { icon: <SiD3Dotjs />, colorClass: "text-orange-500" },
    WebGL: { icon: <SiWebgl />, colorClass: "text-red-400" },
    Shaders: { icon: <SiWebgl />, colorClass: "text-fuchsia-400" },
    DuckDB: { icon: <SiDuckdb />, colorClass: "text-amber-300" },
    Redux: { icon: <SiRedux />, colorClass: "text-purple-400" },
    "Redux Saga": { icon: <SiReduxsaga />, colorClass: "text-green-500" },
    "TanStack Query": { icon: <SiReactquery />, colorClass: "text-red-400" },
    RxJS: { icon: <SiReactivex />, colorClass: "text-pink-400" },
    "Immutable.js": {
        icon: "IM",
        colorClass: "text-gray-200 font-bold leading-none"
    },
    Immer: { icon: <SiImmer />, colorClass: "text-gray-200" },
    AWS: { icon: <SiAmazonwebservices />, colorClass: "text-orange-400" },
    Netlify: { icon: <SiNetlify />, colorClass: "text-cyan-400" },
    Hugo: { icon: <SiHugo />, colorClass: "text-pink-500" },
    Webpack: { icon: <SiWebpack />, colorClass: "text-sky-400" },
    Rollup: { icon: <SiRollupdotjs />, colorClass: "text-red-500" },
    "Three.js": { icon: <SiThreedotjs />, colorClass: "text-white" },
    WebWorkers: { icon: <FiSettings />, colorClass: "text-green-400" },
    WebAssembly: { icon: <SiWebassembly />, colorClass: "text-purple-400" },
    Emscripten: { icon: <SiWebassembly />, colorClass: "text-indigo-300" },
    Vite: { icon: <SiVite />, colorClass: "text-yellow-400" },
    Expo: { icon: <SiExpo />, colorClass: "text-white" },
    Firestore: { icon: <SiFirebase />, colorClass: "text-amber-400" },
    "Realtime Database": { icon: <SiFirebase />, colorClass: "text-teal-300" },
    "React Router": { icon: <SiReactrouter />, colorClass: "text-red-500" },
    "TanStack Router": { icon: <SiReactquery />, colorClass: "text-amber-400" },
    SQLite: { icon: <SiSqlite />, colorClass: "text-sky-400" },
    "Google Cloud": { icon: <SiGooglecloud />, colorClass: "text-blue-400" },
    "C/C++": { icon: <SiCplusplus />, colorClass: "text-blue-400" },
    "Vue.js": { icon: <SiVuedotjs />, colorClass: "text-green-400" },
    PostGraphile: {
        icon: "PG",
        colorClass: "text-purple-400 font-bold leading-none"
    },
    Electron: { icon: <SiElectron />, colorClass: "text-blue-400" },
    "OpenGL ES": { icon: <SiOpengl />, colorClass: "text-orange-400" },
    Docker: { icon: <SiDocker />, colorClass: "text-blue-400" },
    "React Hook Form": { icon: <SiReacthookform />, colorClass: "text-pink-400" },
    Zod: {
        icon: <SiZod />,
        colorClass: "text-blue-400 font-bold leading-none"
    },
    Neo4j: { icon: <SiNeo4J />, colorClass: "text-blue-600" },
    Flask: { icon: <SiFlask />, colorClass: "text-white" },
    // Soft Skills
    Leadership: { icon: <FiUsers />, colorClass: "text-amber-400" },
    "Client Communication": { icon: <FiMessageCircle />, colorClass: "text-blue-400" },
    Agile: { icon: <FiTrendingUp />, colorClass: "text-green-400" },
    "Problem Solving": { icon: <FiZap />, colorClass: "text-yellow-400" },
    "Team Collaboration": { icon: <FiUsers />, colorClass: "text-purple-400" },
    Scrum: { icon: <FiCheckCircle />, colorClass: "text-teal-400" },
    Kanban: { icon: <FiCheckCircle />, colorClass: "text-cyan-400" },
    "Code Review": { icon: <FiFileText />, colorClass: "text-pink-400" },
    Documentation: { icon: <FiFileText />, colorClass: "text-orange-400" },
    "Design Docs": { icon: <FiEdit3 />, colorClass: "text-indigo-400" }
};

export default function TechBadge({ name }: TechBadgeProps) {
    const map = iconMap[name] || null;

    return (
        <span
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full border border-gray-600/60 text-gray-200 text-sm bg-black/60"
            title={name}
        >
            {map && <span className={`${map.colorClass} text-xs`}>{map.icon}</span>}
            <span className="leading-none text-nowrap">{name}</span>
        </span>
    );
}
