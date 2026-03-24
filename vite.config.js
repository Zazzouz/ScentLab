import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages project site: https://<user>.github.io/<repo>/
const repo = "ScentLab";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? `/${repo}/` : "/",
  plugins: [react()],
  server: {
    port: 5173,
    host: "127.0.0.1",
    strictPort: false,
  },
  preview: {
    port: 4173,
    host: "127.0.0.1",
  },
}));
