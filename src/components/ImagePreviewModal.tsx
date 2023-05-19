import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Ring } from "@uiball/loaders";
import { useKey, useOutsideClick } from "rooks";

import Modal from "./Modal";

export interface PreviewImageData {
  originUrl: string;
  thumbnail?: string;
  downloadLink?: string;
  name?: string;
  type?: string;
}

interface Props {
  download?: boolean;
  data?: PreviewImageData;
  closeModal: () => void;
}

const ImagePreviewModal: FC<Props> = ({ download = true, data, closeModal }) => {
  const { t } = useTranslation();
  const [url, setUrl] = useState(data?.thumbnail);
  const [loading, setLoading] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideClick(wrapperRef, closeModal);

  useKey(
    "Escape",
    () => {
      closeModal();
    },
    { eventTypes: ["keyup"] }
  );

  useEffect(() => {
    if (data) {
      const { originUrl } = data;
      if (!originUrl) setLoading(false);
      const img = new Image();
      img.src = originUrl;
      img.onload = () => {
        setUrl(originUrl);
        setLoading(false);
      };
      img.onerror = () => {
        setLoading(false);
      };
    }
  }, [data]);

  if (!data) return null;
  const { originUrl, downloadLink, name, type } = data;
  return (
    <Modal>
      <div className="w-screen h-screen flex-center bg-black/90">
        <div className={`relative flex flex-col justify-start gap-3`} ref={wrapperRef}>
          <div className="overflow-auto">
            <img
              className={`max-w-[70vw] max-h-[80vh] ${loading ? "blur-sm" : ""}`}
              src={url}
              alt="preview"
            />
          </div>
          {download && (
            <a
              // onClick={handleDownload}
              className="font-semibold text-sm text-gray-600 hover:underline hover:text-white"
              download={name}
              type={type}
              href={downloadLink || originUrl}
              rel="noreferrer"
            >
              {t("action.download_origin")}
            </a>
          )}
          {loading && (
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2">
              <Ring />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ImagePreviewModal;
