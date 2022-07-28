import { useRef, useEffect, FC } from "react";
import styled from "styled-components";
import { Waveform } from "@uiball/loaders";

const Styled = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 30px 0;
`;
type Props = {
  pullUp: () => void | null;
};
const LoadMore: FC<Props> = ({ pullUp = null }) => {
  const ref = useRef<HTMLDivElement>();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const intersecting = entry.isIntersecting;
          //   const currEle = entry.target;
          if (intersecting && pullUp) {
            // load more
            // console.log("inview");
            pullUp();
          }
        });
      },
      { threshold: 0 }
    );
    const currEle = ref?.current;
    if (currEle) {
      observer.observe(currEle);
    }
    return () => {
      if (currEle) {
        observer.unobserve(currEle);
      }
    };
  }, [ref, pullUp]);
  return (
    <Styled ref={ref}>
      <Waveform size={24} lineWeight={5} speed={1} color="#ccc" />
    </Styled>
  );
};
export default LoadMore;
