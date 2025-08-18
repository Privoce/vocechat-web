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
  const [searchParams] = useSearchParams();
  const [modelSrc, setModelSrc] = useState<string | undefined>(src);
  useEffect(() => {
    // 优先使用传入的 src，否则从 URL 参数中获取 file_path
    if (src) {
      setModelSrc(src);
    } else {
      const filePath = searchParams.get("file_path");
      if (filePath) {
        // URL decode 处理中文文件名
        const decodedFilePath = decodeURIComponent(filePath);
        setModelSrc(decodedFilePath);
      }
    }
  }, [src, searchParams]);
  return (
    <div
      style={{
        height: "100%",
        width: "300px",
        backgroundColor: "transparent",
        borderLeft: "2px solid rgb(107, 114, 128)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {modelSrc ? (
        <model-viewer
          alt="STP/GLB"
          src={`${BASE_URL}/resource/file?file_path=${modelSrc}`}
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
