import { getNoteById } from "../data/notes";

const LAYER_CONFIG = [
  { key: "top", classSuffix: "top", label: "Top — first impression" },
  { key: "middle", classSuffix: "middle", label: "Heart — core of the scent" },
  { key: "base", classSuffix: "base", label: "Base — longest lasting" },
];

export default function NotePyramid({ fragrance, onRemoveNote, onIntensityChange }) {
  return (
    <div className="panel">
      <h2 className="panel-title">
        Your pyramid <span className="badge">Interactive</span>
      </h2>
      <div className="pyramid-visual">
        {LAYER_CONFIG.map(({ key, classSuffix, label }) => {
          const arr = fragrance[`${key}Notes`];
          return (
            <div key={key} className={`pyramid-layer pyramid-layer--${classSuffix}`}>
              <div className="pyramid-layer-label">{label}</div>
              {arr.length === 0 ? (
                <div className="pyramid-empty">Add notes from the library above.</div>
              ) : (
                arr.map((entry) => {
                  const note = getNoteById(entry.noteId);
                  if (!note) return null;
                  return (
                    <div key={entry.noteId} className="pyramid-note">
                      <div className="pyramid-note-head">
                        <span className="pyramid-note-name">{note.name}</span>
                        <button
                          type="button"
                          className="pyramid-remove"
                          onClick={() => onRemoveNote(key, entry.noteId)}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="pyramid-slider-row">
                        <span>Intensity</span>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={entry.intensity}
                          onChange={(e) =>
                            onIntensityChange(key, entry.noteId, Number(e.target.value))
                          }
                          aria-label={`${note.name} intensity`}
                        />
                        <span>{entry.intensity}%</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
