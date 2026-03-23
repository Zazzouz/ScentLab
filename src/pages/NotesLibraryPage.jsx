import { useMemo, useState, useCallback } from "react";
import SiteHeader from "../components/SiteHeader";
import { NOTES } from "../data/notes";
import { NOTE_FAMILIES } from "../data/noteFamilies";
import { getNoteImage, COMMONS_CREDIT } from "../data/noteImages";
import "../styles/landing.css";
import "../styles/notes-library.css";

const GRADE_KEYS = [
  { key: "sweetness", label: "Sweetness" },
  { key: "freshness", label: "Freshness" },
  { key: "warmth", label: "Warmth" },
  { key: "smokiness", label: "Smokiness" },
  { key: "woodsiness", label: "Woodsiness" },
  { key: "cleanliness", label: "Cleanliness" },
];

const MAX = 5;

const LAYERS = [
  { id: "all", label: "All layers" },
  { id: "top", label: "Top" },
  { id: "middle", label: "Middle" },
  { id: "base", label: "Base" },
];

function GradeDots({ value }) {
  const v = Math.min(MAX, Math.max(0, value));
  return (
    <span className="grade-dots" aria-hidden>
      {Array.from({ length: MAX }, (_, i) => (
        <i key={i} className={i < v ? "on" : ""} />
      ))}
    </span>
  );
}

