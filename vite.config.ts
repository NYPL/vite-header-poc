import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

module.exports = defineConfig({
  plugins: [react()],
  root,
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        header: resolve(root, "header", "index.html"),
        footer: resolve(root, "footer", "index.html"),
        "header-latest": resolve(root, "header", "main.tsx"),
        "footer-latest": resolve(root, "footer", "main.tsx"),
      },
      output: {
        entryFileNames: "[name].js",
      }
    },
  },
});