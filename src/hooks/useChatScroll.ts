import { useEffect, useRef } from "react";

function useChatScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (ref.current) {
      const ele = ref.current;
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          entry.target.scrollTop = entry.target.scrollHeight;
        }
      });

      resizeObserver.observe(ele);
      // window.addEventListener("error", (e) => console.log(e.message));
    }
  }, []);
  return ref;
}

export default useChatScroll;
