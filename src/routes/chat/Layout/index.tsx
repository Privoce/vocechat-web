import { useState, useRef, useEffect, FC, ReactElement } from "react";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import clsx from "clsx";
import { toast } from "react-hot-toast";

import ImagePreviewModal from "../../../common/component/ImagePreviewModal";
import Send from "../../../common/component/Send";
import Operations from "./Operations";
import useUploadFile from "../../../common/hook/useUploadFile";
import { useAppSelector } from "../../../app/store";
import LoginTip from "./LoginTip";
import useLicense from "../../../common/hook/useLicense";
import LicenseUpgradeTip from "./LicenseOutdatedTip";
import DnDTip from "./DnDTip";
import IconWarning from '../../../assets/icons/warning.svg';

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
  // const { t } = useTranslation('chat');
  const { reachLimit } = useLicense();
  const { addStageFile } = useUploadFile({ context, id: to });
  const messagesContainer = useRef<HTMLDivElement>(null);
  const [previewImage, setPreviewImage] = useState(null);
  const { selects, channelsData, usersData, inputMode } = useAppSelector((store) => {
    return {
      inputMode: store.ui.inputMode,
      selects: store.ui.selectMessages[`${context}_${to}`],
      channelsData: store.channels.byId,
      usersData: store.users.byId
    };
  });
  const [{ isActive }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop({ files }) {
        // console.log("iii", inputMode);
        if (inputMode !== "text") {
          toast("DnD not allowed in this input mode", {
            icon: <IconWarning className="w-5 h-5" />,
          });
          return;
        };
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
    [context, to, inputMode]
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
      <section ref={drop} className={`relative h-full w-full rounded-r-2xl flex`}>
        <main className="flex flex-col flex-1">
          {header}
          <div className="w-full h-full flex items-start justify-between relative" ref={messagesContainer}>
            <div className="rounded-br-2xl flex flex-col absolute bottom-0 w-full h-full">
              {/* 消息流 */}
              <article id={`VOCECHAT_FEED_${context}_${to}`} className="w-full h-full px-1 md:px-4 py-4.5 overflow-x-hidden overflow-y-scroll">
                {children}
              </article>
              {/* 发送框 */}
              <div className={`px-2 py-0 md:p-4  ${selects ? "selecting" : ""}`}>
                {readonly ? (
                  <LoginTip />
                ) : reachLimit ? (
                  <LicenseUpgradeTip />
                ) : (
                  <div className={clsx(`flex justify-center`, selects && "hidden")}>
                    <Send key={to} id={to} context={context} />
                  </div>
                )}
                {selects && <Operations context={context} id={to} />}
              </div>
            </div>
          </div>
        </main>
        {aside && <div className={clsx("z-50 p-3 absolute right-0 top-0 translate-x-full flex-col hidden md:flex")}>{aside}</div>}
        {users && <div className="hidden md:block">{users}</div>}
        {!readonly && inputMode == "text" && isActive && (
          <DnDTip context={context} name={name} />
        )}
      </section>
    </>
  );
};

export default Layout;
