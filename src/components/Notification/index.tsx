import { useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import useDeviceToken from "./useDeviceToken";
import { vapidKey } from "@/app/config";
import { useUpdateDeviceTokenMutation } from "@/app/services/auth";
let updated = false;
let updating = false;
const Notification = () => {
  const navigateTo = useNavigate();
  const token = useDeviceToken(vapidKey);
  const [updateDeviceToken] = useUpdateDeviceTokenMutation();
  useEffect(() => {
    const updateToken = async (token: string) => {
      if (!token || updating || updated) return;
      try {
        updating = true;
        await updateDeviceToken(token);
        updated = true;
      } catch {
        updating = false;
        updated = true;
      }
    };
    updateToken(token as string);
  }, [token]);

  useEffect(() => {
    const handleServiceWorkerMessage = (event: MessageEvent) => {
      const { newPath } = event.data;
      if (newPath && document.hidden) {
        navigateTo(newPath);
      }
    };
    // https only
    navigator.serviceWorker?.addEventListener("message", handleServiceWorkerMessage);
    return () => {
      navigator.serviceWorker?.removeEventListener("message", handleServiceWorkerMessage);
    };
  }, []);

  return null;
};

export default memo(Notification);
