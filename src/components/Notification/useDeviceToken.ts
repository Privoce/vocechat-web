import { useEffect, useState } from "react";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

import { firebaseConfig, KEY_DEVICE_TOKEN } from "@/app/config";

// 全局只请求一次,多个挂载点共享同一结果;失败也缓存,不重试
let tokenPromise: Promise<string> | null = null;

const requestDeviceToken = (vapidKey: string) => {
  if (!tokenPromise) {
    tokenPromise = (async () => {
      // isSupported 内部探测 IndexedDB,iOS Safari 下可能永不 resolve,须超时兜底
      const supported = await Promise.race([
        isSupported().catch(() => false),
        new Promise<boolean>((resolve) => {
          setTimeout(() => resolve(false), 10 * 1000);
        })
      ]);
      if (!supported) {
        console.info("Firebase messaging is not supported in this browser.");
        return "";
      }
      const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
      const currentToken = await getToken(getMessaging(app), { vapidKey });
      if (!currentToken) {
        // Show permission request UI
        console.info("No registration token available. Request permission to generate one.");
      }
      return currentToken || "";
    })().catch((err) => {
      console.info("An error occurred while retrieving token. ", err);
      return "";
    });
  }
  return tokenPromise;
};

const useDeviceToken = (vapidKey: string) => {
  const [token, setToken] = useState<string>("");
  useEffect(() => {
    if (token) {
      localStorage.setItem(KEY_DEVICE_TOKEN, token);
    }
  }, [token]);

  useEffect(() => {
    // https only
    if (!navigator.serviceWorker) return;
    let cancelled = false;
    requestDeviceToken(vapidKey).then((currentToken) => {
      if (currentToken && !cancelled) {
        setToken(currentToken);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [vapidKey]);

  return token;
};

export default useDeviceToken;
