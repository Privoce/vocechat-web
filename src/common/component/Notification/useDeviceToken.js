import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getToken, getMessaging } from "firebase/messaging";
import { firebaseConfig } from "../../../app/config";
const useDeviceToken = (vapidKey) => {
  const [token, setToken] = useState(null);
  // https only
  if (navigator.serviceWorker) {
    const messaging = getMessaging(initializeApp(firebaseConfig));

    getToken(messaging, {
      vapidKey
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log("current token for client: ", currentToken);
          setToken(currentToken);
          // updateDeviceToken(currentToken)
          // Perform any other neccessary action with the token
        } else {
          // Show permission request UI
          console.log("No registration token available. Request permission to generate one.");
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
      });
  }
  return token;
};
export default useDeviceToken;
