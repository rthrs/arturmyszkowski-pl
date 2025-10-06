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
    SiD3Dotjs,
    SiRedux,
    SiReactquery,
    SiReactivex,
    SiDuckdb,
    SiAmazonwebservices,
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
    SiGraphql
} from "react-icons/si";

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
        icon: <span className="font-bold text-[10px]">API</span>,
        colorClass: "text-gray-200"
    },
    GraphQL: {
        icon: <SiGraphql />,
        colorClass: "text-pink-500"
    },
    HTML5: { icon: <SiHtml5 />, colorClass: "text-orange-500" },
    CSS3: { icon: <SiCss3 />, colorClass: "text-blue-500" },
    Sass: { icon: <SiSass />, colorClass: "text-pink-400" },
    "Tailwind CSS": { icon: <SiTailwindcss />, colorClass: "text-sky-400" },
    "Styled-Components": {
        icon: <SiStyledcomponents />,
        colorClass: "text-pink-300"
    },
    "Chakra-UI": { icon: <SiChakraui />, colorClass: "text-teal-300" },
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
    DuckDB: { icon: <SiDuckdb />, colorClass: "text-amber-300" },
    Redux: { icon: <SiRedux />, colorClass: "text-purple-400" },
    "Redux Saga": { icon: <SiRedux />, colorClass: "text-purple-400" },
    "TanStack Query": { icon: <SiReactquery />, colorClass: "text-red-400" },
    RxJS: { icon: <SiReactivex />, colorClass: "text-pink-400" },
    "Immutable.js": {
        icon: <span className="font-bold text-[10px]">IM</span>,
        colorClass: "text-gray-200"
    },
    Immer: { icon: <SiImmer />, colorClass: "text-gray-200" },
    AWS: { icon: <SiAmazonwebservices />, colorClass: "text-orange-400" },
    Netlify: { icon: <SiNetlify />, colorClass: "text-cyan-400" },
    Hugo: { icon: <SiHugo />, colorClass: "text-pink-500" },
    Webpack: { icon: <SiWebpack />, colorClass: "text-sky-400" },
    Rollup: { icon: <SiRollupdotjs />, colorClass: "text-red-500" },
    "Three.js": { icon: <SiThreedotjs />, colorClass: "text-white" }
};

const aliasMap: Record<string, string> = {
    "CSS3/Sass": "CSS3",
    "Styled Components": "Styled-Components",
    "Chakra UI": "Chakra-UI",
    ThreeJS: "Three.js",
    ThreeJs: "Three.js",
    NextJS: "Next.js",
    NextJs: "Next.js",
    Postgres: "PostgreSQL",
    "React Query": "TanStack Query",
    JS: "JavaScript",
    TS: "TypeScript",
    Firestore: "Firebase",
    Duckdb: "DuckDB",
    duckdb: "DuckDB"
};

export default function TechBadge({ name }: TechBadgeProps) {
    const key = aliasMap[name] ?? name;
    const map = iconMap[key] || null;

    return (
        <span
            className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-gray-600/60 text-gray-200 text-sm/none bg-black/60"
            title={name}
        >
            {map && <span className={`${map.colorClass} text-[14px]`}>{map.icon}</span>}
            <span className="leading-none">{name}</span>
        </span>
    );
}
