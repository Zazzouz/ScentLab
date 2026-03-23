/** Default shape for the in-progress fragrance in the builder */

export const PROFILE_KEYS = [
  "sweetness",
  "freshness",
  "warmth",
  "smokiness",
  "woodsiness",
  "cleanliness",
];

/** When no notes are selected — neutral display (50%). */
export const NEUTRAL_PROFILE = Object.fromEntries(PROFILE_KEYS.map((k) => [k, 50]));

export const DEFAULT_PERFORMANCE = {
  longevity: "moderate",
  projection: "moderate",
  concentration: "Eau de Toilette",
};

/**
 * Weighted blend of each note's 0–5 grades (from the library), scaled by pyramid
 * intensity × intensityBaseline. Result is 0–100 per axis for the UI.
 */
export function deriveAccordProfile(fragrance, getNote) {
  const all = [
    ...fragrance.topNotes,
    ...fragrance.middleNotes,
    ...fragrance.baseNotes,
  ];
  if (all.length === 0) return { ...NEUTRAL_PROFILE };

  const out = {};
  for (const key of PROFILE_KEYS) {
    let sum = 0;
    let wSum = 0;
    for (const { noteId, intensity } of all) {
      const note = getNote(noteId);
      const g = note?.grades?.[key];
      if (typeof g !== "number") continue;
      const w = (intensity / 100) * (note.intensityBaseline ?? 0.7);
      sum += w * g;
      wSum += w;
    }
    if (wSum <= 0) out[key] = 50;
    else out[key] = Math.round(Math.min(100, Math.max(0, (sum / wSum / 5) * 100)));
  }
  return out;
}

export function createEmptyFragrance() {
  return {
    name: "",
    description: "",
    topNotes: [],
    middleNotes: [],
    baseNotes: [],
    performance: { ...DEFAULT_PERFORMANCE },
  };
}

export function cloneFragrance(f) {
  return {
    name: f.name,
    description: f.description,
    topNotes: f.topNotes.map((n) => ({ ...n })),
    middleNotes: f.middleNotes.map((n) => ({ ...n })),
    baseNotes: f.baseNotes.map((n) => ({ ...n })),
    performance: { ...f.performance },
  };
}
