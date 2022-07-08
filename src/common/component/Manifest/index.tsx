import { useEffect, useState, useRef, FC } from "react";
import { BeforeInstallPromptEvent } from "../../../types/global";
import Prompt from "./Prompt";
import usePrompt from "./usePrompt";
interface IProps {}
const Manifest: FC<IProps> = () => {
  const { setCanceled: setCanceled, prompted } = usePrompt();
  const deferredPromptRef = useRef<null | BeforeInstallPromptEvent>(null);
  const [popup, setPopup] = useState(false);
  useEffect(() => {
    const handleInstallPromotion = (e: BeforeInstallPromptEvent) => {
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
    window.addEventListener("beforeinstallprompt", handleInstallPromotion, true);
    window.addEventListener("appinstalled", handleInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleInstallPromotion, true);
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
    setCanceled();
    setPopup(false);
  };
  if (!popup || prompted) return null;
  return <Prompt handleInstall={handleInstall} closePrompt={handleClose} />;
};
export default Manifest;
