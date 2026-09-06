import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    "node_modules/",
    "dist/",
    "build/",
    "coverage/",
    "*.min.js",
    ".next/",
    "out/",
  ]),
]);

export default eslintConfig;
