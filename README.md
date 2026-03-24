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

## Live site (GitHub Pages)

After you turn on **Pages** in the repo (**Settings → Pages → Build and deployment → Source: GitHub Actions**), pushes to `main` deploy automatically.

**URL:** [https://zazzouz.github.io/ScentLab/](https://zazzouz.github.io/ScentLab/)  
(If your GitHub username or repo name differs, update `repo` in `vite.config.js` to match the repo name exactly.)

Production uses `base: '/ScentLab/'`; local `npm run dev` still uses `/`.

## Deploy elsewhere

Build output is in `dist/`. For Netlify/Vercel, set `base: '/'` in `vite.config.js` (or use their env) and configure SPA fallback to `index.html`.

## Student project

Mid-term web project — fragrance education and experimentation.
