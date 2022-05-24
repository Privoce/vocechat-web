// import { useRef, useEffect } from "react";
import styled from "styled-components";
import { Waveform } from "@uiball/loaders";

const Styled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 8px;
  /* background-color: #eee; */
`;
export default function LoadMore() {
  // const ref = useRef(undefined);
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         const intersecting = entry.isIntersecting;
  //         //   const currEle = entry.target;
  //         if (intersecting && loadMore) {
  //           // load more
  //           console.log("inview");
  //           loadMore();
  //         }
  //       });
  //     },
  //     { threshold: 0 }
  //   );
  //   const currEle = ref?.current;
  //   if (currEle) {
  //     observer.observe(ref.current);
  //   }
  //   return () => {
  //     if (currEle) {
  //       observer.unobserve(currEle);
  //     }
  //   };
  // }, [ref]);
  return (
    <Styled>
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
