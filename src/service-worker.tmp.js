// This a service worker file for receiving push notifitications.
// See `Access registration token section` @ https://firebase.google.com/docs/cloud-messaging/js/client#retrieve-the-current-registration-token
import { firebaseConfig } from "./app/config";
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// Initialize the Firebase app in the service worker by passing the generated config
// Retrieve firebase messaging
const messaging = getMessaging(initializeApp(firebaseConfig));
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

      //   let chatClient;
      let redirectPath = rustchat_to_uid
        ? `/chat/dm/${rustchat_from_uid}`
        : rustchat_to_gid
        ? `/chat/channel/${rustchat_to_gid}`
        : "";
      if (!redirectPath) {
        firstClient.focus();
        return;
      }
      if (allClients.length !== 0) {
        firstClient.postMessage({ newPath: redirectPath });
        firstClient.focus();
      }
    })()
  );
});

// self.addEventListener("notificationclose", function (event) {});
