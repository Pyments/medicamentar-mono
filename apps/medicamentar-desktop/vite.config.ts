import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import electron from "vite-plugin-electron/simple";

export default defineConfig({
  root: ".",
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"),
      output: {
        manualChunks: undefined,
        format: "es",
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
  plugins: [
    react(),
    electron({
      main: {
        entry: "electron/main.ts",
        vite: {
          build: {
            sourcemap: true,
            outDir: "dist-electron",
          },
        },
      },
      preload: {
        input: path.join(__dirname, "electron/preload.ts"),
      },
      renderer: {},
    }),
  ],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      { find: "@components", replacement: path.resolve(__dirname, "src/components") },
      { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
      { find: "@utils", replacement: path.resolve(__dirname, "src/utils") },
      { find: "@assets", replacement: path.resolve(__dirname, "src/assets") },
      { find: "@types", replacement: path.resolve(__dirname, "src/types") },
      { find: "@theme", replacement: path.resolve(__dirname, "src/constants/theme" ) },
      { find: "@hooks", replacement: path.resolve(__dirname, "src/hooks") },
      { find: "@constants", replacement: path.resolve(__dirname, "src/constants") },
      { find: "@utils", replacement: path.resolve(__dirname, "src/utils") },
    ],
  },
});
