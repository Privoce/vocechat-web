import { useState, useRef, useEffect } from "react";
import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";

import { NativeTypes } from "react-dnd-html5-backend";
import ImagePreviewModal from "../../../common/component/ImagePreviewModal";
import Send from "../../../common/component/Send";
import Styled from "./styled";
import Operations from "./Operations";
import useUploadFile from "../../../common/hook/useUploadFile";

export default function Layout({
  children,
  header,
  aside = null,
  contacts = null,
  dropFiles = [],
  context = "channel",
  to = null,
}) {
  const { addStageFile } = useUploadFile({ context, id: to });
  const messagesContainer = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const selects = useSelector(
    (store) => store.ui.selectMessages[`${context}_${to}`]
  );
  const [{ isActive }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop({ files }) {
        console.log("drop files", files, context, to);
        if (files.length) {
          const filesData = files.map((file) => {
            const { size, type, name } = file;
            const url = URL.createObjectURL(file);
            return { size, type, name, url };
          });
          addStageFile(filesData);
        }
      },
      collect: (monitor) => ({
        isActive: monitor.canDrop() && monitor.isOver(),
      }),
    }),
    [context, to]
  );
  useEffect(() => {
    if (dropFiles?.length) {
      const filesData = dropFiles.map((file) => {
        const { size, type, name } = file;
        const url = URL.createObjectURL(file);
        return { size, type, name, url };
      });
      addStageFile(filesData);
    }
  }, [dropFiles]);

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
          if (
            target.nodeName == "IMG" &&
            target.classList.contains("preview")
          ) {
            const originUrl = target.dataset.origin || target.src;
            const downloadLink = target.dataset.download || target.src;
            const meta = JSON.parse(target.dataset.meta || "{}");
            setPreviewImage({ originUrl, downloadLink, ...meta });
          }
        },
        true
      );
    }
  }, []);

  return (
    <>
      {previewImage && (
        <ImagePreviewModal data={previewImage} closeModal={closePreviewModal} />
      )}
      <Styled ref={drop}>
        {header}
        <main className="main" ref={messagesContainer}>
          <div className="chat">
            {children}
            <div className={`send ${selects ? "selecting" : ""}`}>
              <Send key={to} id={to} context={context} />
              {selects && <Operations context={context} id={to} />}
            </div>
          </div>
          {contacts && <div className="members">{contacts}</div>}
          {aside && <div className="aside">{aside}</div>}
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
      </Styled>
    </>
  );
}
