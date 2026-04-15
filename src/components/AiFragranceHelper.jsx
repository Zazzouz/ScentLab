import { useCallback, useState } from "react";
import { getNoteById } from "../data/notes";
import { buildOllamaMessages, clipPriorityRecommendations } from "../utils/fragrancePrompt";
import {
  chatOllama,
  fetchInstalledModelNames,
  getOllamaConfig,
  resolveInstalledModelName,
} from "../utils/ollamaClient";

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

export default function AiFragranceHelper({ fragrance }) {
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usedModel, setUsedModel] = useState("");

  const run = useCallback(async () => {
    setError("");
    setReply("");
    const cfg = getOllamaConfig();
    if (cfg.unavailable) {
      setError(cfg.unavailableReason ?? "Ollama is not available on this page.");
      return;
    }
    setLoading(true);
    setUsedModel("");
    try {
      const { system, user } = buildOllamaMessages(fragrance, getNoteById);
      const installed = await fetchInstalledModelNames(cfg.baseUrl);
      if (installed.length === 0) {
        throw new Error(
          "No models found in Ollama. Open the Ollama app, then in a terminal run: ollama pull llama3.2"
        );
      }
      const model = resolveInstalledModelName(installed, cfg.model);
      setUsedModel(model);
      const raw = await chatOllama(cfg.baseUrl, model, system, user);
      setReply(clipPriorityRecommendations(raw));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [fragrance]);

  const cfg = getOllamaConfig();
  const { baseUrl, model, unavailable, unavailableReason } = cfg;

  return (
    <div className="panel ai-helper-panel">
      <h2 className="panel-title">
        AI suggestions <span className="badge">Ollama</span>
      </h2>
      {unavailable ? (
        <p className="ai-helper-error" role="status">
          {unavailableReason}
        </p>
      ) : (
        <p className="panel-hint">
          Uses <strong>Ollama</strong> on this PC. Requests go through the{" "}
          <strong>Vite dev proxy</strong> (
          <code className="ai-helper-code">{baseUrl}</code>) so the browser does not hit CORS. On
          click, the app reads <code className="ai-helper-code">/api/tags</code> and picks an
          installed model (prefers <code className="ai-helper-code">{model}</code> or same family,
          e.g. <code className="ai-helper-code">llama3.2:latest</code>).
        </p>
      )}
      <button
        type="button"
        className="ai-helper-btn"
        onClick={run}
        disabled={loading || unavailable}
      >
        {loading ? "Thinking…" : "Get recommendations"}
      </button>
      {error ? (
        <p className="ai-helper-error" role="alert">
          {error}
        </p>
      ) : null}
      {usedModel && !error ? (
        <p className="ai-helper-meta" aria-live="polite">
          Model: <code className="ai-helper-code">{usedModel}</code>
        </p>
      ) : null}
      {reply ? (
        <div className="ai-helper-reply">
          {reply.split("\n").map((line, i) => (
            <p key={i}>{formatLine(line)}</p>
          ))}
        </div>
      ) : null}
      <p className="ai-helper-disclaimer">
        Educational suggestions only — not a commercial formulation.
      </p>
    </div>
  );
}
