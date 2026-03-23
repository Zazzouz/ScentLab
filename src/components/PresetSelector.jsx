import { PRESETS } from "../data/presets";

export default function PresetSelector({ onApply }) {
  return (
    <div className="panel">
      <h2 className="panel-title">
        Starter presets <span className="badge">Quick start</span>
      </h2>
      <p style={{ margin: "0 0 0.75rem", fontSize: "0.88rem", color: "var(--soft-gray)" }}>
        Load a balanced note stack—accord bars and the live story update from grades and pyramid
        intensities.
      </p>
      <div className="preset-row">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            className="preset-btn"
            title={p.description}
            onClick={() => onApply(p.data)}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
