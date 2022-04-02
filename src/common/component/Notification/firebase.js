// Firebase Cloud Messaging Configuration File.
// Read more at https://firebase.google.com/docs/cloud-messaging/js/client && https://firebase.google.com/docs/cloud-messaging/js/receive
import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
const firebaseConfig = {
  apiKey: "AIzaSyDyJ6B1Ouenoha_gdGkBwIkBNStlwhlbO0",
  authDomain: "rustchat-develop.firebaseapp.com",
  projectId: "rustchat-develop",
  storageBucket: "rustchat-develop.appspot.com",
  messagingSenderId: "418687074928",
  appId: "1:418687074928:web:753286adbf239f5af9eab5",
  measurementId: "G-XV476KEC8P",
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const useDeviceToken = (vapidKey) => {
  const [token, setToken] = useState(null);

  getToken(messaging, {
    vapidKey,
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setToken(currentToken);
        // updateDeviceToken(currentToken)
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
  return token;
};

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("notification payload", payload);
      resolve(payload);
    });
  });
