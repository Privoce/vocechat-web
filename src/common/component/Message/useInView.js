import { useRef, useEffect } from "react";

export default function useInView() {
  const ref = useRef(undefined);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const intersecting = entry.isIntersecting;
        const currEle = entry.target;
        if (intersecting) {
          currEle.classList.add("in_view");
        } else {
          currEle.classList.remove("in_view");
        }
      });
    },
    { threshold: 0 }
  );
  useEffect(() => {
    const currEle = ref?.current;
    if (currEle) {
      observer.observe(ref.current);
    }
    return () => {
      if (currEle) {
        observer.unobserve(currEle);
      }
    };
  }, [ref]);

  return ref;
}
