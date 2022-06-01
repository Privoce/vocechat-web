import { useRef, useEffect } from "react";
import styled from "styled-components";
import { Waveform } from "@uiball/loaders";

const Styled = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 30px 0;
  /* background-color: #eee; */
`;
export default function LoadMore({ pullDown = null }) {
  const ref = useRef(undefined);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const intersecting = entry.isIntersecting;
          //   const currEle = entry.target;
          if (intersecting && pullDown) {
            // load more
            console.log("inview");
            pullDown();
          }
        });
      },
      { threshold: 0 }
    );
    const currEle = ref?.current;
    if (currEle) {
      observer.observe(ref.current);
    }
    return () => {
      if (currEle) {
        observer.unobserve(currEle);
      }
    };
  }, [ref, pullDown]);
  return (
    <Styled ref={ref}>
      <Waveform
        className="loading"
        size={24}
        lineWeight={5}
        speed={1}
        color="#ccc"
      />
    </Styled>
  );
}
