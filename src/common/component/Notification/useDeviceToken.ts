import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getToken, getMessaging } from "firebase/messaging";
import { firebaseConfig, KEY_DEVICE_TOKEN } from "../../../app/config";
let requesting = false;
let error = false;
const useDeviceToken = (vapidKey: string) => {
  const [token, setToken] = useState<string>("");
  useEffect(() => {
    if (token) {
      localStorage.setItem(KEY_DEVICE_TOKEN, token);
    }
  }, [token]);

  // https only
  if (navigator.serviceWorker) {
    const messaging = getMessaging(initializeApp(firebaseConfig));
    if (requesting || error) return;
    requesting = true;
    getToken(messaging, {
      vapidKey
    })
      .then((currentToken) => {
        if (currentToken) {
          setToken(currentToken);
          // updateDeviceToken(currentToken)
          // Perform any other necessary action with the token
        } else {
          // Show permission request UI
          console.info("No registration token available. Request permission to generate one.");
        }
        requesting = false;
      })
      .catch((err) => {
        requesting = false;
        error = true;
        console.info("An error occurred while retrieving token. ", err);
      });
  }
  return token;
};

export default useDeviceToken;
