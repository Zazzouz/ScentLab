const SLIDERS = [
  { key: "sweetness", label: "Sweetness" },
  { key: "freshness", label: "Freshness" },
  { key: "warmth", label: "Warmth" },
  { key: "smokiness", label: "Smokiness" },
  { key: "woodsiness", label: "Woodsiness" },
  { key: "cleanliness", label: "Cleanliness" },
];

export default function ProfileSliders({ profile }) {
  return (
    <div className="panel">
      <h2 className="panel-title">
        Accord profile <span className="badge">From notes</span>
      </h2>
      <p className="panel-hint">
        Each bar reflects the library grades for your selected notes, weighted by pyramid
        intensity—same logic as the live story.
      </p>
      {SLIDERS.map(({ key, label }) => (
        <div key={key} className="slider-field slider-field--derived">
          <header>
            <label htmlFor={`profile-${key}`}>{label}</label>
            <span className="value-pill">{profile[key]}</span>
          </header>
          <input
            id={`profile-${key}`}
            type="range"
            min={0}
            max={100}
            value={profile[key]}
            tabIndex={-1}
            aria-label={`${label}: ${profile[key]} percent (derived from notes)`}
          />
        </div>
      ))}
    </div>
  );
}
