// import React from "react";
import { KEY_PWA_INSTALLED } from "../../../app/config";
export default function usePrompt() {
  const resetPrompt = () => {
    localStorage.removeItem(KEY_PWA_INSTALLED);
  };
  const setPrompt = () => {
    localStorage.setItem(KEY_PWA_INSTALLED, true);
  };

  return {
    setCanceled: setPrompt,
    prompted: !!localStorage.getItem(KEY_PWA_INSTALLED),
    resetPrompt
  };
}
