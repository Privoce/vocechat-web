import { useState, useRef, useEffect } from "react";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import styled from "styled-components";
import ImagePreviewModal from "../../common/component/ImagePreviewModal";
import UploadModal from "../../common/component/UploadModal";

const StyledWrapper = styled.article`
  position: relative;
  width: 100%;
  background: #fff;
  height: 100vh;
  > .head {
    height: 56px;
    padding: 0 20px;
    box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
  }
  > .main {
    height: calc(100vh - 56px);
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;
    .members {
      box-shadow: inset 0px 10px 2px -10px rgba(0, 0, 0, 0.1);
      /* margin-top: 1px; */
      /* border-top: 1px solid transparent; */
    }
  }
  .drag_tip {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    visibility: hidden;
    /* pointer-events: none; */
    &.visible {
      visibility: visible;
    }
    .box {
      padding: 16px;
      filter: drop-shadow(0px 25px 50px rgba(31, 41, 55, 0.25));
      border-radius: 8px;
      background: #52edff;
      .inner {
        padding: 16px;
        padding-top: 64px;
        border: 2px dashed #a5f3fc;
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fff;
        .head {
          font-weight: 600;
          font-size: 20px;
          line-height: 30px;
        }
        .intro {
          font-weight: normal;
          font-size: 14px;
          line-height: 20px;
        }
      }
    }
  }
`;

export default function Layout({
  children,
  header,
  contacts = null,
  dropFiles = [],
  context = "channel",
  to = null,
}) {
  const messagesContainer = useRef(null);
  const [files, setFiles] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [{ isActive }, drop] = useDrop(() => ({
    accept: [NativeTypes.FILE],
    drop({ files }) {
      console.log("drop files", files);
      if (files.length) {
        setFiles((prevs) => [...prevs, ...files]);
      }
    },
    collect: (monitor) => ({
      isActive: monitor.canDrop() && monitor.isOver(),
    }),
  }));
  useEffect(() => {
    if (dropFiles.length) {
      setFiles((prevs) => [...prevs, ...dropFiles]);
    }
  }, [dropFiles]);

  const resetFiles = () => {
    setFiles([]);
  };

  const closePreviewModal = () => {
    setPreviewImage(null);
  };
  useEffect(() => {
    if (messagesContainer) {
      const container = messagesContainer.current;
      // 点击查看大图
      container.addEventListener(
        "click",
        (evt) => {
          console.log(evt);
          const { target } = evt;
          if (target.nodeType == 1 && target.classList.contains("preview")) {
            setPreviewImage(target.dataset.origin || target.src);
          }
        },
        true
      );
    }
  }, []);

  return (
    <>
      {previewImage && (
        <ImagePreviewModal
          image={previewImage}
          closeModal={closePreviewModal}
        />
      )}
      <StyledWrapper ref={drop}>
        <header className="head">{header}</header>
        <main className="main" ref={messagesContainer}>
          {children}
          {contacts && <div className="members">{contacts}</div>}
        </main>
        <div
          className={`drag_tip ${
            isActive ? "visible animate__animated animate__fadeIn" : ""
          }`}
        >
          <div
            className={`box ${
              isActive ? "animate__animated animate__bounceIn" : ""
            }`}
          >
            <div className="inner">
              <h4 className="head">Upload to #Channel</h4>
              <span className="intro">
                Photos accept jpg, png, max size limit to 10M.
              </span>
            </div>
          </div>
        </div>
      </StyledWrapper>
      {files.length !== 0 && (
        <UploadModal
          context={context}
          files={files}
          sendTo={to}
          closeModal={resetFiles}
        />
      )}
    </>
  );
}
