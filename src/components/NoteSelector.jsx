import { useState } from "react";
import {
  getFamiliesPresentInLayer,
  getNotesForLayerAndFamily,
} from "../data/notes";
import { NOTE_FAMILIES } from "../data/noteFamilies";

const LAYERS = [
  { key: "top", label: "Top notes" },
  { key: "middle", label: "Middle notes" },
  { key: "base", label: "Base notes" },
];

const familyLabel = (id) =>
  NOTE_FAMILIES.find((f) => f.id === id)?.label ?? id;

export default function NoteSelector({ fragrance, onAddNote }) {
  const [activeLayer, setActiveLayer] = useState("top");
  const [activeFamily, setActiveFamily] = useState("all");

  const familiesInLayer = getFamiliesPresentInLayer(activeLayer);
  const selectedIds = new Set(
    fragrance[`${activeLayer}Notes`].map((n) => n.noteId)
  );

  const list = getNotesForLayerAndFamily(activeLayer, activeFamily);

  const switchLayer = (key) => {
    setActiveLayer(key);
    setActiveFamily("all");
  };

  return (
    <div className="panel">
      <h2 className="panel-title">
        Note library <span className="badge">Add to blend</span>
      </h2>
      <div className="note-layer-tabs" role="tablist" aria-label="Pyramid layer">
        {LAYERS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={activeLayer === key}
            className={`note-layer-tab${activeLayer === key ? " is-active" : ""}`}
            onClick={() => switchLayer(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="note-family-hint">Filter by family for this layer:</p>
      <div className="note-family-chips" role="tablist" aria-label="Note family">
        <button
          type="button"
          role="tab"
          aria-selected={activeFamily === "all"}
          className={`note-family-chip${activeFamily === "all" ? " is-active" : ""}`}
          onClick={() => setActiveFamily("all")}
        >
          All
        </button>
        {familiesInLayer.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={activeFamily === f.id}
            className={`note-family-chip${activeFamily === f.id ? " is-active" : ""}`}
            onClick={() => setActiveFamily(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="note-chip-grid" role="tabpanel">
        {list.map((note) => {
          const taken = selectedIds.has(note.id);
          return (
            <button
              key={note.id}
              type="button"
              className="note-chip"
              disabled={taken}
              onClick={() => onAddNote(activeLayer, note.id)}
              title={note.description}
            >
              <span>{note.name}</span>
              <small>{familyLabel(note.group)}</small>
            </button>
          );
        })}
      </div>
    </div>
  );
}
