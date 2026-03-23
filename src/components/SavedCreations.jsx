import { useState } from "react";
import { cloneFragrance } from "../utils/fragranceModel";
import { generateId } from "../utils/storage";

export default function SavedCreations({
  savedList,
  onSave,
  onLoad,
  onDuplicate,
  onDelete,
  currentFragrance,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    const n = name.trim();
    if (!n) return;
    const payload = cloneFragrance(currentFragrance);
    payload.name = n;
    payload.description = description.trim();
    onSave(payload);
    setName("");
    setDescription("");
  };

  return (
    <div className="panel" id="saved">
      <h2 className="panel-title">
        Saved creations <span className="badge">localStorage</span>
      </h2>
      <form className="save-form" onSubmit={handleSave}>
        <input
          type="text"
          placeholder="Fragrance name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Fragrance name"
        />
        <textarea
          placeholder="Short description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-label="Description"
        />
        <button type="submit">Save current blend</button>
      </form>
      {savedList.length === 0 ? (
        <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--soft-gray)" }}>
          No saved fragrances yet. Name your blend and click save.
        </p>
      ) : (
        <div className="saved-list">
          {savedList.map((item) => (
            <div key={item.id} className="saved-card">
              <h4>{item.name || "Untitled"}</h4>
              {item.description ? <p>{item.description}</p> : null}
              <div className="saved-actions">
                <button type="button" onClick={() => onLoad(item)}>
                  Load
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const copy = cloneFragrance(item);
                    copy.name = `${copy.name || "Untitled"} (copy)`;
                    onDuplicate({ ...copy, id: generateId(), savedAt: Date.now() });
                  }}
                >
                  Duplicate
                </button>
                <button type="button" className="danger" onClick={() => onDelete(item.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
