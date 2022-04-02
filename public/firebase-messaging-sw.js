// This a service worker file for receiving push notifitications.
// See `Access registration token section` @ https://firebase.google.com/docs/cloud-messaging/js/client#retrieve-the-current-registration-token

// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

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
console.log("wwwwwwwwww");
// Handle incoming messages while the app is not in focus (i.e in the background, hidden behind other tabs, or completely closed).
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
// 开始监听推送
// self.addEventListener("push", function (event) {
//   var data = event.data.json();

//   const title = data.Title;
//   data.Data.actions = data.Actions;
//   const options = {
//     body: data.Message,
//     data: data.Data,
//   };
//   event.waitUntil(self.registration.showNotification(title, options));
// });

// self.addEventListener("notificationclick", function (event) {});

// self.addEventListener("notificationclose", function (event) {});
