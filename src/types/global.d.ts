import {
  IAgoraRTCClient,
  ICameraVideoTrack,
  ILocalAudioTrack,
  ILocalVideoTrack,
  IMicrophoneAudioTrack,
  IRemoteAudioTrack,
  IRemoteVideoTrack
} from "agora-rtc-sdk-ng";
interface BeforeInstallPromptEvent extends Event {
  /**
   * Returns an array of DOMString items containing the platforms on which the event was dispatched.
   * This is provided for user agents that want to present a choice of versions to the user such as,
   * for example, "web" or "play" which would allow the user to chose between a web version or
   * an Android version.
   */
  readonly platforms: Array<string>;

  /**
   * Returns a Promise that resolves to a DOMString containing either "accepted" or "dismissed".
   */
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;

  /**
   * Allows a developer to show the install prompt at a time of their own choosing.
   * This method returns a Promise.
   */
  prompt(): Promise<void>;
}
export declare global {
  import { PrecacheEntry } from "workbox-precaching/src/_types";
  import localforage from "localforage";
  interface Document {
    webkitHidden: boolean;
  }
  interface Window {
    MSG_SOUND: boolean;
    AUTO_RELOAD: boolean;
    AFTER_MID: number;
    USERS_VERSION: number;
    __WB_MANIFEST: Array<PrecacheEntry | string>;
    skipWaiting: () => void;
    CACHE: { [key: string]: typeof localforage | undefined };
    VOICE_CLIENT?: IAgoraRTCClient;
    VOICE_TRACK_MAP: {
      [key: number]: IRemoteAudioTrack | IMicrophoneAudioTrack | undefined | null;
    };
    VIDEO_TRACK_MAP: {
      [key: number]: IRemoteVideoTrack | ICameraVideoTrack | ShareScreenTrack | undefined | null;
    };
  }
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
  interface Element {
    scrollIntoViewIfNeeded?: any;
  }
}
export type ShareScreenTrack = ILocalVideoTrack | [ILocalVideoTrack, ILocalAudioTrack];
