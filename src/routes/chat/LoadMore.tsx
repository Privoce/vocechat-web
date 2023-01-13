import { memo, useEffect, FC } from "react";
import { Waveform } from "@uiball/loaders";
import { useInViewRef } from "rooks";

type Props = {
  pulling?: boolean;
  pullUp: () => Promise<void> | null;
};
const LoadMore: FC<Props> = ({ pullUp = null, pulling }) => {
  const [myRef, inView] = useInViewRef();
  useEffect(() => {
    if (inView && pullUp && !pulling) {
      pullUp();
    }
  }, [inView, pullUp, pulling]);
  return (
    <div data-load-more className="mt-2 flex justify-center items-center w-full py-2" ref={myRef}>
      <Waveform size={18} lineWeight={4} speed={1} color="#ccc" />
    </div>
  );
};
export default memo(LoadMore, (prev, next) => {
  return prev.pulling === next.pulling;
});
