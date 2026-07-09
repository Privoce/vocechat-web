import { KEY_SERVER_ID, KEY_TOKEN, KEY_UID } from "@/app/config";
import { reloadCurrentPage } from "@/utils";

const deleteAllIndexedDB = async () => {
  try {
    if (typeof indexedDB.databases === "function") {
      const dbs = await indexedDB.databases();
      await Promise.all(
        dbs.map(
          ({ name }) =>
            name &&
            new Promise<void>((resolve) => {
              const req = indexedDB.deleteDatabase(name);
              // onblocked: deletion finishes once open connections close on reload
              req.onsuccess = req.onerror = req.onblocked = () => resolve();
            })
        )
      );
    } else {
      // Safari < 14 fallback: drop localforage default database
      indexedDB.deleteDatabase("localforage");
    }
  } catch (e) {
    console.error("failed to clear indexedDB", e);
  }
};

const unregisterServiceWorkers = async () => {
  try {
    if ("serviceWorker" in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((reg) => reg.unregister()));
    }
  } catch (e) {
    console.error("failed to unregister service workers", e);
  }
};

const clearCacheStorage = async () => {
  try {
    if ("caches" in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
    }
  } catch (e) {
    console.error("failed to clear cache storage", e);
  }
};

let checking = false;

/**
 * Compare the server's unique id against the one stored locally.
 *
 * - server has no id (old server version): do nothing
 * - id matches the stored one: do nothing
 * - fresh visit (nothing stored locally at all): just remember the id
 * - stored id differs, or local data exists from a server without id:
 *   the server behind this domain was replaced — wipe localStorage,
 *   indexedDB and CacheStorage, unregister service workers, then reload
 *   so no stale cache leaks into the new server.
 */
export const checkServerIdentity = async (serverId?: string | null) => {
  if (!serverId || checking) return;
  const storedId = localStorage.getItem(KEY_SERVER_ID);
  if (storedId === serverId) return;

  const hasLocalData = !!(localStorage.getItem(KEY_UID) || localStorage.getItem(KEY_TOKEN));
  if (!storedId && !hasLocalData) {
    localStorage.setItem(KEY_SERVER_ID, serverId);
    return;
  }

  checking = true;
  console.warn("server identity changed, clearing local data", { storedId, serverId });
  try {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem(KEY_SERVER_ID, serverId);
    await Promise.all([deleteAllIndexedDB(), unregisterServiceWorkers(), clearCacheStorage()]);
  } finally {
    reloadCurrentPage();
  }
};
