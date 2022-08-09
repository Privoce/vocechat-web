import { useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import useDeviceToken from "./useDeviceToken";
import { vapidKey } from "../../../app/config";
import { useUpdateDeviceTokenMutation } from "../../../app/services/auth";
let updated = false;
const Notification = () => {
  const navigateTo = useNavigate();
  const token = useDeviceToken(vapidKey);
  const [updateDeviceToken, { isSuccess }] = useUpdateDeviceTokenMutation();
  useEffect(() => {
    if (token && !updated) {
      updateDeviceToken(token);
    }
  }, [token]);
  useEffect(() => {
    updated = isSuccess;
  }, [isSuccess]);

  useEffect(() => {
    const handleServiceworkerMessage = (event: MessageEvent) => {
      const { newPath } = event.data;
      navigateTo(newPath);
    };
    // https only
    navigator.serviceWorker?.addEventListener("message", handleServiceworkerMessage);
    return () => {
      navigator.serviceWorker?.removeEventListener("message", handleServiceworkerMessage);
    };
  }, []);

  return null;
};

export default memo(Notification);
