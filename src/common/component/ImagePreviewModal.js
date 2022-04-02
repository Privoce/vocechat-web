import { useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useOutsideClick, useKey } from "rooks";
import Modal from "./Modal";
const AniFadeIn = keyframes`
from{
background: transparent;
}
to{
  background: rgba(1, 1, 1, 0.9);
}
`;
const StyledWrapper = styled.div`
  /* todo */
  transition: all 0.5s ease;
  width: 100vw;
  height: 100vh;
  /* background-color: rgba(1, 1, 1, 0.9); */
  animation: ${AniFadeIn} 0.3s ease-in-out forwards;
  display: flex;
  align-items: center;
  justify-content: center;
  .box {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
    img {
      max-width: 70vw;
      max-height: 80vh;
    }
    .origin {
      font-weight: bold;
      font-size: 14px;
      color: #aaa;
      &:hover {
        text-decoration: underline;
        color: #fff;
      }
    }
  }
`;
export default function ImagePreviewModal({
  download = true,
  data = null,
  closeModal,
}) {
  const wrapperRef = useRef();
  useOutsideClick(wrapperRef, closeModal);
  useKey(
    "Escape",
    () => {
      console.log("close preview modal");
      closeModal();
    },
    { eventTypes: ["keyup"] }
  );
  // const handleMetaDataLoaded = (wtf) => {
  //   console.log("meta data", wtf);
  // };
  // const handleDownload = (evt) => {
  //   evt.preventDefault();
  //   fetch(evt.target.href)
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       console.log(blob);
  //     });
  // };
  if (!data) return null;
  const { originUrl, name, type } = data;
  return (
    <Modal>
      <StyledWrapper>
        <div className="box" ref={wrapperRef}>
          <img
            // onLoadedMetadata={handleMetaDataLoaded}
            src={originUrl}
            alt="preview image"
            className="animate__animated animate__fadeIn animate__faster"
          />
          {download && (
            <a
              // onClick={handleDownload}
              className="origin"
              download={name}
              type={type}
              href={originUrl}
              // target="_blank"
              // rel="noreferrer"
            >
              Download original
            </a>
          )}
        </div>
      </StyledWrapper>
    </Modal>
  );
}
