import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";

export default defineConfig({
  publicDir: false,
  resolve: {
    alias: {},
  },
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
    externalizeDeps(),
  ],
  build: {
    target: "es2015",
    outDir: "./dist",
    lib: {
      entry: "./src/index.ts",
      formats: ["es", "cjs"],
      name: "react-emoji-explosion",
      fileName: (format) => `${format}/index.js`,
    },
    rollupOptions: {
      output: {
        format: "es",
        dir: "dist",
        preserveModules: true,
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
