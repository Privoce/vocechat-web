import { PrecacheEntry } from "workbox-precaching/src/_types";
import localforage from "localforage";

export declare global {
  interface Window {
    __WB_MANIFEST: Array<PrecacheEntry | string>;
    skipWaiting: () => void;
    CACHE: { [key: string]: typeof localforage };
  }
}
