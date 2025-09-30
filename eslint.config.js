import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import prettierConfig from "./prettier.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname
});

const prettierPlugin = (await import("eslint-plugin-prettier")).default;

const eslintConfig = [
    {
        ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "dist/**", "next-env.d.ts"]
    },
    // TypeScript/JavaScript files with full linting and formatting
    ...compat.extends("next/core-web-vitals", "next/typescript", "prettier").map((config) => ({
        ...config,
        files: ["**/*.{js,jsx,ts,tsx}"]
    })),
    // Prettier formatting for JS/TS files
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        plugins: {
            prettier: prettierPlugin
        },
        rules: {
            "prettier/prettier": ["error", prettierConfig]
        }
    }
];

export default eslintConfig;
