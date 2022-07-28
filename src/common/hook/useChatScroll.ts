import { useRef, useEffect } from "react";
// import { useDebounce } from "rooks";

function useChatScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (ref.current) {
      console.log("chat scroll", ref);
      const ele = ref.current;
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          console.log("update scroll top");
          entry.target.scrollTop = entry.target.scrollHeight;
        }
      });

      resizeObserver.observe(ele);
    }
  }, []);
  return ref;
}

export default useChatScroll;
