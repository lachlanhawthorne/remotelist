const { mergeConfig } = require("vite");
const path = require("path");
const dts = require("vite-dts").default;
const react = require("@vitejs/plugin-react");
const macrosPlugin = require("vite-plugin-babel-macros");
const WindiCSS = require("vite-plugin-windicss");
const babel = require("vite-plugin-babel");
const svgr = require("vite-plugin-svgr");

module.exports = {
  features: {
    babelModeV7: true, //https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#babel-mode-v7
  },

  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "storybook-dark-mode",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
  },
  async viteFinal(config, { configType }) {
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    config.plugins = [
      // ...config.plugins,
      ...config.plugins.filter((plugin) => {
        return !(
          Array.isArray(plugin) && plugin[0].name === "vite:react-babel"
        );
      }),
      react({
        exclude: [/\.stories\.(t|j)sx?$/, /node_modules/],
        fastRefresh: true,
        jsxImportSource: "@emotion/react",
        jsxRuntime: "automatic",
        babel: { plugins: ["@emotion/babel-plugin"], babelrc: false },
      }),

      macrosPlugin.default(),
      WindiCSS.default(),
      svgr()
    ];
    return config;
  },
};
