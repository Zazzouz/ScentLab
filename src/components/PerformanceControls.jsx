const LONGEVITY_OPTS = [
  { value: "light", label: "Light" },
  { value: "moderate", label: "Moderate" },
  { value: "strong", label: "Strong" },
  { value: "intense", label: "Intense" },
];

const PROJECTION_OPTS = [
  { value: "light", label: "Intimate" },
  { value: "moderate", label: "Moderate" },
  { value: "strong", label: "Strong" },
  { value: "intense", label: "Room-filling" },
];

const CONCENTRATIONS = [
  "Eau de Cologne",
  "Eau de Toilette",
  "Eau de Parfum",
  "Extrait",
];

const labels = {
  longevity: { light: "lighter wear", moderate: "moderate staying power", strong: "strong longevity", intense: "very long-lasting" },
  projection: { light: "close to skin", moderate: "personal aura", strong: "noticeable trail", intense: "bold presence" },
};

export default function PerformanceControls({ performance, onChange }) {
  const longLabel = labels.longevity[performance.longevity] || labels.longevity.moderate;
  const projLabel = labels.projection[performance.projection] || labels.projection.moderate;

  return (
    <div className="panel">
      <h2 className="panel-title">
        Performance <span className="badge">Wear</span>
      </h2>
      <div className="perf-grid">
        <div className="perf-field">
          <label>Longevity target</label>
          <div className="segmented" role="group" aria-label="Longevity">
            {LONGEVITY_OPTS.map(({ value, label: lbl }) => (
              <button
                key={value}
                type="button"
                className={performance.longevity === value ? "is-selected" : ""}
                onClick={() => onChange("longevity", value)}
              >
                {lbl}
              </button>
            ))}
          </div>
        </div>
        <div className="perf-field">
          <label>Projection target</label>
          <div className="segmented" role="group" aria-label="Projection">
            {PROJECTION_OPTS.map(({ value, label: lbl }) => (
              <button
                key={value}
                type="button"
                className={performance.projection === value ? "is-selected" : ""}
                onClick={() => onChange("projection", value)}
              >
                {lbl}
              </button>
            ))}
          </div>
        </div>
        <div className="perf-field">
          <label htmlFor="concentration">Concentration type</label>
          <select
            id="concentration"
            className="perf-select"
            value={performance.concentration}
            onChange={(e) => onChange("concentration", e.target.value)}
          >
            {CONCENTRATIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="perf-summary">
        <strong>Current profile:</strong> {performance.concentration} · longevity aims for{" "}
        <strong>{longLabel}</strong> · projection reads as <strong>{projLabel}</strong>.
      </div>
    </div>
  );
}
