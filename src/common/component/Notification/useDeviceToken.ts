import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getToken, getMessaging } from "firebase/messaging";
import { firebaseConfig } from "../../../app/config";
let requesting = false;
let error = false;
const useDeviceToken = (vapidKey: string) => {
  const [token, setToken] = useState<string | null>(null);
  // https only
  if (navigator.serviceWorker) {
    const messaging = getMessaging(initializeApp(firebaseConfig));
    if (requesting || error) return;
    requesting = true;
    // https://github.com/firebase/firebase-js-sdk/issues/5081
    getToken(messaging, {
      vapidKey
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log("current token for client: ", currentToken);
          setToken(currentToken);
          // updateDeviceToken(currentToken)
          // Perform any other necessary action with the token
        } else {
          // Show permission request UI
          console.log("No registration token available. Request permission to generate one.");
        }
        requesting = false;
      })
      .catch((err) => {
        requesting = false;
        error = true;
        console.log("An error occurred while retrieving token. ", err);
      });
  }
  return token;
};

export default useDeviceToken;
