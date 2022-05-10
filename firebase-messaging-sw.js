// This a service worker file for receiving push notifitications.
// See `Access registration token section` @ https://firebase.google.com/docs/cloud-messaging/js/client#retrieve-the-current-registration-token

self.addEventListener("notificationclick", function (event) {
  console.log("notification click", event, event.notification);
  event.waitUntil(
    (async function () {
      const allClients = await clients.matchAll({
        includeUncontrolled: true,
      });
      const [firstClient] = allClients;
      // 没有数据
      const customData = event.notification?.data?.FCM_MSG?.data;
      if (!customData) {
        firstClient.focus();
        return;
      }
      const {
        rustchat_from_uid,
        rustchat_to_uid,
        rustchat_to_gid,
      } = customData;

      let chatClient;
      let redirectPath = rustchat_to_uid
        ? `/chat/dm/${rustchat_from_uid}`
        : rustchat_to_gid
        ? `/chat/channel/${rustchat_to_gid}`
        : "";
      if (!redirectPath) {
        firstClient.focus();
        return;
      }
      if (allClients.length == 0) {
        chatClient = await clients.openWindow(redirectPath);
      } else {
        firstClient.postMessage({ newPath: redirectPath });
        firstClient.focus();
      }
    })()
  );
});
// Scripts for firebase and firebase messaging
// importScripts(
//   "https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js"
// );
// importScripts(
//   "https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js"
// );
importScripts(
  "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.8.1/firebase-app-compat.min.js"
);
importScripts(
  "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.8.1/firebase-messaging-compat.min.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDyJ6B1Ouenoha_gdGkBwIkBNStlwhlbO0",
  authDomain: "rustchat-develop.firebaseapp.com",
  projectId: "rustchat-develop",
  storageBucket: "rustchat-develop.appspot.com",
  messagingSenderId: "418687074928",
  appId: "1:418687074928:web:753286adbf239f5af9eab5",
  measurementId: "G-XV476KEC8P",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();
// Handle incoming messages while the app is not in focus (i.e in the background, hidden behind other tabs, or completely closed).
// data:{from_server_id}
// messaging.onBackgroundMessage((payload) => {
//   console.log("Received background message ", payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     data: payload.data,
//     body: payload.notification.body,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// self.addEventListener("notificationclose", function (event) {});
