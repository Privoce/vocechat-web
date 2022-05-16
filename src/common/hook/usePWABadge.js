import { useEffect } from "react";
import PWABadge from "pwa-badge";
export default function usePWABadge() {
  // Create an Instance
  const badge = new PWABadge();
  useEffect(() => {
    if (badge.isSupported()) {
      badge.asyncSetBadge(2).catch((error) => {
        console.error(error);
      });
    }
  }, []);

  return {
    isSupported: badge.isSupported(),
  };
}
