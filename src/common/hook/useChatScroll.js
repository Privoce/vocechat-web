import { useRef, useEffect } from "react";
// import { useDebounce } from "rooks";
function useChatScroll(dep) {
  const ref = useRef();
  // const updateScrollTop = useDebounce(() => {
  //   console.log("chat scroll", ref);
  //   if (ref.current) {
  //     setTimeout(() => {
  //       ref.current.scrollTop = ref.current.scrollHeight;
  //     }, 50);
  //   }
  // }, 100);
  // const updateScrollTop = () => {
  //   console.log("chat scroll", ref);
  //   if (ref.current) {
  //     setTimeout(() => {
  //       ref.current.scrollTop = ref.current.scrollHeight;
  //     }, 100);
  //   }
  // };
  useEffect(() => {
    console.log("chat scroll", ref);
    if (ref.current) {
      setTimeout(() => {
        if (ref.current) {
          ref.current.scrollTop = ref.current.scrollHeight;
        }
      }, 20);
    }
  }, [dep]);
  useEffect(() => {
    console.log("chat scroll", ref);
    if (ref.current) {
      const ele = ref.current;
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          entry.target.scrollTop = entry.target.scrollHeight;
        }
      });

      resizeObserver.observe(ele);
    }
  }, []);
  return ref;
}

export default useChatScroll;
