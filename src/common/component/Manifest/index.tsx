import { useEffect, useState, FC } from "react";
import Prompt from "./Prompt";
import usePWAInstallPrompt from "../../hook/usePWAInstallPrompt";
import { BeforeInstallPromptEvent } from "../../../types/global";
interface IProps {}
const Manifest: FC<IProps> = () => {
  const { setCanceled, prompted, setDeferredPrompt, showPrompt } = usePWAInstallPrompt();
  const [popup, setPopup] = useState(false);
  useEffect(() => {
    const handleInstallPromotion = (e: BeforeInstallPromptEvent) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      setPopup(true);
      // Optionally, send analytics event that PWA install promo was shown.
      console.log(`'beforeinstallprompt' event was fired.`);
    };
    const handleInstalled = () => {
      setDeferredPrompt(null);
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
    await showPrompt();
  };
  const handleClose = async () => {
    setCanceled();
    setPopup(false);
  };
  if (!popup || prompted) return null;
  return <Prompt handleInstall={handleInstall} closePrompt={handleClose} />;
};
export default Manifest;
