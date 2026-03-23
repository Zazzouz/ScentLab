import { createEmptyFragrance } from "../utils/fragranceModel";

function frag(partial) {
  const base = createEmptyFragrance();
  return {
    ...base,
    ...partial,
    performance: { ...base.performance, ...partial.performance },
    topNotes: partial.topNotes || [],
    middleNotes: partial.middleNotes || [],
    baseNotes: partial.baseNotes || [],
  };
}

/** Presets: notes + performance only — accord profile is derived from grades × intensities. */
export const PRESETS = [
  {
    id: "fresh-citrus",
    label: "Fresh Citrus",
    description: "Bright opening, clean skin feel",
    data: frag({
      topNotes: [
        { noteId: "bergamot", intensity: 85 },
        { noteId: "grapefruit", intensity: 70 },
      ],
      middleNotes: [{ noteId: "neroli", intensity: 65 }],
      baseNotes: [{ noteId: "musk", intensity: 45 }],
      performance: {
        longevity: "moderate",
        projection: "moderate",
        concentration: "Eau de Toilette",
      },
    }),
  },
  {
    id: "dark-resin",
    label: "Dark Resin",
    description: "Smoky depth and amber warmth",
    data: frag({
      topNotes: [{ noteId: "pink-pepper", intensity: 55 }],
      middleNotes: [
        { noteId: "cardamom", intensity: 70 },
        { noteId: "cinnamon", intensity: 50 },
      ],
      baseNotes: [
        { noteId: "labdanum", intensity: 80 },
        { noteId: "benzoin", intensity: 75 },
        { noteId: "oud", intensity: 55 },
      ],
      performance: {
        longevity: "strong",
        projection: "strong",
        concentration: "Eau de Parfum",
      },
    }),
  },
  {
    id: "creamy-vanilla",
    label: "Creamy Vanilla",
    description: "Soft gourmand comfort",
    data: frag({
      topNotes: [{ noteId: "mandarin", intensity: 60 }],
      middleNotes: [
        { noteId: "ylang", intensity: 55 },
        { noteId: "honey", intensity: 50 },
      ],
      baseNotes: [
        { noteId: "vanilla", intensity: 88 },
        { noteId: "tonka", intensity: 72 },
        { noteId: "sandalwood", intensity: 60 },
      ],
      performance: {
        longevity: "strong",
        projection: "moderate",
        concentration: "Eau de Parfum",
      },
    }),
  },
  {
    id: "airy-floral",
    label: "Airy Floral",
    description: "Light petals and clean musk",
    data: frag({
      topNotes: [
        { noteId: "neroli", intensity: 65 },
        { noteId: "green-tea", intensity: 50 },
      ],
      middleNotes: [
        { noteId: "peony", intensity: 75 },
        { noteId: "iris", intensity: 60 },
      ],
      baseNotes: [{ noteId: "musk", intensity: 55 }],
      performance: {
        longevity: "light",
        projection: "light",
        concentration: "Eau de Cologne",
      },
    }),
  },
  {
    id: "woody-amber",
    label: "Woody Amber",
    description: "Structured woods and golden amber",
    data: frag({
      topNotes: [{ noteId: "lavender", intensity: 55 }],
      middleNotes: [
        { noteId: "nutmeg", intensity: 58 },
        { noteId: "violet-leaf", intensity: 45 },
      ],
      baseNotes: [
        { noteId: "cedar", intensity: 78 },
        { noteId: "amber", intensity: 72 },
        { noteId: "vetiver", intensity: 62 },
      ],
      performance: {
        longevity: "moderate",
        projection: "moderate",
        concentration: "Eau de Toilette",
      },
    }),
  },
];
