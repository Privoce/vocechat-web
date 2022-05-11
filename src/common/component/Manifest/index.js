import { useEffect, useState, useRef } from "react";
// import { useGetServerQuery } from "../../../app/services/server";
// import manifest from "./manifest.json";
import Prompt from "./Prompt";
export default function Manifest() {
  const deferredPromptRef = useRef(null);
  const [popup, setPopup] = useState(false);
  // const { data, isSuccess } = useGetServerQuery();
  useEffect(() => {
    const handleInstallPromotion = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPromptRef.current = e;
      // Update UI notify the user they can install the PWA
      setPopup(true);
      // Optionally, send analytics event that PWA install promo was shown.
      console.log(`'beforeinstallprompt' event was fired.`);
    };
    const handleInstalled = () => {
      deferredPromptRef.current = null;
      setPopup(false);
    };
    // if (isSuccess && data) {
    //   console.log("server", data);
    //   manifest.name = `${data.name}'s Chat`;
    //   // const stringManifest = JSON.stringify(manifest);
    //   // const blob = new Blob([stringManifest], { type: "application/json" });
    //   // const manifestURL = URL.createObjectURL(blob);
    //   let content = encodeURIComponent(JSON.stringify(manifest));
    //   let manifestURL = "data:application/manifest+json," + content;
    //   const manifestEle = document.querySelector("#my-manifest-placeholder");
    //   if (manifestEle) {
    //     manifestEle.setAttribute("href", manifestURL);
    //   }

    // }
    window.addEventListener("beforeinstallprompt", handleInstallPromotion);
    window.addEventListener("appinstalled", handleInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleInstallPromotion);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);
  const handleInstall = async () => {
    // Hide the app provided install promotion
    setPopup(false);
    if (!deferredPromptRef.current) return;
    // Show the install prompt
    deferredPromptRef.current.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPromptRef.current.userChoice;
    // Optionally, send analytics event with outcome of user choice
    console.log(`User response to the install prompt: ${outcome}`);
    // We've used the prompt, and can't use it again, throw it away
    deferredPromptRef.current = null;
  };
  const handleClose = async () => {
    setPopup(false);
  };
  if (!popup) return null;
  return <Prompt handleInstall={handleInstall} closePrompt={handleClose} />;
}
