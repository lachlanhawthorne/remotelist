import "../src/index.css";
import React from "react";
import { useDarkMode } from "storybook-dark-mode";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  stylePreview: false,
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <div className={useDarkMode() ? "dark" : "light"}>
      <div data-theme="myTheme">{Story()}</div>
    </div>
  ),
];
