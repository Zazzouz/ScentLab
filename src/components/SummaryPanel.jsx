import { buildFragranceSummary } from "../utils/summary";
import { getNoteById } from "../data/notes";

function formatLine(text) {
  const parts = text.split("**");
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i}>{part}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function SummaryPanel({ fragrance }) {
  const { paragraphs, dominantTags } = buildFragranceSummary(fragrance, getNoteById);

  return (
    <div className="panel">
      <h2 className="panel-title">
        Live fragrance story <span className="badge">Updates live</span>
      </h2>
      <div className="summary-body">
        {paragraphs.map((p, i) => (
          <p key={i}>{formatLine(p)}</p>
        ))}
      </div>
      {dominantTags.length > 0 && (
        <div className="summary-tags" aria-label="Dominant directions">
          {dominantTags.map((t) => (
            <span key={t} className="summary-tag">
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
