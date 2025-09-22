import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    {
        ignores: [
            "node_modules/**",
            ".next/**",
            "out/**",
            "build/**",
            "dist/**",
            "next-env.d.ts",
            "*.config.js",
            "*.config.mjs",
            "tailwind.config.js",
            "postcss.config.mjs",
        ],
    },
    ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
    {
        plugins: {
            prettier: (await import("eslint-plugin-prettier")).default,
        },
        rules: {
            "prettier/prettier": "error",
            indent: ["error", 4, { SwitchCase: 1 }],
        },
    },
];

export default eslintConfig;
