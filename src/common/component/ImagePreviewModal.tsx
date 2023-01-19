import { useRef, useState, useEffect, FC } from "react";
import styled, { keyframes } from "styled-components";
import { useOutsideClick, useKey } from "rooks";
import { Ring } from "@uiball/loaders";
import Modal from "./Modal";

const AniFadeIn = keyframes`
  from {
    background: transparent;
  }
  to {
    background: rgba(1, 1, 1, 0.9);
  }
`;

const StyledWrapper = styled.div`
  transition: all 0.5s ease;
  width: 100vw;
  height: 100vh;
  animation: ${AniFadeIn} 0.3s ease-in-out forwards;
  display: flex;
  align-items: center;
  justify-content: center;

  .box {
    position: relative;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;

    > .loading {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translateX(-50%);
    }

    > .image {
      overflow: auto;

      img {
        max-width: 70vw;
        max-height: 80vh;
      }
    }

    &.loading .image img {
      filter: blur(2px);
    }
  }
`;

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
      <StyledWrapper>
        <div className={`box ${loading ? "loading" : ""}`} ref={wrapperRef}>
          <div className="image">
            <img
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
              Download original
            </a>
          )}
          {loading && (
            <div className="loading">
              <Ring />
            </div>
          )}
        </div>
      </StyledWrapper>
    </Modal>
  );
};

export default ImagePreviewModal;
