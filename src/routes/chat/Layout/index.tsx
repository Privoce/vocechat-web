import { useState, useRef, useEffect, FC, ReactElement } from "react";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import ImagePreviewModal from "../../../common/component/ImagePreviewModal";
import Send from "../../../common/component/Send";
import Styled from "./styled";
import Operations from "./Operations";
import useUploadFile from "../../../common/hook/useUploadFile";
import { ChatPrefixes } from "../../../app/config";
import { useAppSelector } from "../../../app/store";
import LoginTip from "./LoginTip";
import useLicense from "../../../common/hook/useLicense";
import LicenseUpgradeTip from "./LicenseOutdatedTip";

interface Props {
  readonly?: boolean;
  children: ReactElement;
  header: ReactElement;
  aside?: ReactElement | null;
  users?: ReactElement | null;
  dropFiles?: File[];
  context: "channel" | "user";
  to: number;
}

const Layout: FC<Props> = ({
  readonly = false,
  children,
  header,
  aside = null,
  users = null,
  dropFiles = [],
  context = "channel",
  to
}) => {
  const { reachLimit } = useLicense();
  const { addStageFile } = useUploadFile({ context, id: to });
  const messagesContainer = useRef<HTMLDivElement>(null);
  const [previewImage, setPreviewImage] = useState(null);
  const { selects, channelsData, usersData } = useAppSelector((store) => {
    return {
      selects: store.ui.selectMessages[`${context}_${to}`],
      channelsData: store.channels.byId,
      usersData: store.users.byId
    };
  });
  const [{ isActive }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop({ files }) {
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
        isActive: monitor.canDrop() && monitor.isOver()
      })
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
    const container = messagesContainer?.current;
    if (!container) return;
    // 点击查看大图
    container.addEventListener(
      "click",
      (evt) => {
        const target = evt.target as HTMLImageElement;
        if (!target) return;
        if (target.nodeName == "IMG" && target.classList.contains("preview")) {
          const thumbnail = target.src;
          const originUrl = target.dataset.origin || target.src;
          const downloadLink = target.dataset.download || target.src;
          const meta = JSON.parse(target.dataset.meta || "{}");
          setPreviewImage({ thumbnail, originUrl, downloadLink, ...meta });
        }
      },
      true
    );
  }, []);
  const name = context == "channel" ? channelsData[to]?.name : usersData[to]?.name;

  return (
    <>
      {previewImage && <ImagePreviewModal data={previewImage} closeModal={closePreviewModal} />}
      <Styled ref={drop} className={`${readonly ? "readonly" : ""}`}>
        {header}
        <main className="main" ref={messagesContainer}>
          <div className="chat">
            {children}
            <div className={`send ${selects ? "selecting" : ""}`}>
              {readonly ? (
                <LoginTip />
              ) : reachLimit ? (
                <LicenseUpgradeTip />
              ) : (
                <Send key={to} id={to} context={context} />
              )}
              {selects && <Operations context={context} id={to} />}
            </div>
          </div>
          {users && <div className="members">{users}</div>}
          {aside && <div className="aside">{aside}</div>}
        </main>
        {!readonly && (
          <div
            className={`drag_tip ${isActive ? "visible animate__animated animate__fadeIn" : ""}`}
          >
            <div className={`box ${isActive ? "animate__animated animate__bounceIn" : ""}`}>
              <div className="inner">
                <h4 className="head">{`Send to ${ChatPrefixes[context]}${name}`}</h4>
                <span className="intro">Photos accept jpg, png, max size limit to 10M.</span>
              </div>
            </div>
          </div>
        )}
      </Styled>
    </>
  );
};

export default Layout;
