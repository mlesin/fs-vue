/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:boundaries/recommended",
  ],
  // parser: "@typescript-eslint/parser",
  settings: {
    "import/resolver": {
      typescript: {},
    },
    "boundaries/elements": [
      {
        type: "app",
        pattern: "app/*",
      },
      {
        type: "processes",
        pattern: "processes/*",
      },
      {
        type: "pages",
        pattern: "pages/*",
      },
      {
        type: "widgets",
        pattern: "widgets/*",
      },
      {
        type: "features",
        pattern: "features/*",
      },
      {
        type: "entities",
        pattern: "entities/*",
      },
      {
        type: "shared",
        pattern: "shared/*",
      },
    ],
    "boundaries/ignore": ["**/*.test.*"],
  },
  rules: {
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "always",
        pathGroups: [
          {
            group: "internal",
            position: "after",
            pattern: "@/processes/**",
          },
          {
            group: "internal",
            position: "after",
            pattern: "@/pages/**",
          },
          {
            group: "internal",
            position: "after",
            pattern: "@/widgets/**",
          },
          {
            group: "internal",
            position: "after",
            pattern: "@/features/**",
          },
          {
            group: "internal",
            position: "after",
            pattern: "@/entities/**",
          },
          {
            group: "internal",
            position: "after",
            pattern: "@/shared/**",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
      },
    ],
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            message:
              "Private imports are prohibited, use public imports instead",
            group: ["@/app/**"],
          },
          {
            message:
              "Private imports are prohibited, use public imports instead",
            group: ["@/processes/*/**"],
          },
          {
            message:
              "Private imports are prohibited, use public imports instead",
            group: ["@/pages/*/**"],
          },
          {
            message:
              "Private imports are prohibited, use public imports instead",
            group: ["@/widgets/*/**"],
          },
          {
            message:
              "Private imports are prohibited, use public imports instead",
            group: ["@/features/*/**"],
          },
          {
            message:
              "Private imports are prohibited, use public imports instead",
            group: ["@/entities/*/**"],
          },
          {
            message:
              "Private imports are prohibited, use public imports instead",
            group: ["@/shared/*/*/**"],
          },
          {
            message:
              "Prefer absolute imports instead of relatives (for root modules)",
            group: ["../**/app"],
          },
          {
            message:
              "Prefer absolute imports instead of relatives (for root modules)",
            group: ["../**/processes"],
          },
          {
            message:
              "Prefer absolute imports instead of relatives (for root modules)",
            group: ["../**/pages"],
          },
          {
            message:
              "Prefer absolute imports instead of relatives (for root modules)",
            group: ["../**/widgets"],
          },
          {
            message:
              "Prefer absolute imports instead of relatives (for root modules)",
            group: ["../**/features"],
          },
          {
            message:
              "Prefer absolute imports instead of relatives (for root modules)",
            group: ["../**/entities"],
          },
          {
            message:
              "Prefer absolute imports instead of relatives (for root modules)",
            group: ["../**/shared"],
          },
        ],
      },
    ],
    "boundaries/element-types": [
      "warn",
      {
        default: "disallow",
        rules: [
          {
            from: "app",
            allow: [
              "processes",
              "pages",
              "widgets",
              "features",
              "entities",
              "shared",
            ],
          },
          {
            from: "processes",
            allow: ["pages", "widgets", "features", "entities", "shared"],
          },
          {
            from: "pages",
            allow: ["widgets", "features", "entities", "shared"],
          },
          {
            from: "widgets",
            allow: ["features", "entities", "shared"],
          },
          {
            from: "features",
            allow: ["entities", "shared"],
          },
          {
            from: "entities",
            allow: ["shared"],
          },
          {
            from: "shared",
            allow: ["shared"],
          },
        ],
      },
    ],
    "vue/multi-word-component-names": "off",
  },
  overrides: [
    {
      files: ["**/*.test.*"],
      rules: {
        "boundaries/element-types": "off",
      },
    },
  ],
};
