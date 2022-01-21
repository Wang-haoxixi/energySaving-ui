module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "comma-dangle": ["error", "always-multiline"],
    "@typescript-eslint/semi": ["error"],
    "@typescript-eslint/no-empty-function": ["off"],
    "@typescript-eslint/camelcase": ["off"],
    "@typescript-eslint/no-explicit-any": ["off"],
    "prettier/prettier": [
      "error",
      {
        bracketSpacing: true,
        jsxBracketSameLine: true,
        insertPragma: true,
        requirePragma: true,
        trailingComma: "all"
      }
    ],
  }
};
