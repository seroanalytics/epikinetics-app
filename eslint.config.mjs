import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";


export default [
    {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
    {
        settings: {
            react: {
                version: "detect",
            },
        }, languageOptions: {parserOptions: {ecmaFeatures: {jsx: true}}}
    },
    {files: ["**/*.js"], languageOptions: {sourceType: "script"}},
    {languageOptions: {globals: globals.browser}},
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReactConfig,
    {
        rules: {
            "react/react-in-jsx-scope":
                "off",
            "react/jsx-uses-react":
                "off"
        }
    }
];
