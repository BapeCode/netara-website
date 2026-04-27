import js from "@eslint/js"
import ts from "typescript-eslint"
import astro from "eslint-plugin-astro"

export default [
    js.configs.recommended,
    ...ts.configs.recommended,
    ...astro.configs.recommended,
    {
        files: ["**/*.{js,ts,astro}"],
        rules: {
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/no-explicit-any": "warn",
        }
    }
]