import { useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useOutsideClick } from "rooks";
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
      max-height: 70vw;
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
export default function ImagePreviewModal({ image = null, closeModal }) {
  const wrapperRef = useRef();
  useOutsideClick(wrapperRef, closeModal);

  if (!image) return null;
  return (
    <Modal>
      <StyledWrapper>
        <div className="box" ref={wrapperRef}>
          <img
            src={image}
            alt="preview image"
            className="animate__animated animate__fadeIn animate__faster"
          />
          <a className="origin" href={image} target="_blank" rel="noreferrer">
            Download original
          </a>
        </div>
      </StyledWrapper>
    </Modal>
  );
}
