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
