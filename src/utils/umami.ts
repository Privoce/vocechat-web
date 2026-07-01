/**
 * Umami analytics — lazy loader.
 *
 * The script is injected into <head> at most once per page lifetime,
 * loaded on demand the first time trackUmamiEvent() is called.
 * Automatic pageview tracking is disabled; all events are explicit.
 */

const UMAMI_SCRIPT_URL = "https://install.voce.chat/script.js";
const UMAMI_WEBSITE_ID = "121f1469-bdce-4326-8fa3-7b820837c916";

type UmamiWindow = Window & { umami?: { track: (event: string, data?: Record<string, unknown>) => void } };

let loaded = false;
let loading = false;
const queue: Array<() => void> = [];

function loadScript(): Promise<void> {
  return new Promise((resolve) => {
    if (loaded) {
      resolve();
      return;
    }

    queue.push(resolve);

    if (loading) return;
    loading = true;

    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = UMAMI_SCRIPT_URL;
    script.setAttribute("data-website-id", UMAMI_WEBSITE_ID);
    script.setAttribute("data-auto-track", "false"); // disable automatic pageview tracking
    script.onload = () => {
      loaded = true;
      loading = false;
      queue.splice(0).forEach((cb) => cb());
    };
    script.onerror = () => {
      // Don't block callers on network failure; just drain the queue
      loading = false;
      queue.splice(0).forEach((cb) => cb());
    };
    document.head.appendChild(script);
  });
}

/**
 * Load the Umami script (if not already loaded) then fire a named event.
 * The script is fetched on first call and reused for all subsequent calls.
 * Safe to call from anywhere — silently no-ops if the script fails to load.
 *
 * @param eventName  The event name shown in the Umami dashboard.
 * @param data       Optional key/value payload.
 */
export async function trackUmamiEvent(
  eventName: string,
  data?: Record<string, unknown>
): Promise<void> {
  await loadScript();

  const umami = (window as UmamiWindow).umami;
  if (umami?.track) {
    umami.track(eventName, data);
  }
}
