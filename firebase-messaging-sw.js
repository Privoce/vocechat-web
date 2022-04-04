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
// data:{from_server_id}
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    data: payload.data,
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
// setTimeout(() => {
//   console.log("notification test");
//   self.registration.showNotification("hello", { body: "test" });
// }, 5000);
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

self.addEventListener("notificationclick", function (event) {
  console.log("notification click", event, event.notification);
  event.waitUntil(
    (async function () {
      const allClients = await clients.matchAll({
        includeUncontrolled: true,
      });
      const [firstClient] = allClients;
      // 没有数据
      if (!event.notification.data) {
        firstClient.focus();
        return;
      }
      const {
        rustchat_from_uid,
        rustchat_to_uid,
        rustchat_to_gid,
      } = event.notification.data;

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

      // // Let's see if we already have a chat window open:
      // for (const client of allClients) {
      //   const url = new URL(client.url);

      //   if (url.pathname == '/chat/') {
      //     // Excellent, let's use it!
      //     client.focus();
      //     chatClient = client;
      //     break;
      //   }
      // }

      // // If we didn't find an existing chat window,
      // // open a new one:
      // if (!chatClient) {
      //   chatClient = await clients.openWindow('/chat/');
      // }

      // // Message the client:
      // chatClient.postMessage("New chat messages!");
    })()
  );
});

// self.addEventListener("notificationclose", function (event) {});
