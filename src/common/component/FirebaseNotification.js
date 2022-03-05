import { useEffect } from "react";
import { getMessaging, getToken } from "firebase/messaging";

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDyJ6B1Ouenoha_gdGkBwIkBNStlwhlbO0",
//   authDomain: "rustchat-develop.firebaseapp.com",
//   projectId: "rustchat-develop",
//   storageBucket: "rustchat-develop.appspot.com",
//   messagingSenderId: "418687074928",
//   appId: "1:418687074928:web:7ad57a83f756285cf9eab5",
//   measurementId: "G-61T6TLQ27T"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default function Notification() {
  useEffect(() => {
    // Get registration token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: "<YOUR_PUBLIC_VAPID_KEY_HERE>" })
      .then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...
        } else {
          // Show permission request UI
          console.log(
            "No registration token available. Request permission to generate one."
          );
          // ...
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        // ...
      });
  }, []);

  return <div>Notification</div>;
}
