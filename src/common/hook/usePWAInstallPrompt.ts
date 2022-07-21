import { useRef, useEffect } from "react";
import { KEY_PWA_INSTALLED } from "../../app/config";
import { BeforeInstallPromptEvent } from "../../types/global";

export default function usePWAInstallPrompt() {
  const deferredPromptRef = useRef<null | BeforeInstallPromptEvent>(null);
  const resetPrompt = () => {
    localStorage.removeItem(KEY_PWA_INSTALLED);
    deferredPromptRef.current = null;
  };
  const setPrompt = () => {
    localStorage.setItem(KEY_PWA_INSTALLED, "true");
  };

  const setDeferredPrompt = (p: BeforeInstallPromptEvent | null) => {
    deferredPromptRef.current = p;
  };
  const showPrompt = async () => {
    if (!deferredPromptRef.current) return;
    // Show the install prompt
    deferredPromptRef.current.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPromptRef.current.userChoice;
    // Optionally, send analytics event with outcome of user choice
    console.log(`User response to the install prompt: ${outcome}`);
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
  };
  useEffect(() => {
    const handleInstallPromotion = (e: BeforeInstallPromptEvent) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleInstallPromotion, true);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleInstallPromotion, true);
    };
  }, []);
  return {
    setCanceled: setPrompt,
    prompted: !!localStorage.getItem(KEY_PWA_INSTALLED),
    resetPrompt,
    deferredPrompt: deferredPromptRef.current,
    setDeferredPrompt,
    showPrompt
  };
}
