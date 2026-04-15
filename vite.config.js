import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** GitHub Pages project URL uses /RepoName/; Netlify (and local preview) use "/". */
const GITHUB_PAGES_REPO = "ScentLab";

/** Browser → Vite → Ollama (avoids CORS on direct localhost:11434). */
const ollamaProxy = {
  "/ollama-api": {
    target: "http://127.0.0.1:11434",
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/ollama-api/, ""),
  },
};

export default defineConfig(({ mode }) => {
  const ghPages =
    mode === "production" && process.env.GITHUB_PAGES === "true";
  return {
    base: ghPages ? `/${GITHUB_PAGES_REPO}/` : "/",
    plugins: [react()],
    server: {
      port: 5173,
      /** Listen on all loopback aliases so http://localhost:5173 and http://127.0.0.1:5173 both hit the proxy. */
      host: true,
      strictPort: false,
      proxy: ollamaProxy,
    },
    preview: {
      port: 4173,
      host: true,
      proxy: ollamaProxy,
    },
  };
});
