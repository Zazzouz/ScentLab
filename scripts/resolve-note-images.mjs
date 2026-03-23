/**
 * Resolves Wikimedia Commons 560px thumbnails per note (subject-specific photos).
 * Run: node scripts/resolve-note-images.mjs
 */
import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Preferred exact file names; search used if missing or not found */
const FILES = {
  bergamot: "Citrus bergamia - Bergamot.jpg",
  lemon: "Lemon-edit1.jpg",
  mandarin: "Mandarin orange.jpg",
  grapefruit: "Citrus paradisi (Grapefruit, pink) white bg.jpg",
  lime: "Lime - whole and halved.jpg",
  yuzu: "Yuzufruit.jpg",
  "orange-sweet": "Orange-Fruit-Pieces.jpg",
  apple: "Granny smith and cross section.jpg",
  pear: "Pears.jpg",
  peach: "Prunus persica.jpg",
  blackcurrant: "Blackcurrants.jpg",
  raspberry: "Raspberries05.jpg",
  neroli: "Orange blossoms.jpg",
  lavender: "Single lavender flower02.jpg",
  mint: "Mentha spicata 15-p.bot-mentha.spic-10.jpg",
  "green-tea": "Camellia sinensis(tea leaf) nilgiris ooty, india.jpg",
  galbanum: "Köhler Ferula gummosa.jpg",
  "violet-leaf-top": "Viola odorata flower.jpg",
  "pink-pepper": "Schinus terebinthifolius fruits.jpg",
  "cardamom-top": "Elettaria cardamomum.jpg",
  eucalyptus: "Eucalyptus tree.jpg",
  juniper: "Juniperus communis cones.jpg",
  "sea-salt": "Sea salt.jpg",
  cucumber: "Fresh cucumber.jpg",
  rose: "Rosa gallica sl101.jpg",
  jasmine: "Jasminum sambac flower.jpg",
  iris: "Iris sanguinea cultivar, Wakehurst Place, UK - Diliff.jpg",
  ylang: "Cananga odorata 02.JPG",
  peony: "Paeonia.jpg",
  tuberose: "Tuberose flower.jpg",
  "orange-blossom": "Orange blossoms - Portakal çiçekleri.jpg",
  magnolia: "Magnolia grandiflora flower.jpg",
  osmanthus: "Osmanthus fragrans.jpg",
  geranium: "Pelargonium graveolens.jpg",
  "violet-leaf": "Viola odorata whole.png",
  fig: "Ficus carica.jpg",
  plum: "Prunus domestica ripe fruits.jpg",
  cardamom: "Elettaria cardamomum.jpg",
  cinnamon: "Cinnamomum verum.jpg",
  nutmeg: "Nutmeg seeds.jpg",
  ginger: "Ingwer 2 (fcm).jpg",
  clove: "Dried cloves.jpg",
  saffron: "Saffron crocus.jpg",
  "coriander-seed": "Coriander seeds.jpg",
  honey: "Honey.jpg",
  vanilla: "Vanilla pods.jpg",
  tonka: "Tonka bean.jpg",
  cocoa: "Cocoa powder.jpg",
  coffee: "Coffee Beans Photographed in Macro.jpg",
  sandalwood: "Sandalwood.jpg",
  cedar: "Cedrus libani.jpg",
  vetiver: "Chrysopogon zizanioides-leaves-Garden of Eden Keanae.jpg",
  patchouli: "Patchouli.jpg",
  oakmoss: "Evernia prunastri (L).jpg",
  guaiac: "Guaiacum sanctum wood.jpg",
  oud: "Agarwood.jpg",
  amber: "Amber (resinite) (Baltics) 2.jpg",
  benzoin: "Styrax benzoin.jpg",
  labdanum: "Cistus ladanifer flower.jpg",
  frankincense: "Frankincense.jpg",
  myrrh: "Myrrh-resin, cropped.jpg",
  musk: "Fruits and seeds of Abelmoschus moschatus.jpg",
  ambroxan: "Ambergris.jpg",
  cashmeran: "Cashmere fabric.jpg",
  leather: "Leather.jpg",
  tobacco: "Nicotiana tabacum.jpg",
  "birch-tar": "Betula pendula bark.jpg",
};

const SEARCH = {
  yuzu: "yuzu citrus fruit",
  blackcurrant: "blackcurrant berries",
  neroli: "orange blossom citrus flower",
  "violet-leaf-top": "violet flower viola",
  "pink-pepper": "schinus molle pink pepper",
  jasmine: "jasmine flower white",
  ylang: "ylang ylang flower",
  "orange-blossom": "orange tree blossom",
  fig: "fig fruit tree",
  plum: "plum fruit",
  nutmeg: "nutmeg seed spice",
  clove: "cloves spice dried",
  saffron: "saffron threads crocus",
  vanilla: "vanilla bean pod",
  tonka: "tonka bean dipteryx",
  cedar: "cedar cone wood",
  patchouli: "patchouli plant",
  oakmoss: "oakmoss lichen",
  guaiac: "lignum vitae wood",
  amber: "amber resin fossil",
  benzoin: "benzoin resin",
  frankincense: "frankincense resin boswellia",
  myrrh: "myrrh resin",
  ambroxan: "ambergris",
  cashmeran: "cashmere wool textile",
  tobacco: "tobacco leaves plant",
  "birch-tar": "birch bark tree",
};

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            "User-Agent": "ScentLab/1.0 (https://github.com/Zazzouz/ScentLab; educational)",
          },
        },
        (res) => {
          let d = "";
          res.on("data", (c) => (d += c));
          res.on("end", () => {
            if (res.statusCode !== 200) {
              reject(new Error(`HTTP ${res.statusCode}`));
              return;
            }
            try {
              resolve(JSON.parse(d));
            } catch (e) {
              reject(new Error(`JSON: ${e.message}`));
            }
          });
        }
      )
      .on("error", reject);
  });
}

async function thumbForTitle(fileTitleWithPrefix) {
  const u = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(
    fileTitleWithPrefix
  )}&prop=imageinfo&iiprop=url&iiurlwidth=560&format=json`;
  const j = await fetchJson(u);
  const page = Object.values(j.query?.pages || {})[0];
  if (page?.missing) return null;
  const info = page?.imageinfo?.[0];
  return info?.thumburl || info?.url || null;
}

async function searchFirstFile(query) {
  const u = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
    query
  )}&srnamespace=6&format=json&srlimit=1`;
  const j = await fetchJson(u);
  const hit = j.query?.search?.[0];
  return hit?.title || null;
}

async function resolveOne(id) {
  const file = FILES[id];
  if (file) {
    const url = await thumbForTitle(`File:${file}`);
    if (url) return url;
  }
  const q = SEARCH[id] || `${id.replace(/-/g, " ")} perfume ingredient`;
  const title = await searchFirstFile(q);
  if (!title) return null;
  return thumbForTitle(title);
}

async function main() {
  const ids = Object.keys(FILES);
  const out = {};
  const errors = [];
  for (const id of ids) {
    try {
      const url = await resolveOne(id);
      if (url) out[id] = url;
      else errors.push({ id, reason: "unresolved" });
    } catch (e) {
      errors.push({ id, reason: e.message });
    }
    await new Promise((r) => setTimeout(r, 350));
  }
  const outPath = path.join(__dirname, "../src/data/noteImageUrls.json");
  fs.writeFileSync(outPath, JSON.stringify({ images: out, errors }, null, 2));
  console.log("Resolved:", Object.keys(out).length, "/", ids.length, "errors:", errors.length);
  if (errors.length) console.log(JSON.stringify(errors, null, 2));
}

main().catch(console.error);
