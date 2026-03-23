/**
 * Per-note reference photos from Wikimedia Commons (subject-specific).
 * URLs live in noteImageUrls.json (regenerate: npm run images:notes).
 */
import noteImageData from "./noteImageUrls.json";
import { FAMILY_DEFAULT_IMAGE } from "./noteImageFamilies.js";

const NOTE_IMAGE_URLS = noteImageData.images;

const FALLBACK =
  NOTE_IMAGE_URLS.bergamot ||
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Citrus_bergamia_-_Bergamot.jpg/960px-Citrus_bergamia_-_Bergamot.jpg";

export function getNoteImage(note) {
  if (!note?.id) return FALLBACK;
  return (
    NOTE_IMAGE_URLS[note.id] ||
    FAMILY_DEFAULT_IMAGE[note.group] ||
    FALLBACK
  );
}

/** Credit line for UI (Commons requires attribution where shown prominently). */
export const COMMONS_CREDIT =
  "Reference photos from Wikimedia Commons (CC BY-SA, CC BY, public domain, etc.—see each file page).";
