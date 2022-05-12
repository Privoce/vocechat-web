// import React from "react";
const Key = `RUSTCHAT_PWA_PROMPT`;
export default function usePrompt() {
  const resetPrompt = () => {
    localStorage.removeItem(Key);
  };
  const setPrompt = () => {
    localStorage.setItem(Key, true);
  };

  return {
    setCanneled: setPrompt,
    prompted: !!localStorage.getItem(Key),
    resetPrompt,
  };
}
