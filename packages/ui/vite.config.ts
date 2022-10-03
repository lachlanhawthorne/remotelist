import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import macrosPlugin from "vite-plugin-babel-macros";
import WindiCSS from "vite-plugin-windicss";
import dts from "vite-dts";
import svgrPlugin from "vite-plugin-svgr";

const isExternal = (id: string) => !id.startsWith(".") && !path.isAbsolute(id);

//library mode https://vitejs.dev/guide/build.html#library-mode
//github.com/ben-rogerson/twin.examples/blob/master/vite-emotion-typescript/vite.config.ts
//github.com/storybookjs/builder-vite/issues/210
export default defineConfig(() => ({
  esbuild: {
    jsxFactory: "jsx",
    jsxInject: `
      import React from 'react';
      import { jsx } from '@emotion/react';
    `,
  },
  test: {
    environment: "happy-dom", // or 'jsdom', 'node',
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
  build: {
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      external: isExternal,
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
  plugins: [
    dts(),
    svgrPlugin({
      exportAsDefault: true,
      svgrOptions: {
        icon: true,
      },
    }),
    react({
      exclude: [/\.stories\.(t|j)sx?$/, /node_modules/],
      fastRefresh: true,
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: [
          "babel-plugin-macros", //breaks vitest
          [
            "@emotion/babel-plugin-jsx-pragmatic",
            {
              export: "jsx",
              import: "__cssprop",
              module: "@emotion/react",
            },
          ],
          [
            "@babel/plugin-transform-react-jsx",
            { pragma: "__cssprop" },
            "twin.macro",
          ],
        ],
      },
    }),
    WindiCSS(),
    macrosPlugin(),
  ],
}));
