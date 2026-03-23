/**
 * Rule-based fragrance summary from notes, intensities, derived accord profile, and performance.
 */

import { deriveAccordProfile } from "./fragranceModel";

const TAG_LABELS = {
  citrus: "citrus",
  floral: "floral",
  woody: "woody",
  spicy: "spicy",
  fresh: "fresh",
  green: "green",
  fruity: "fruity",
  aromatic: "aromatic",
  musk: "musky",
  amber: "amber",
  gourmand: "gourmand",
  resin: "resinous",
  powdery: "powdery",
  aquatic: "aquatic",
  earthy: "earthy",
  leather: "leathery",
  vanilla: "vanilla-like",
  sweet: "sweet",
  bright: "bright",
  dark: "dark",
  clean: "clean",
  smoky: "smoky",
  warm: "warm",
};

function collectWeightedTags(selections, getNote) {
  const scores = {};
  for (const { noteId, intensity } of selections) {
    const note = getNote(noteId);
    if (!note) continue;
    const w = (intensity / 100) * (note.intensityBaseline ?? 0.7);
    for (const tag of note.tags || []) {
      scores[tag] = (scores[tag] || 0) + w;
    }
  }
  return scores;
}

function topTags(scores, n = 4) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .filter(([, v]) => v > 0.05)
    .map(([k]) => k);
}

export function buildFragranceSummary(fragrance, getNote) {
  const all = [
    ...fragrance.topNotes,
    ...fragrance.middleNotes,
    ...fragrance.baseNotes,
  ];
  const tagScores = collectWeightedTags(all, getNote);

  const dominant = topTags(tagScores, 5);
  const dominantReadable = dominant.map((t) => TAG_LABELS[t] || t);

  const { performance } = fragrance;
  const p = deriveAccordProfile(fragrance, getNote);

  let mood = "balanced and versatile";
  if (p.freshness > 65 && p.cleanliness > 55) mood = "uplifting and crisp";
  else if (p.warmth > 65 && p.sweetness > 55) mood = "cozy and enveloping";
  else if (p.smokiness > 55 || p.woodsiness > 65) mood = "moody and sophisticated";
  else if (p.sweetness > 65 && p.freshness < 45) mood = "indulgent and rich";
  else if (p.freshness > 55 && p.sweetness < 45) mood = "airy and refined";

  let character = [];
  if (p.freshness > 60) character.push("fresh");
  if (p.warmth > 60) character.push("warm");
  if (p.sweetness > 60) character.push("sweet");
  if (p.smokiness > 50) character.push("smoky or dark");
  if (p.cleanliness > 60) character.push("clean");
  if (p.woodsiness > 60) character.push("woody");
  if (character.length === 0) character.push("nuanced");

  let season = "year-round wear";
  if (p.freshness > 62 && p.warmth < 45) season = "spring and summer days";
  else if (p.warmth > 62 && p.freshness < 45) season = "fall and winter evenings";
  else if (p.freshness > 55 && p.warmth > 55) season = "transitional seasons";

  let timeOfDay = "any time";
  if (p.freshness > 60 && p.smokiness < 35) timeOfDay = "morning through afternoon";
  else if (p.warmth > 58 || p.smokiness > 50) timeOfDay = "evening or special occasions";

  const conc = performance?.concentration || "Eau de Toilette";
  const longMap = {
    light: "lighter wear time",
    moderate: "moderate staying power",
    strong: "strong longevity",
    intense: "very long-lasting character",
  };
  const projMap = {
    light: "stays closer to the skin",
    moderate: "a comfortable personal aura",
    strong: "noticeable projection",
    intense: "bold presence in the room",
  };
  const longText = longMap[performance?.longevity] || longMap.moderate;
  const projText = projMap[performance?.projection] || projMap.moderate;

  const paragraphs = [];

  if (all.length === 0) {
    paragraphs.push(
      "Start by adding notes to each layer of the pyramid. Your live scent story will appear here as you build."
    );
  } else {
    paragraphs.push(
      `This blend leans **${mood}**, with a profile that feels **${character.join(", ")}**—driven by your notes and pyramid strengths.`
    );
    if (dominantReadable.length > 0) {
      paragraphs.push(
        `Dominant scent directions from your notes include **${dominantReadable.join(", ")}**—use the pyramid intensities to push one family forward.`
      );
    }
    paragraphs.push(
      `As a **${conc}**, it targets **${longText}** and **${projText}**.`
    );
    paragraphs.push(
      `**Wear window:** ${season}; **moment:** ${timeOfDay}.`
    );
  }

  return {
    paragraphs,
    dominantTags: dominantReadable,
    mood,
  };
}
