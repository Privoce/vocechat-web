import { FC, useEffect, useState } from "react";
import "@google/model-viewer";
import { useSearchParams } from "react-router-dom";
import BASE_URL from "@/app/config";

// // TypeScript 类型声明
// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       "model-viewer": any;
//     }
//   }
// }

type Props = {
  src?: string;
};

// ?file_path=134骨架.glb
export const GlbModelRender: FC<Props> = ({ src }) => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {src ? (
        <model-viewer
          style={{ width: "100%", height: "calc(100% - 32px)" }}
          alt="STP/GLB"
          src={`${BASE_URL}/resource/file?file_path=${src}`}
          ar
          shadow-intensity="1"
          camera-controls
          touch-action="pan-y"
        ></model-viewer>
      ) : (
        <div
          style={{
            color: "#fff",
          }}
        >
          wait model input
        </div>
      )}
    </div>
  );
};

// export default memo(GlbModelRender, (prev, next) => prev.cid == next.cid);
export default GlbModelRender;
