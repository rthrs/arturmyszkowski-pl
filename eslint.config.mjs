import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname
});

const prettierPlugin = (await import("eslint-plugin-prettier")).default;

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
            "postcss.config.mjs"
        ]
    },
    ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
    {
        plugins: {
            prettier: prettierPlugin
        },
        rules: {
            "prettier/prettier": [
                "error",
                {
                    usePrettierrc: false,
                    semi: true,
                    trailingComma: "none",
                    singleQuote: false,
                    printWidth: 120,
                    tabWidth: 4,
                    useTabs: false,
                    bracketSpacing: true,
                    arrowParens: "always",
                    endOfLine: "lf"
                }
            ]
        }
    }
];

export default eslintConfig;
