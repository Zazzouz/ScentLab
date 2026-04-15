/**
 * Call a local Ollama instance (chat API).
 * In dev/preview on http://localhost, requests use `/ollama-api` → Vite proxy (no browser CORS).
 * @see https://github.com/ollama/ollama/blob/main/docs/api.md
 */

/**
 * List model names from Ollama (GET /api/tags).
 */
export async function fetchInstalledModelNames(baseUrl) {
  const url = `${baseUrl.replace(/\/$/, "")}/api/tags`;
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.models || []).map((m) => m.name).filter(Boolean);
  } catch {
    return [];
  }
}

/**
 * Pick a model name that actually exists locally.
 * Prefer exact match to `preferred`, then same family (e.g. llama3.2 → llama3.2:latest), else first installed.
 */
export function resolveInstalledModelName(installedNames, preferred) {
  if (!installedNames.length) return preferred;
  if (installedNames.includes(preferred)) return preferred;

  const family = preferred.includes(":") ? preferred.split(":")[0] : preferred;
  const sameFamily = installedNames.filter(
    (n) => n === family || n.startsWith(`${family}:`)
  );
  if (sameFamily.length) return sameFamily[0];

  return installedNames[0];
}

export async function chatOllama(baseUrl, model, system, user) {
  if (!baseUrl) {
    throw new Error(
      "Ollama URL is not configured for this page. Use npm run dev and open http://localhost:5173 (see README)."
    );
  }

  const url = `${baseUrl.replace(/\/$/, "")}/api/chat`;
  const body = {
    model,
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    stream: false,
  };

  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    throw new Error(
      `Could not reach the dev server or Ollama (${msg}). ` +
        `If you use npm run dev: start the Ollama app on this PC. ` +
        `If you opened the site on HTTPS (e.g. Netlify), use http://localhost:5173 locally instead.`
    );
  }

  if (!res.ok) {
    const text = await res.text();
    const lower = text.toLowerCase();
    const upstreamDown =
      res.status >= 502 ||
      lower.includes("econnrefused") ||
      lower.includes("socket hang up");
    if (upstreamDown) {
      throw new Error(
        `Ollama is not responding (HTTP ${res.status}). Start the Ollama app and wait until it is running.`
      );
    }
    throw new Error(
      res.status === 404
        ? `Model not found (${model}). Run ollama pull ${model.split(":")[0]} or check ollama list.`
        : `Ollama error ${res.status}: ${text.slice(0, 280)}`
    );
  }

  const data = await res.json();
  const content =
    data?.message?.content ??
    data?.choices?.[0]?.message?.content ??
    null;
  if (typeof content !== "string" || !content.trim()) {
    throw new Error("Empty response from Ollama.");
  }
  return content.trim();
}

/**
 * Resolves API base URL and preferred model name (may be adjusted per ollama list at runtime).
 */
export function getOllamaConfig() {
  const model =
    import.meta.env.VITE_OLLAMA_MODEL?.trim() || "llama3.2";
  const explicit = import.meta.env.VITE_OLLAMA_URL?.trim();
  if (explicit) {
    return { baseUrl: explicit, model };
  }

  if (typeof window !== "undefined") {
    const { protocol, hostname } = window.location;
    const loopback =
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "[::1]";
    if (protocol === "http:" && loopback) {
      return { baseUrl: "/ollama-api", model };
    }
    if (protocol === "https:") {
      return {
        baseUrl: "",
        model,
        unavailable: true,
        unavailableReason:
          "This site is on HTTPS. Open http://localhost:5173/builder on the same computer as Ollama (run npm run dev).",
      };
    }
  }

  if (import.meta.env.DEV) {
    return { baseUrl: "/ollama-api", model };
  }

  return { baseUrl: "http://127.0.0.1:11434", model };
}
