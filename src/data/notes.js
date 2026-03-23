/**
 * Fragrance notes: layer (pyramid), group (UI family), tags (summary), grades 0–5 (strength per accord axis).
 */
import { NOTE_FAMILIES } from "./noteFamilies";

const G = {
  citrus: "citrus",
  fruits: "fruits",
  floral: "floral",
  green: "green",
  spices: "spices",
  aromatic: "aromatic",
  aquatic: "aquatic",
  woody: "woody",
  amberResin: "amber-resin",
  gourmand: "gourmand",
  muskClean: "musk-clean",
  leatherSmoke: "leather-smoke",
  earthy: "earthy",
};

export const NOTES = [
  // —— Top ——
  { id: "bergamot", name: "Bergamot", layer: "top", category: "citrus", group: G.citrus, tags: ["citrus", "fresh", "bright"], intensityBaseline: 0.78, description: "A bright, slightly bitter citrus peel note—classic in colognes and fresh openings.", grades: { sweetness: 2, freshness: 5, warmth: 2, smokiness: 0, woodsiness: 1, cleanliness: 4 } },
  { id: "lemon", name: "Lemon", layer: "top", category: "citrus", group: G.citrus, tags: ["citrus", "fresh", "bright"], intensityBaseline: 0.85, description: "Sharp, zesty, and clean; lifts the head of a blend but fades quickly.", grades: { sweetness: 1, freshness: 5, warmth: 1, smokiness: 0, woodsiness: 0, cleanliness: 5 } },
  { id: "mandarin", name: "Mandarin", layer: "top", category: "citrus", group: G.citrus, tags: ["citrus", "fruity", "sweet"], intensityBaseline: 0.72, description: "Sweeter and rounder than lemon—friendly, juicy, and approachable.", grades: { sweetness: 4, freshness: 4, warmth: 2, smokiness: 0, woodsiness: 0, cleanliness: 3 } },
  { id: "grapefruit", name: "Grapefruit", layer: "top", category: "citrus", group: G.citrus, tags: ["citrus", "fresh", "bitter"], intensityBaseline: 0.8, description: "Tart and slightly bitter; adds modern freshness without heavy sweetness.", grades: { sweetness: 2, freshness: 5, warmth: 1, smokiness: 0, woodsiness: 0, cleanliness: 4 } },
  { id: "lime", name: "Lime", layer: "top", category: "citrus", group: G.citrus, tags: ["citrus", "fresh", "bright"], intensityBaseline: 0.83, description: "Vibrant and mouthwatering; great for tropical or sporty directions.", grades: { sweetness: 2, freshness: 5, warmth: 1, smokiness: 0, woodsiness: 0, cleanliness: 4 } },
  { id: "yuzu", name: "Yuzu", layer: "top", category: "citrus", group: G.citrus, tags: ["citrus", "fresh", "aromatic"], intensityBaseline: 0.76, description: "Japanese citrus with herbal facets—distinctive and refined.", grades: { sweetness: 2, freshness: 5, warmth: 2, smokiness: 0, woodsiness: 1, cleanliness: 4 } },
  { id: "orange-sweet", name: "Sweet Orange", layer: "top", category: "citrus", group: G.citrus, tags: ["citrus", "fruity", "sweet"], intensityBaseline: 0.74, description: "Juicy and cheerful; softens sharp citruses in the top.", grades: { sweetness: 4, freshness: 4, warmth: 2, smokiness: 0, woodsiness: 0, cleanliness: 3 } },
  { id: "apple", name: "Green Apple", layer: "top", category: "fruity", group: G.fruits, tags: ["fruity", "fresh", "green"], intensityBaseline: 0.7, description: "Crisp and slightly tart; reads youthful and clean.", grades: { sweetness: 3, freshness: 4, warmth: 1, smokiness: 0, woodsiness: 0, cleanliness: 4 } },
  { id: "pear", name: "Pear", layer: "top", category: "fruity", group: G.fruits, tags: ["fruity", "sweet", "fresh"], intensityBaseline: 0.68, description: "Watery-sweet and delicate; pairs well with florals.", grades: { sweetness: 4, freshness: 3, warmth: 2, smokiness: 0, woodsiness: 0, cleanliness: 3 } },
  { id: "peach", name: "Peach", layer: "top", category: "fruity", group: G.fruits, tags: ["fruity", "sweet", "soft"], intensityBaseline: 0.72, description: "Velvety fruit; can feel creamy when blended with musk or vanilla.", grades: { sweetness: 5, freshness: 2, warmth: 3, smokiness: 0, woodsiness: 0, cleanliness: 2 } },
  { id: "blackcurrant", name: "Blackcurrant Bud", layer: "top", category: "fruity", group: G.fruits, tags: ["fruity", "green", "fresh"], intensityBaseline: 0.68, description: "Catty-green fruit facet; iconic in modern fruity chypres.", grades: { sweetness: 2, freshness: 4, warmth: 1, smokiness: 0, woodsiness: 1, cleanliness: 3 } },
  { id: "raspberry", name: "Raspberry", layer: "top", category: "fruity", group: G.fruits, tags: ["fruity", "sweet", "bright"], intensityBaseline: 0.71, description: "Jammy or tart depending on accord; playful and vivid.", grades: { sweetness: 4, freshness: 3, warmth: 2, smokiness: 0, woodsiness: 0, cleanliness: 3 } },
  { id: "neroli", name: "Neroli", layer: "top", category: "floral", group: G.floral, tags: ["floral", "fresh", "citrus"], intensityBaseline: 0.7, description: "Orange blossom distillation—honeyed, clean, and luminous.", grades: { sweetness: 3, freshness: 4, warmth: 2, smokiness: 0, woodsiness: 0, cleanliness: 4 } },
  { id: "lavender", name: "Lavender", layer: "top", category: "aromatic", group: G.aromatic, tags: ["aromatic", "fresh", "clean"], intensityBaseline: 0.75, description: "Herbal, slightly camphorous; fougère and barbershop classic.", grades: { sweetness: 1, freshness: 4, warmth: 2, smokiness: 1, woodsiness: 2, cleanliness: 4 } },
  { id: "mint", name: "Spearmint", layer: "top", category: "green", group: G.green, tags: ["green", "fresh", "clean"], intensityBaseline: 0.82, description: "Cooling and bright; use sparingly to avoid toothpaste vibes.", grades: { sweetness: 1, freshness: 5, warmth: 0, smokiness: 0, woodsiness: 0, cleanliness: 5 } },
  { id: "green-tea", name: "Green Tea", layer: "top", category: "green", group: G.green, tags: ["green", "fresh", "clean"], intensityBaseline: 0.65, description: "Quiet, slightly hay-like freshness; zen and minimal.", grades: { sweetness: 1, freshness: 4, warmth: 1, smokiness: 0, woodsiness: 1, cleanliness: 5 } },
  { id: "galbanum", name: "Galbanum", layer: "top", category: "green", group: G.green, tags: ["green", "sharp", "fresh"], intensityBaseline: 0.78, description: "Intense green snap—stemmy and almost aggressive.", grades: { sweetness: 0, freshness: 4, warmth: 1, smokiness: 1, woodsiness: 2, cleanliness: 3 } },
  { id: "violet-leaf-top", name: "Violet Leaf", layer: "top", category: "green", group: G.green, tags: ["green", "powdery", "fresh"], intensityBaseline: 0.64, description: "Crushed leaves and cucumber nuance; elegant support for florals.", grades: { sweetness: 1, freshness: 4, warmth: 1, smokiness: 0, woodsiness: 1, cleanliness: 4 } },
  { id: "pink-pepper", name: "Pink Pepper", layer: "top", category: "spicy", group: G.spices, tags: ["spicy", "fresh", "bright"], intensityBaseline: 0.72, description: "Rosy, rosy-sparkle pepper—not truly hot, more effervescent.", grades: { sweetness: 2, freshness: 4, warmth: 2, smokiness: 1, woodsiness: 1, cleanliness: 3 } },
  { id: "cardamom-top", name: "Cardamom (top)", layer: "top", category: "spicy", group: G.spices, tags: ["spicy", "fresh", "warm"], intensityBaseline: 0.7, description: "Green-citrus spice lift—great bridge from citrus to heart.", grades: { sweetness: 2, freshness: 4, warmth: 3, smokiness: 1, woodsiness: 1, cleanliness: 3 } },
  { id: "eucalyptus", name: "Eucalyptus", layer: "top", category: "aromatic", group: G.aromatic, tags: ["aromatic", "fresh", "clean"], intensityBaseline: 0.79, description: "Camphor and cool air; medicinal in large doses.", grades: { sweetness: 0, freshness: 5, warmth: 1, smokiness: 0, woodsiness: 1, cleanliness: 4 } },
  { id: "juniper", name: "Juniper Berry", layer: "top", category: "aromatic", group: G.aromatic, tags: ["aromatic", "fresh", "woody"], intensityBaseline: 0.73, description: "Gin-like, piney-fresh; pairs with citrus and woods.", grades: { sweetness: 1, freshness: 4, warmth: 2, smokiness: 1, woodsiness: 3, cleanliness: 3 } },
  { id: "sea-salt", name: "Sea Salt / Marine", layer: "top", category: "aquatic", group: G.aquatic, tags: ["aquatic", "fresh", "clean"], intensityBaseline: 0.66, description: "Ozonic, breezy, and mineral—evokes coastlines.", grades: { sweetness: 0, freshness: 5, warmth: 1, smokiness: 0, woodsiness: 0, cleanliness: 4 } },
  { id: "cucumber", name: "Cucumber", layer: "top", category: "green", group: G.green, tags: ["green", "fresh", "clean"], intensityBaseline: 0.62, description: "Watery, cool, and transparent; ultra-clean effect.", grades: { sweetness: 1, freshness: 4, warmth: 0, smokiness: 0, woodsiness: 0, cleanliness: 5 } },

  // —— Middle ——
  { id: "rose", name: "Rose", layer: "middle", category: "floral", group: G.floral, tags: ["floral", "sweet", "powdery"], intensityBaseline: 0.8, description: "The queen of florals—from jammy to tea-like depending on variety.", grades: { sweetness: 4, freshness: 2, warmth: 3, smokiness: 0, woodsiness: 1, cleanliness: 3 } },
  { id: "jasmine", name: "Jasmine", layer: "middle", category: "floral", group: G.floral, tags: ["floral", "sweet", "warm"], intensityBaseline: 0.85, description: "Indolic and heady; huge presence in the heart.", grades: { sweetness: 4, freshness: 2, warmth: 4, smokiness: 1, woodsiness: 1, cleanliness: 2 } },
  { id: "iris", name: "Iris", layer: "middle", category: "floral", group: G.floral, tags: ["floral", "powdery", "clean"], intensityBaseline: 0.7, description: "Buttery, rooty, and cool—luxurious powder without sugar.", grades: { sweetness: 2, freshness: 2, warmth: 2, smokiness: 0, woodsiness: 1, cleanliness: 4 } },
  { id: "ylang", name: "Ylang-Ylang", layer: "middle", category: "floral", group: G.floral, tags: ["floral", "sweet", "warm"], intensityBaseline: 0.78, description: "Banana-cream floral; tropical opulence.", grades: { sweetness: 5, freshness: 2, warmth: 4, smokiness: 0, woodsiness: 1, cleanliness: 2 } },
  { id: "peony", name: "Peony", layer: "middle", category: "floral", group: G.floral, tags: ["floral", "fresh", "sweet"], intensityBaseline: 0.65, description: "Soft, rosy-pink petals; airy and romantic.", grades: { sweetness: 3, freshness: 3, warmth: 2, smokiness: 0, woodsiness: 0, cleanliness: 4 } },
  { id: "tuberose", name: "Tuberose", layer: "middle", category: "floral", group: G.floral, tags: ["floral", "sweet", "warm"], intensityBaseline: 0.88, description: "Voluptuous white floral—creamy, carnal, and loud.", grades: { sweetness: 4, freshness: 1, warmth: 4, smokiness: 0, woodsiness: 0, cleanliness: 2 } },
  { id: "orange-blossom", name: "Orange Blossom", layer: "middle", category: "floral", group: G.floral, tags: ["floral", "fresh", "citrus"], intensityBaseline: 0.77, description: "Sweeter than neroli, more floral than petitgrain—Mediterranean sun.", grades: { sweetness: 4, freshness: 3, warmth: 3, smokiness: 0, woodsiness: 0, cleanliness: 3 } },
  { id: "magnolia", name: "Magnolia", layer: "middle", category: "floral", group: G.floral, tags: ["floral", "fresh", "lemon"], intensityBaseline: 0.69, description: "Lemony-cream petals; elegant bridge note.", grades: { sweetness: 3, freshness: 3, warmth: 2, smokiness: 0, woodsiness: 1, cleanliness: 3 } },
  { id: "osmanthus", name: "Osmanthus", layer: "middle", category: "floral", group: G.floral, tags: ["floral", "fruity", "apricot"], intensityBaseline: 0.71, description: "Apricot-leather floral; delicate but distinctive.", grades: { sweetness: 3, freshness: 2, warmth: 3, smokiness: 1, woodsiness: 1, cleanliness: 3 } },
  { id: "geranium", name: "Geranium", layer: "middle", category: "floral", group: G.floral, tags: ["floral", "green", "fresh"], intensityBaseline: 0.7, description: "Rosy-minty leaf; sharpens bouquets and fougères.", grades: { sweetness: 2, freshness: 4, warmth: 2, smokiness: 0, woodsiness: 1, cleanliness: 3 } },
  { id: "violet-leaf", name: "Violet Leaf (heart)", layer: "middle", category: "green", group: G.green, tags: ["green", "powdery", "fresh"], intensityBaseline: 0.62, description: "Same material as top violet leaf—often used in heart for structure.", grades: { sweetness: 1, freshness: 4, warmth: 1, smokiness: 0, woodsiness: 1, cleanliness: 4 } },
  { id: "fig", name: "Fig", layer: "middle", category: "fruity", group: G.fruits, tags: ["fruity", "green", "milky"], intensityBaseline: 0.7, description: "Green fig sap and milky wood—modern niche favorite.", grades: { sweetness: 3, freshness: 3, warmth: 2, smokiness: 0, woodsiness: 2, cleanliness: 3 } },
  { id: "plum", name: "Plum", layer: "middle", category: "fruity", group: G.fruits, tags: ["fruity", "sweet", "dark"], intensityBaseline: 0.74, description: "Juicy-dark fruit; leans gourmand with vanilla.", grades: { sweetness: 4, freshness: 2, warmth: 3, smokiness: 1, woodsiness: 1, cleanliness: 2 } },
  { id: "cardamom", name: "Cardamom (heart)", layer: "middle", category: "spicy", group: G.spices, tags: ["spicy", "warm", "fresh"], intensityBaseline: 0.72, description: "Warm spice with green lift—versatile heart anchor.", grades: { sweetness: 2, freshness: 3, warmth: 4, smokiness: 2, woodsiness: 2, cleanliness: 2 } },
  { id: "cinnamon", name: "Cinnamon", layer: "middle", category: "spicy", group: G.spices, tags: ["spicy", "warm", "sweet"], intensityBaseline: 0.8, description: "Bakery warmth and bite; powerful in small amounts.", grades: { sweetness: 4, freshness: 1, warmth: 5, smokiness: 2, woodsiness: 2, cleanliness: 1 } },
  { id: "nutmeg", name: "Nutmeg", layer: "middle", category: "spicy", group: G.spices, tags: ["spicy", "warm", "woody"], intensityBaseline: 0.68, description: "Dry, slightly sweet spice; woody undertone.", grades: { sweetness: 2, freshness: 1, warmth: 4, smokiness: 1, woodsiness: 3, cleanliness: 2 } },
  { id: "ginger", name: "Ginger", layer: "middle", category: "spicy", group: G.spices, tags: ["spicy", "fresh", "warm"], intensityBaseline: 0.76, description: "Sparkling heat—can read cola-like or rooty.", grades: { sweetness: 2, freshness: 4, warmth: 3, smokiness: 1, woodsiness: 1, cleanliness: 3 } },
  { id: "clove", name: "Clove", layer: "middle", category: "spicy", group: G.spices, tags: ["spicy", "warm", "sweet"], intensityBaseline: 0.81, description: "Potent and medicinal-sweet; classic in orientals.", grades: { sweetness: 3, freshness: 1, warmth: 5, smokiness: 2, woodsiness: 2, cleanliness: 1 } },
  { id: "saffron", name: "Saffron", layer: "middle", category: "spicy", group: G.spices, tags: ["spicy", "warm", "leather"], intensityBaseline: 0.75, description: "Hay-like, leathery gold; expensive-smelling accent.", grades: { sweetness: 2, freshness: 2, warmth: 4, smokiness: 2, woodsiness: 2, cleanliness: 2 } },
  { id: "coriander-seed", name: "Coriander Seed", layer: "middle", category: "spicy", group: G.spices, tags: ["spicy", "citrus", "warm"], intensityBaseline: 0.67, description: "Citrus-pepper spice; lighter than cinnamon.", grades: { sweetness: 2, freshness: 3, warmth: 3, smokiness: 1, woodsiness: 2, cleanliness: 3 } },
  { id: "honey", name: "Honey", layer: "middle", category: "gourmand", group: G.gourmand, tags: ["gourmand", "sweet", "warm"], intensityBaseline: 0.75, description: "Animalic-sweet; can get waxy or tobacco-like.", grades: { sweetness: 5, freshness: 1, warmth: 4, smokiness: 1, woodsiness: 1, cleanliness: 1 } },

  // —— Base ——
  { id: "vanilla", name: "Vanilla", layer: "base", category: "gourmand", group: G.gourmand, tags: ["gourmand", "sweet", "vanilla", "warm"], intensityBaseline: 0.82, description: "Creamy, comforting anchor—beloved in gourmands.", grades: { sweetness: 5, freshness: 0, warmth: 4, smokiness: 1, woodsiness: 1, cleanliness: 2 } },
  { id: "tonka", name: "Tonka Bean", layer: "base", category: "gourmand", group: G.gourmand, tags: ["gourmand", "sweet", "warm", "vanilla"], intensityBaseline: 0.77, description: "Almond-hay coumarin warmth; softer than vanilla.", grades: { sweetness: 4, freshness: 1, warmth: 4, smokiness: 1, woodsiness: 2, cleanliness: 2 } },
  { id: "cocoa", name: "Cocoa", layer: "base", category: "gourmand", group: G.gourmand, tags: ["gourmand", "sweet", "dark"], intensityBaseline: 0.72, description: "Bitter chocolate depth; adds darkness to sweets.", grades: { sweetness: 4, freshness: 0, warmth: 3, smokiness: 2, woodsiness: 2, cleanliness: 1 } },
  { id: "coffee", name: "Coffee", layer: "base", category: "gourmand", group: G.gourmand, tags: ["gourmand", "roasted", "bitter"], intensityBaseline: 0.78, description: "Roast and bitterness; edgy gourmand.", grades: { sweetness: 2, freshness: 1, warmth: 3, smokiness: 3, woodsiness: 2, cleanliness: 2 } },
  { id: "sandalwood", name: "Sandalwood", layer: "base", category: "woody", group: G.woody, tags: ["woody", "warm", "creamy"], intensityBaseline: 0.78, description: "Milky soft wood—creamy dry-down staple.", grades: { sweetness: 2, freshness: 1, warmth: 4, smokiness: 1, woodsiness: 4, cleanliness: 3 } },
  { id: "cedar", name: "Cedarwood", layer: "base", category: "woody", group: G.woody, tags: ["woody", "clean", "dry"], intensityBaseline: 0.75, description: "Pencil-shavings clarity; structural and dry.", grades: { sweetness: 1, freshness: 2, warmth: 2, smokiness: 1, woodsiness: 5, cleanliness: 4 } },
  { id: "vetiver", name: "Vetiver", layer: "base", category: "earthy", group: G.earthy, tags: ["earthy", "woody", "green"], intensityBaseline: 0.76, description: "Smoky roots and grass—masculine classic.", grades: { sweetness: 1, freshness: 3, warmth: 2, smokiness: 3, woodsiness: 4, cleanliness: 3 } },
  { id: "patchouli", name: "Patchouli", layer: "base", category: "earthy", group: G.earthy, tags: ["earthy", "woody", "dark"], intensityBaseline: 0.8, description: "Camphor-woody earth; hippie to haute.", grades: { sweetness: 2, freshness: 1, warmth: 3, smokiness: 2, woodsiness: 5, cleanliness: 1 } },
  { id: "oakmoss", name: "Oakmoss", layer: "base", category: "earthy", group: G.earthy, tags: ["earthy", "green", "woody"], intensityBaseline: 0.73, description: "Forest floor and damp stone—chypre backbone.", grades: { sweetness: 1, freshness: 2, warmth: 2, smokiness: 2, woodsiness: 4, cleanliness: 2 } },
  { id: "guaiac", name: "Guaiac Wood", layer: "base", category: "woody", group: G.woody, tags: ["woody", "smoky", "sweet"], intensityBaseline: 0.74, description: "Tea-smoke wood; bridges sweet and smoky.", grades: { sweetness: 2, freshness: 1, warmth: 3, smokiness: 4, woodsiness: 4, cleanliness: 2 } },
  { id: "oud", name: "Oud", layer: "base", category: "woody", group: G.woody, tags: ["woody", "dark", "smoky", "resin"], intensityBaseline: 0.88, description: "Animalic resinous wood—powerful and polarizing.", grades: { sweetness: 2, freshness: 0, warmth: 4, smokiness: 5, woodsiness: 5, cleanliness: 0 } },
  { id: "amber", name: "Amber", layer: "base", category: "amber", group: G.amberResin, tags: ["amber", "warm", "sweet"], intensityBaseline: 0.8, description: "Labdanum-vanilla-benzoin fantasy accord—cozy glow.", grades: { sweetness: 4, freshness: 1, warmth: 5, smokiness: 2, woodsiness: 2, cleanliness: 2 } },
  { id: "benzoin", name: "Benzoin", layer: "base", category: "resin", group: G.amberResin, tags: ["resin", "vanilla", "warm"], intensityBaseline: 0.72, description: "Balsamic vanilla resin; smooths rough edges.", grades: { sweetness: 4, freshness: 1, warmth: 4, smokiness: 2, woodsiness: 2, cleanliness: 2 } },
  { id: "labdanum", name: "Labdanum", layer: "base", category: "resin", group: G.amberResin, tags: ["resin", "amber", "warm"], intensityBaseline: 0.74, description: "Leathery amber resin—rockrose richness.", grades: { sweetness: 3, freshness: 1, warmth: 4, smokiness: 3, woodsiness: 3, cleanliness: 1 } },
  { id: "frankincense", name: "Frankincense", layer: "base", category: "resin", group: G.amberResin, tags: ["resin", "smoky", "bright"], intensityBaseline: 0.76, description: "Lemon-pepper smoke; sacred and airy.", grades: { sweetness: 1, freshness: 3, warmth: 3, smokiness: 4, woodsiness: 2, cleanliness: 3 } },
  { id: "myrrh", name: "Myrrh", layer: "base", category: "resin", group: G.amberResin, tags: ["resin", "smoky", "medicinal"], intensityBaseline: 0.75, description: "Cool, medicinal balsam—ancient and solemn.", grades: { sweetness: 2, freshness: 1, warmth: 3, smokiness: 4, woodsiness: 2, cleanliness: 2 } },
  { id: "musk", name: "White Musk", layer: "base", category: "musk", group: G.muskClean, tags: ["musk", "clean", "powdery"], intensityBaseline: 0.7, description: "Clean skin illusion; extends florals softly.", grades: { sweetness: 2, freshness: 2, warmth: 2, smokiness: 0, woodsiness: 0, cleanliness: 5 } },
  { id: "ambroxan", name: "Ambroxan", layer: "base", category: "musk", group: G.muskClean, tags: ["clean", "woody", "amber"], intensityBaseline: 0.72, description: "Synthetic ambergris—mineral radiance and lift.", grades: { sweetness: 1, freshness: 3, warmth: 2, smokiness: 1, woodsiness: 2, cleanliness: 4 } },
  { id: "cashmeran", name: "Cashmeran", layer: "base", category: "musk", group: G.muskClean, tags: ["musk", "woody", "soft"], intensityBaseline: 0.68, description: "Fluffy musk-wood cocoon—modern cozy base.", grades: { sweetness: 2, freshness: 1, warmth: 3, smokiness: 1, woodsiness: 3, cleanliness: 4 } },
  { id: "leather", name: "Leather", layer: "base", category: "leather", group: G.leatherSmoke, tags: ["leather", "smoky", "dark"], intensityBaseline: 0.82, description: "Smoked hide and tar facets—bold signature.", grades: { sweetness: 1, freshness: 0, warmth: 3, smokiness: 4, woodsiness: 3, cleanliness: 0 } },
  { id: "tobacco", name: "Tobacco", layer: "base", category: "leather", group: G.leatherSmoke, tags: ["smoky", "sweet", "warm"], intensityBaseline: 0.79, description: "Honeyed pipe smoke; warm and nostalgic.", grades: { sweetness: 3, freshness: 0, warmth: 4, smokiness: 4, woodsiness: 2, cleanliness: 1 } },
  { id: "birch-tar", name: "Birch Tar", layer: "base", category: "leather", group: G.leatherSmoke, tags: ["smoky", "leather", "dark"], intensityBaseline: 0.84, description: "Campfire and creosote—use in traces.", grades: { sweetness: 0, freshness: 0, warmth: 2, smokiness: 5, woodsiness: 3, cleanliness: 0 } },
];

const byId = Object.fromEntries(NOTES.map((n) => [n.id, n]));

export function getNoteById(id) {
  return byId[id];
}

export const NOTES_BY_LAYER = {
  top: NOTES.filter((n) => n.layer === "top"),
  middle: NOTES.filter((n) => n.layer === "middle"),
  base: NOTES.filter((n) => n.layer === "base"),
};

export function getFamiliesPresentInLayer(layer) {
  const ids = new Set(NOTES_BY_LAYER[layer].map((n) => n.group));
  return NOTE_FAMILIES.filter((f) => ids.has(f.id));
}

export function getNotesForLayerAndFamily(layer, familyId) {
  const layerNotes = NOTES_BY_LAYER[layer];
  if (!familyId || familyId === "all") return layerNotes;
  return layerNotes.filter((n) => n.group === familyId);
}
