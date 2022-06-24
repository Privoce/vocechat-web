export declare global {
  import { PrecacheEntry } from "workbox-precaching/src/_types";
  import localforage from "localforage";

  interface Window {
    __WB_MANIFEST: Array<PrecacheEntry | string>;
    skipWaiting: () => void;
    CACHE: { [key: string]: typeof localforage | undefined };
  }
}
