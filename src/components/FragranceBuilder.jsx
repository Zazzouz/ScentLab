import { useCallback, useEffect, useMemo, useState } from "react";
import { getNoteById } from "../data/notes";
import {
  cloneFragrance,
  createEmptyFragrance,
  deriveAccordProfile,
} from "../utils/fragranceModel";
import {
  generateId,
  loadSavedFragrances,
  saveSavedFragrances,
} from "../utils/storage";
import NotePyramid from "./NotePyramid";
import NoteSelector from "./NoteSelector";
import PerformanceControls from "./PerformanceControls";
import PresetSelector from "./PresetSelector";
import ProfileSliders from "./ProfileSliders";
import SavedCreations from "./SavedCreations";
import SiteHeader from "./SiteHeader";
import SummaryPanel from "./SummaryPanel";
import "../styles/builder.css";

/** Merge saved entry into full shape (handles older localStorage shapes). */
function mergeFromSaved(item) {
  const empty = createEmptyFragrance();
  return {
    ...empty,
    name: item.name ?? "",
    description: item.description ?? "",
    topNotes: Array.isArray(item.topNotes) ? item.topNotes.map((n) => ({ ...n })) : [],
    middleNotes: Array.isArray(item.middleNotes) ? item.middleNotes.map((n) => ({ ...n })) : [],
    baseNotes: Array.isArray(item.baseNotes) ? item.baseNotes.map((n) => ({ ...n })) : [],
    performance: { ...empty.performance, ...item.performance },
  };
}

export default function FragranceBuilder() {
  const [fragrance, setFragrance] = useState(() => createEmptyFragrance());
  const [savedList, setSavedList] = useState(() => loadSavedFragrances());

  useEffect(() => {
    saveSavedFragrances(savedList);
  }, [savedList]);

  const addNote = useCallback((layer, noteId) => {
    const key = `${layer}Notes`;
    setFragrance((f) => {
      if (f[key].some((n) => n.noteId === noteId)) return f;
      const note = getNoteById(noteId);
      const intensity = Math.round((note?.intensityBaseline ?? 0.7) * 100);
      return { ...f, [key]: [...f[key], { noteId, intensity }] };
    });
  }, []);

  const removeNote = useCallback((layer, noteId) => {
    const key = `${layer}Notes`;
    setFragrance((f) => ({
      ...f,
      [key]: f[key].filter((n) => n.noteId !== noteId),
    }));
  }, []);

  const setIntensity = useCallback((layer, noteId, intensity) => {
    const key = `${layer}Notes`;
    setFragrance((f) => ({
      ...f,
      [key]: f[key].map((n) =>
        n.noteId === noteId ? { ...n, intensity } : n
      ),
    }));
  }, []);

  const derivedProfile = useMemo(
    () => deriveAccordProfile(fragrance, getNoteById),
    [fragrance]
  );

  const setPerformance = useCallback((key, value) => {
    setFragrance((f) => ({
      ...f,
      performance: { ...f.performance, [key]: value },
    }));
  }, []);

  const applyPreset = useCallback((data) => {
    setFragrance(cloneFragrance(data));
  }, []);

  const reset = useCallback(() => {
    setFragrance(createEmptyFragrance());
  }, []);

  const handleSave = useCallback((payload) => {
    const entry = {
      ...payload,
      id: generateId(),
      savedAt: Date.now(),
    };
    setSavedList((list) => [entry, ...list]);
  }, []);

  const handleLoad = useCallback((item) => {
    setFragrance(mergeFromSaved(item));
  }, []);

  const handleDuplicate = useCallback((copy) => {
    setSavedList((list) => [copy, ...list]);
  }, []);

  const handleDelete = useCallback((id) => {
    setSavedList((list) => list.filter((x) => x.id !== id));
  }, []);

  return (
    <>
      <SiteHeader />
      <div className="builder-page">
        <div className="builder-wrap">
          <header className="builder-hero">
            <h1>Fragrance Builder</h1>
            <p>
              Stack top, heart, and base notes—your accord profile and live story update from each
              note&apos;s grades and pyramid intensities. Tune performance and save blends
              locally—no account required.
            </p>
          </header>

          <div className="reset-row">
            <button type="button" className="reset-btn" onClick={reset}>
              Clear builder
            </button>
          </div>

          <PresetSelector onApply={applyPreset} />

          <div className="builder-grid-main">
            <div className="builder-grid">
              <NoteSelector fragrance={fragrance} onAddNote={addNote} />
              <NotePyramid
                fragrance={fragrance}
                onRemoveNote={removeNote}
                onIntensityChange={setIntensity}
              />
              <ProfileSliders profile={derivedProfile} />
              <PerformanceControls
                performance={fragrance.performance}
                onChange={setPerformance}
              />
            </div>

            <aside className="builder-sidebar">
              <SummaryPanel fragrance={fragrance} />
              <SavedCreations
                savedList={savedList}
                onSave={handleSave}
                onLoad={handleLoad}
                onDuplicate={handleDuplicate}
                onDelete={handleDelete}
                currentFragrance={fragrance}
              />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
