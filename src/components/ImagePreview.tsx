import { useEffect, useState } from "react";

import ImagePreviewModal, { PreviewImageData } from "./ImagePreviewModal";

type Props = {
  context?: "chat" | "markdown";
  container?: HTMLElement | null;
};

const ImagePreview = ({ context = "chat", container: containerProp }: Props) => {
  const [previewImage, setPreviewImage] = useState<PreviewImageData | null>(null);
  const closePreviewModal = () => {
    setPreviewImage(null);
  };
  useEffect(() => {
    const container = containerProp || (document.querySelector("#CHAT_WRAPPER") as HTMLDivElement);
    if (!container) return;
    const chatHandler = (evt: MouseEvent) => {
      const target = evt.target as HTMLImageElement;
      // 检查灯箱是否已经打开，如果是则忽略所有点击
      if (document.querySelector(".yarl__root")) return;
      const isMsg = !!target.closest(".vc-msg");
      // 排除 markdown 容器内的图片，避免重复处理
      const isInMarkdown = !!target.closest("#MARKDOWN_CONTAINER");
      if (isMsg && target && target.nodeName == "IMG" && target.classList.contains("preview") && !isInMarkdown) {
        // console.log("click chat", target);
        evt.stopPropagation();
        const thumbnail = target.src;
        const originUrl = target.dataset.origin || target.src;
        const downloadLink = target.dataset.download || target.src;
        const meta = JSON.parse(target.dataset.meta || "{}");
        setPreviewImage({ thumbnail, originUrl, downloadLink, ...meta });
      }
    };
    const markdownHandler = (evt: MouseEvent) => {
      const target = evt.target as HTMLImageElement;
      // 检查灯箱是否已经打开，如果是则忽略所有点击
      if (document.querySelector(".yarl__root")) return;
      const isMsg = !!target.closest(".vc-msg");
      // 只处理 markdown 容器内的图片
      const isInMarkdown = !!target.closest("#MARKDOWN_CONTAINER");
      // 图片 并且没被 a 标签包裹
      if (isMsg && target && target.nodeName == "IMG" && target.parentElement?.tagName !== "A" && isInMarkdown) {
        // console.log("click markdown", target);
        evt.stopPropagation();
        const urlObj = new URL(target.src);
        const originUrl = `${urlObj.origin}${urlObj.pathname}?file_path=${urlObj.searchParams.get(
          "file_path"
        )}`;
        const thumbnail = `${urlObj.origin}${urlObj.pathname}?file_path=${urlObj.searchParams.get(
          "file_path"
        )}&thumbnail=true`;
        const downloadLink = `${urlObj.origin}${
          urlObj.pathname
        }?file_path=${urlObj.searchParams.get("file_path")}&download=true`;
        const data = { originUrl, downloadLink, thumbnail };
        setPreviewImage(data);
      }
    };

    const handler = context == "chat" ? chatHandler : markdownHandler;
    // 点击查看大图
    container.addEventListener("click", handler, true);
    return () => {
      container.removeEventListener("click", handler, true);
    };
  }, [context, containerProp]);
  return previewImage ? (
    <ImagePreviewModal download={true} data={previewImage} closeModal={closePreviewModal} />
  ) : null;
};

export default ImagePreview;
