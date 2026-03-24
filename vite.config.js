import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** GitHub Pages project URL uses /RepoName/; Netlify (and local preview) use "/". */
const GITHUB_PAGES_REPO = "ScentLab";

export default defineConfig(({ mode }) => {
  const ghPages =
    mode === "production" && process.env.GITHUB_PAGES === "true";
  return {
    base: ghPages ? `/${GITHUB_PAGES_REPO}/` : "/",
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
  };
});
