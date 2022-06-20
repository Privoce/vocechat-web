import { PrecacheEntry } from "workbox-precaching/src/_types";

export declare global {
  interface Window {
    __WB_MANIFEST: Array<PrecacheEntry | string>;
    skipWaiting: () => void;
  }
}
