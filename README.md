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

## Deploy

Build output is in `dist/`. Host on Netlify, GitHub Pages, Vercel, etc., configured for a SPA (redirect all routes to `index.html`).

## Student project

Mid-term web project — fragrance education and experimentation.
