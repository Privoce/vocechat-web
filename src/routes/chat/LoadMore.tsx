import { useRef, useEffect, FC } from "react";
import { Waveform } from "@uiball/loaders";

type Props = {
  pullUp: () => Promise<void> | null;
};
const LoadMore: FC<Props> = ({ pullUp = null }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const intersecting = entry.isIntersecting;
          //   const currEle = entry.target;
          if (intersecting && pullUp) {
            // load more
            pullUp();
          }
        });
      },
      { threshold: 0 }
    );
    let currEle: HTMLDivElement | null = null;
    if (ref) {
      currEle = ref.current;
      if (currEle) {
        observer.observe(currEle);
      }
    }
    return () => {
      if (currEle) {
        observer.unobserve(currEle);
      }
    };
  }, [ref, pullUp]);
  return (
    <div className="mt-2 flex justify-center items-center w-full py-2" ref={ref}>
      <Waveform size={18} lineWeight={4} speed={1} color="#ccc" />
    </div>
  );
};
export default LoadMore;
