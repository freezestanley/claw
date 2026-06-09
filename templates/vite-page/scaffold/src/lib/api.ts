function withFallbackBase(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return path.startsWith("/") ? path : `/${path}`;
}

declare global {
  interface Window {
    axios?: {
      get: (url: string, config?: Record<string, unknown>) => Promise<unknown>;
      post: (
        url: string,
        data?: unknown,
        config?: Record<string, unknown>
      ) => Promise<unknown>;
    };
  }
}

export async function apiGet(path: string, config: Record<string, unknown> = {}) {
  const url = withFallbackBase(path);

  if (window.axios?.get) {
    return window.axios.get(url, config);
  }

  const response = await fetch(url, { method: "GET" });
  if (!response.ok) {
    throw new Error(`GET ${url} failed: ${response.status}`);
  }

  return response;
}

export async function apiPost(
  path: string,
  data?: unknown,
  config: Record<string, unknown> = {}
) {
  const url = withFallbackBase(path);

  if (window.axios?.post) {
    return window.axios.post(url, data, config);
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: data === undefined ? undefined : JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`POST ${url} failed: ${response.status}`);
  }

  return response;
}
