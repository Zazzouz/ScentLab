# ScentLab

Design custom fragrances with a **React** builder: note pyramid, accord sliders, performance targets, live rule-based summaries, and **localStorage** saves—no backend.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown (usually `http://localhost:5173`).

- **Home** — marketing / landing page (`/`)
- **Builder** — interactive fragrance lab (`/builder`)

### AI suggestions (Ollama)

The **Fragrance Builder** includes an **AI suggestions** panel that calls a local **[Ollama](https://ollama.com/)** server (`POST /api/chat`). It sends your current pyramid, derived accord profile, and performance settings, then shows educational recommendations.

1. Install and start Ollama on your machine.
2. **Download at least one model**, e.g. `ollama pull llama3.2`. The builder **detects installed models** automatically (you do not need to match a name exactly in `.env` unless you want a specific one—then set **`VITE_OLLAMA_MODEL`**).

   If `ollama` is not found on Windows, run:

   ```powershell
   & "$env:LOCALAPPDATA\Programs\Ollama\ollama.exe" pull llama3.2
   ```

3. **`npm run dev`** sends AI requests to **`/ollama-api`**, and **Vite proxies** them to `http://127.0.0.1:11434`. You normally **do not** need to configure Ollama CORS for the browser.

4. Optional **`.env.local`** (copy from **`.env.example`**):

   ```bash
   VITE_OLLAMA_MODEL=llama3.2:latest
   ```

   Set **`VITE_OLLAMA_URL=http://127.0.0.1:11434`** only if you want the browser to call Ollama **directly** (then you may need **`OLLAMA_ORIGINS`** on the Ollama side for `http://localhost:5173`).

The **deployed Netlify site (HTTPS)** cannot use local Ollama from the browser. For AI, run **`npm run dev`** and open **`http://localhost:5173/builder`** (not the Netlify URL).

**Troubleshooting AI:** Run `ollama list`. If the **NAME** column doesn’t include the model ScentLab expects, run `ollama pull <that-name>` or set **`VITE_OLLAMA_MODEL`** in **`.env.local`** to an exact name from the list. Restart **`npm run dev`** after changing env.

Production build:

```bash
npm run build
npm run preview
```

## Tech stack

- **Vite** + **React 18** + **React Router**
- **Plain CSS** (no Tailwind): `src/styles/landing.css` (home), `src/styles/builder.css` (builder)
- **localStorage** key: `scentlab-saved-fragrances`

## Legacy static files

Root `styles.css` was the original landing stylesheet; the live app copies that look via `src/styles/landing.css`. You can remove `styles.css` / `script.js` if you only use the Vite app.

## Deploy on Netlify

Connect the repo or drag-and-drop the project folder. **Build command:** `npm run build` · **Publish directory:** `dist`  
(Or rely on root **`netlify.toml`**—already set.)

Production builds use **`base: '/'`** so assets load at the site root (fixes a blank screen). **`netlify.toml`** + **`public/_redirects`** send all routes to `index.html` for React Router.

Redeploy after pulling these changes.

## Live site (GitHub Pages)

The GitHub Actions workflow sets **`GITHUB_PAGES=true`** so the build uses **`base: '/ScentLab/'`**. Turn on **Settings → Pages → Source: GitHub Actions**.

If the repo name is not `ScentLab`, change **`GITHUB_PAGES_REPO`** in `vite.config.js` to match.

**Example URL:** `https://<user>.github.io/ScentLab/`

Local **`npm run dev`** always uses **`base: '/'`**.

## Student project

Mid-term web project — fragrance education and experimentation.