function NoteRefCard({ note, familyLabel }) {
  const layerClass =
    note.layer === "top"
      ? "note-ref-badge--top"
      : note.layer === "middle"
        ? "note-ref-badge--middle"
        : "note-ref-badge--base";

  const grades = note.grades || {};
  const [imgSrc, setImgSrc] = useState(() => getNoteImage(note));
  const fallback = useCallback(() => {
    setImgSrc(
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=560&q=80"
    );
  }, []);

  return (
    <article className="note-ref-card">
      <div className="note-ref-image-wrap">
        <img
          className="note-ref-image"
          src={imgSrc}
          alt={`Photo reference: ${note.name}`}
          loading="lazy"
          decoding="async"
          onError={fallback}
        />
      </div>
      <div className="note-ref-body">
        <div className="note-ref-head">
          <h3>{note.name}</h3>
          <div className="note-ref-badges">
            <span className="note-ref-badge note-ref-badge--family">{familyLabel}</span>
            <span className={`note-ref-badge ${layerClass}`}>{note.layer} note</span>
          </div>
        </div>
        <p className="note-ref-desc">{note.description}</p>
        <p className="note-ref-grades-title">Strength in each direction (0–5)</p>
        <div className="note-ref-grades">
          {GRADE_KEYS.map(({ key, label }) => (
            <div key={key} className="note-ref-grade-row">
              <span>{label}</span>
              <GradeDots value={grades[key] ?? 0} />
              <span className="note-ref-grade-val">{grades[key] ?? 0}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function familyLabelFor(id) {
  return NOTE_FAMILIES.find((f) => f.id === id)?.label ?? id;
}

export default function NotesLibraryPage() {
  const [search, setSearch] = useState("");
  const [layer, setLayer] = useState("all");
  const [family, setFamily] = useState("all");

  const baseFiltered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return NOTES.filter((note) => {
      if (layer !== "all" && note.layer !== layer) return false;
      if (family !== "all" && note.group !== family) return false;
      if (!q) return true;
      if (note.name.toLowerCase().includes(q)) return true;
      if (note.description.toLowerCase().includes(q)) return true;
      if (note.category.toLowerCase().includes(q)) return true;
      if ((note.tags || []).some((t) => t.toLowerCase().includes(q))) return true;
      if (familyLabelFor(note.group).toLowerCase().includes(q)) return true;
      return false;
    });
  }, [search, layer, family]);

  const sortedNotes = useMemo(
    () => [...baseFiltered].sort((a, b) => a.name.localeCompare(b.name)),
    [baseFiltered]
  );

  const { countsByFamily, totalMatchingLayerSearch } = useMemo(() => {
    const q = search.trim().toLowerCase();
    const counts = {};
    for (const f of NOTE_FAMILIES) counts[f.id] = 0;
    let total = 0;
    const matchesSearch = (note) => {
      if (!q) return true;
      return (
        note.name.toLowerCase().includes(q) ||
        note.description.toLowerCase().includes(q) ||
        note.category.toLowerCase().includes(q) ||
        (note.tags || []).some((t) => t.toLowerCase().includes(q)) ||
        familyLabelFor(note.group).toLowerCase().includes(q)
      );
    };
    for (const note of NOTES) {
      if (layer !== "all" && note.layer !== layer) continue;
      if (!matchesSearch(note)) continue;
      total += 1;
      counts[note.group] = (counts[note.group] || 0) + 1;
    }
    return { countsByFamily: counts, totalMatchingLayerSearch: total };
  }, [search, layer]);

  const sections = useMemo(() => {
    const byFamily = {};
    for (const n of sortedNotes) {
      if (!byFamily[n.group]) byFamily[n.group] = [];
      byFamily[n.group].push(n);
    }
    return NOTE_FAMILIES.map((f) => ({
      family: f,
      notes: byFamily[f.id] || [],
    })).filter((s) => s.notes.length > 0);
  }, [sortedNotes]);

  const clearFilters = () => {
    setSearch("");
    setLayer("all");
    setFamily("all");
  };

  const hasActiveFilters =
    search.trim() !== "" || layer !== "all" || family !== "all";

  return (
    <>
      <SiteHeader />
      <div className="notes-lib-page">
        <div className="notes-lib-layout">
          <aside className="notes-lib-filters" aria-label="Filter notes">
            <div className="notes-lib-filters-inner">
              <h2 className="notes-lib-filters-title">Browse</h2>
              <label className="notes-lib-search-label" htmlFor="note-search">
                Search
              </label>
              <input
                id="note-search"
                type="search"
                className="notes-lib-search"
                placeholder="Name, tag, family, description…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoComplete="off"
              />

              <p className="notes-lib-filter-heading">Pyramid layer</p>
              <div className="notes-lib-layer-pills" role="group" aria-label="Layer">
                {LAYERS.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    className={`notes-lib-pill${layer === id ? " is-active" : ""}`}
                    onClick={() => setLayer(id)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <p className="notes-lib-filter-heading">Family</p>
              <ul className="notes-lib-family-list">
                <li>
                  <button
                    type="button"
                    className={`notes-lib-family-btn${family === "all" ? " is-active" : ""}`}
                    onClick={() => setFamily("all")}
                  >
                    <span>All families</span>
                    <span className="notes-lib-count">{totalMatchingLayerSearch}</span>
                  </button>
                </li>
                {NOTE_FAMILIES.map((f) => (
                  <li key={f.id}>
                    <button
                      type="button"
                      className={`notes-lib-family-btn${family === f.id ? " is-active" : ""}`}
                      onClick={() => setFamily(f.id)}
                    >
                      <span>{f.label}</span>
                      <span className="notes-lib-count">{countsByFamily[f.id] ?? 0}</span>
                    </button>
                  </li>
                ))}
              </ul>

              {hasActiveFilters && (
                <button type="button" className="notes-lib-clear" onClick={clearFilters}>
                  Clear filters
                </button>
              )}
            </div>
          </aside>

          <div className="notes-lib-main">
            <header className="notes-lib-hero">
              <h1>Notes Library</h1>
              <p>
                Every material includes a short description, a representative photo, and{" "}
                <strong>0–5 grades</strong> for how strongly it pushes each accord direction. Use the
                sidebar to search and filter by layer or family.
              </p>
              <p className="notes-lib-result-count">
                Showing <strong>{sortedNotes.length}</strong> of {NOTES.length} notes
                {hasActiveFilters ? " (filtered)" : ""}
              </p>
            </header>

            {sortedNotes.length === 0 ? (
              <div className="notes-lib-empty">
                <p>No notes match your filters.</p>
                <button type="button" className="notes-lib-clear" onClick={clearFilters}>
                  Reset filters
                </button>
              </div>
            ) : (
              sections.map(({ family: fam, notes }) => (
                <section
                  key={fam.id}
                  className="notes-lib-section"
                  id={`family-${fam.id}`}
                >
                  <h2>{fam.label}</h2>
                  <p className="notes-lib-section-meta">{notes.length} in this family</p>
                  <div className="notes-lib-grid">
                    {notes.map((note) => (
                      <NoteRefCard
                        key={note.id}
                        note={note}
                        familyLabel={fam.label}
                      />
                    ))}
                  </div>
                </section>
              ))
            )}

            <div className="note-ref-legend">
              <strong>How to read grades:</strong> Scores run from <strong>0</strong> (weak) to{" "}
              <strong>5</strong> (strong) for how much the note contributes to sweetness, freshness,
              warmth, smokiness, woodsiness, and cleanliness.
              <br />
              <br />
              <strong>Images:</strong> {COMMONS_CREDIT} For <strong>white musk</strong>, the photo shows{" "}
              <strong>ambrette</strong> (<em>Abelmoschus moschatus</em>) seeds—a traditional natural musk note—since
              lab “white musk” has no physical plant photo.
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container footer-inner">
          <p className="footer-brand">ScentLab</p>
          <p className="footer-tagline">Student Project</p>
          <p className="footer-link">
            <a href="https://github.com/Zazzouz/ScentLab" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
