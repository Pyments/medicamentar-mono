import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import electron from "vite-plugin-electron/simple";

export default defineConfig({
  root: ".",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"),
    },
  },
  plugins: [
    electron({
      main: {
        entry: "electron/main.ts",
      },

      preload: {
        input: "electron/preload.ts",
      },
      renderer: {},
    }),
    react(),
  ],
  optimizeDeps: {
    include: ["@emotion/react", "@emotion/styled"],
  },
});
