import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import toast, { Toaster } from 'react-hot-toast';
import useDeviceToken from "./useDeviceToken";
import { vapidKey } from "../../../app/config";
import { useUpdateDeviceTokenMutation } from "../../../app/services/auth";

const Notification = () => {
  const navigateTo = useNavigate();
  const token = useDeviceToken(vapidKey);
  const [updateDeviceToken] = useUpdateDeviceTokenMutation();
  useEffect(() => {
    if (token) {
      updateDeviceToken(token);
    }
  }, [token]);

  useEffect(() => {
    const handleServiceworkerMessage = (event) => {
      const { newPath } = event.data;
      navigateTo(newPath);
    };
    navigator.serviceWorker.addEventListener(
      "message",
      handleServiceworkerMessage
    );
    return () => {
      navigator.serviceWorker.removeEventListener(
        "message",
        handleServiceworkerMessage
      );
    };
  }, []);

  return null;
};

export default Notification;
