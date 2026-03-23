import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotesLibraryPage from "./pages/NotesLibraryPage";
import FragranceBuilder from "./components/FragranceBuilder";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes" element={<NotesLibraryPage />} />
        <Route path="/builder" element={<FragranceBuilder />} />
      </Routes>
    </BrowserRouter>
  );
}
