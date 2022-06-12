import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
const isSafariBrowser = () =>
  navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") <= -1;
export default function useNotification() {
  // const navigate = useNavigate();
  // granted default denied  /
  const [status, setStatus] = useState(Notification.permission);
  const [pageVisible, setPageVisible] = useState(true);
  useEffect(() => {
    const visibleChangeHandler = () => {
      setPageVisible(document.visibilityState === "visible");
    };
    const notifyPermissionChangeHandler = (state) => {
      setStatus(state);
    };
    document.addEventListener("visibilitychange", visibleChangeHandler);
    if (!isSafariBrowser) {
      navigator.permissions.query({ name: "notifications" }).then(function (permissionStatus) {
        console.log("notifications permission status is ", permissionStatus.state);
        permissionStatus.onchange = notifyPermissionChangeHandler.bind(
          null,
          permissionStatus.state
        );
      });
    }
    return () => {
      document.removeEventListener("visibilitychange", visibleChangeHandler);
    };
  }, []);
  const enableNotification = () => {
    if (status !== "granted") {
      Notification.requestPermission().then((permission) => {
        console.log(permission);
        setStatus(permission);
      });
    }
  };
  const showNotification = (payload = {}) => {
    console.log("show notify", payload, pageVisible);
    if (status !== "granted" || pageVisible) return;
    const {
      title = "New Message",
      body = "You have one new message",
      icon = "https://static.nicegoodthings.com/project/ext/webrowse.logo.png"
    } = payload;
    new Notification(title, { body, icon });
    // const n = new Notification(title, { body, icon });
    // n.onclick = (evt) => {
    //   const { data } = evt.target;

    //   console.log("notify evt", evt);
    //   if (data && data.path) {
    //     navigate(data.path);
    //   }
    // };
  };
  return { status, enableNotification, showNotification };
}
