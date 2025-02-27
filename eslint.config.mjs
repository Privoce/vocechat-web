// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
// import prettierConfig from "eslint-config-prettier";
export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { ignoreRestSiblings: true }],
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      semi: 2,
      "no-console": "off",
      "no-empty-pattern": "off",
      "no-control-regex": "off",
      "prefer-const": "off",
      "react/prop-types": 0,
      "react/no-unescaped-entities": "off",
      "no-unused-vars": "off",
      "max-lines": ["warn", { max: 500 }],
      "react/display-name": 0,
      "@typescript-eslint/ban-ts-comment": "off"
    }
  },
  {
    ignores: [
      "src/libs/polyfills.js",
      "tailwind.config.js",
      "**/*.d.ts",
      "scripts/**/*",
      "node_modules/**/*",
      "config/**/*",
      "build/**/*",
      "public/**/*"
    ]
  },
  // prettierConfig
);
