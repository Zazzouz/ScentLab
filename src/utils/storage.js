const KEY = "scentlab-saved-fragrances";

export function loadSavedFragrances() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveSavedFragrances(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
