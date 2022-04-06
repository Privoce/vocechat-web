import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import toast, { Toaster } from 'react-hot-toast';
import { useDeviceToken, onMessageListener } from "./firebase";
import { useUpdateDeviceTokenMutation } from "../../../app/services/auth";

const Notification = () => {
  const navigateTo = useNavigate();
  const token = useDeviceToken(
    `BGXCn-5YRXSFw38Q9lUKJ5bibL212-yIQn1pCvthGhp6_KwA29FO1Ax_d_7if1vfC2a5wTSVO8AcZrc-Hm1aS0Y`
  );
  const [updateDeviceToken] = useUpdateDeviceTokenMutation();
  const [notification, setNotification] = useState({ title: "", body: "" });
  //   const notify = () =>  toast(<ToastDisplay/>);
  //   function ToastDisplay() {
  //     return (
  //       <div>
  //         <p><b>{notification?.title}</b></p>
  //         <p>{notification?.body}</p>
  //       </div>
  //     );
  //   };
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
  }, [notification]);

  onMessageListener()
    .then((payload) => {
      console.log("foreground notification", payload);
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });
    })
    .catch((err) => console.log("failed: ", err));

  return null;
};

export default Notification;
