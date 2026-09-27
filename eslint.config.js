// eslint.config.js
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const importPlugin = require("eslint-plugin-import");

module.exports = defineConfig([
  expoConfig,
  {
    files: ["**/*.{ts,tsx,js}"],
    plugins: {
      import: importPlugin,
    },
    settings: {
      // "@/*" のようなパスエイリアスを import/no-restricted-paths に解決させるために必要
      "import/resolver": {
        typescript: { project: "./tsconfig.json" },
      },
    },
    rules: {
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            {
              from: "./backend/**",
              target: ["./src/**"],
              message: "/src 配下から /backend は import できません",
            },
            {
              from: "./src/data/global-state/**",
              target: ["./src/!(hooks)/**"],
              message:
                "/src/data/global-state は /src/hooks からのみ import 可能です",
            },
            {
              from: "./src/hooks/**",
              target: ["./src/hooks/**"],
              message: "hooks 同士の import は禁止です",
            },
          ],
        },
      ],
    },
  },
]);
