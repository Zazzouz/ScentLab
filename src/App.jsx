import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotesLibraryPage from "./pages/NotesLibraryPage";
import FragranceBuilder from "./components/FragranceBuilder";

/** Match Vite `base` (e.g. `/ScentLab/` on GitHub Pages, `/` locally). */
const routerBasename =
  import.meta.env.BASE_URL.replace(/\/$/, "") || undefined;

export default function App() {
  return (
    <BrowserRouter basename={routerBasename}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes" element={<NotesLibraryPage />} />
        <Route path="/builder" element={<FragranceBuilder />} />
      </Routes>
    </BrowserRouter>
  );
}
