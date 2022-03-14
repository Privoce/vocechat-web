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
        ref.current.scrollTop = ref.current.scrollHeight;
      }, 20);
    }
  }, [dep]);
  return ref;
}

export default useChatScroll;
