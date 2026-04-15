import { deriveAccordProfile, PROFILE_KEYS } from "./fragranceModel";

const SYSTEM = `You are a friendly fragrance-education assistant inside ScentLab, a classroom tool. The user is building a virtual perfume from a fixed library of notes (citrus, florals, woods, etc.).

Output format (strict):
- Give exactly **3 or 4** recommendations—no more, no fewer. One clear action per item.
- **Order by priority**: put the most important change first. Label each line with a priority tag:
  **P1 (highest)** … **P2** … **P3** … **P4** (only if you use four items). Use that exact P1–P4 pattern so priority is obvious.
- Each recommendation: one short sentence after the P-tag (balance, layer, intensity, or performance). Plain language.
- Only reference materials that could exist in a typical note library; prefer note *types* (e.g. "a woody base") if unsure.
- Educational only—not a commercial formula. No medical claims.
- No long preamble—optional one short intro line, then the P1–P4 list.`;

function layerBlock(label, entries, getNote) {
  if (!entries.length) return `${label}: (none)`;
  return `${label}:\n${entries
    .map(({ noteId, intensity }) => {
      const n = getNote(noteId);
      return `  - ${n?.name ?? noteId} (pyramid intensity ${intensity}%)`;
    })
    .join("\n")}`;
}

/**
 * Build chat messages for Ollama from current builder state.
 */
export function buildOllamaMessages(fragrance, getNote) {
  const profile = deriveAccordProfile(fragrance, getNote);
  const accordLine = PROFILE_KEYS.map(
    (k) => `${k}: ${profile[k]}`
  ).join(", ");

  const noteCount =
    fragrance.topNotes.length +
    fragrance.middleNotes.length +
    fragrance.baseNotes.length;

  const userParts = [
    "Current blend (ScentLab builder):",
    "",
    layerBlock("Top", fragrance.topNotes, getNote),
    layerBlock("Heart / middle", fragrance.middleNotes, getNote),
    layerBlock("Base", fragrance.baseNotes, getNote),
    "",
    `Derived accord profile (0–100 from note grades × intensities): ${accordLine}`,
    "",
    `Performance targets: longevity ${fragrance.performance?.longevity ?? "—"}, projection ${fragrance.performance?.projection ?? "—"}, concentration ${fragrance.performance?.concentration ?? "—"}`,
    "",
    noteCount === 0
      ? "The pyramid is empty. Give exactly 3 or 4 prioritized starter ideas (P1–P4) for building a first pyramid, then remind them to add notes in the app."
      : "Give exactly 3 or 4 prioritized recommendations (P1–P4) to improve balance and interest. Mention note families or roles, not brand names.",
  ];

  return {
    system: SYSTEM,
    user: userParts.join("\n"),
  };
}

/** If the model used P1–P4 labels, keep only those lines (max 4). */
export function clipPriorityRecommendations(text) {
  const lines = text.split(/\r?\n/);
  const priorityLines = lines
    .map((l) => l.trim())
    .filter((l) => /^(\*\*)?P[1-4]\b/i.test(l));
  if (priorityLines.length > 0) {
    return priorityLines.slice(0, 4).join("\n\n");
  }
  return text.trim();
}
