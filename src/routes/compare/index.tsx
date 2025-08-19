import BASE_URL from "@/app/config";
import GlbModelRender from "@/components/Message/GlbModelRender";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function ComparePage() {
  const [searchParams] = useSearchParams();
  const [modelSrc, setModelSrc] = useState<string | undefined>(undefined);
  useEffect(() => {
    // 优先使用传入的 src，否则从 URL 参数中获取 file_path
    if (!modelSrc) {
      const filePath = searchParams.get("file_path");
      if (filePath) {
        // URL decode 处理中文文件名
        const decodedFilePath = decodeURIComponent(filePath);
        setModelSrc(decodedFilePath);
      }
    }
  }, [modelSrc, searchParams]);
  console.warn(`${BASE_URL}/resource/file?file_path=models/imgs/${modelSrc}.png`);
  return (
    <div
      style={{
        backgroundColor: "#374151",
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={`${BASE_URL}/resource/file?file_path=models/imgs/${modelSrc}`}
        alt=""
        style={{
          height: "auto",
          width: "50%",
          objectFit: "contain",
        }}
      />
      <div style={{ width: "50%", height: "100%", borderLeft: "2px solid rgb(107, 114, 128)" }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, textAlign: "center", color: "#fff" }}>
          {modelSrc}.stp
        </h3>
        <GlbModelRender src={modelSrc} />
      </div>
    </div>
  );
}
