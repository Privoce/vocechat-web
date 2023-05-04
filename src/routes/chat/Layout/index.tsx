import { useRef, useEffect, FC, ReactElement } from "react";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import clsx from "clsx";
import { toast } from "react-hot-toast";


import Send from "../../../common/component/Send";
import Operations from "./Operations";
import useUploadFile from "../../../common/hook/useUploadFile";
import { useAppSelector } from "../../../app/store";
import LoginTip from "./LoginTip";
import useLicense from "../../../common/hook/useLicense";
import LicenseUpgradeTip from "./LicenseOutdatedTip";
import DnDTip from "./DnDTip";
import IconWarning from '../../../assets/icons/warning.svg';
import ImagePreview from "../../../common/component/ImagePreview";

import VirtualMessageFeed from "./VirtualMessageFeed";

interface Props {
  readonly?: boolean;
  header: ReactElement;
  aside?: ReactElement | null;
  users?: ReactElement | null;
  voice?: ReactElement | null;
  dropFiles?: File[];
  context: "channel" | "user";
  to: number;
}

const Layout: FC<Props> = ({
  readonly = false,
  header,
  aside = null,
  users = null,
  voice = null,
  dropFiles = [],
  context = "channel",
  to
}) => {
  // const { t } = useTranslation('chat');
  const { reachLimit } = useLicense();
  const { addStageFile } = useUploadFile({ context, id: to });
  const messagesContainer = useRef<HTMLDivElement>(null);

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
  const name = context == "channel" ? channelsData[to]?.name : usersData[to]?.name;
  return (
    <>
      <ImagePreview container={messagesContainer.current} />
      <section ref={drop} className={`relative h-full w-full rounded-r-2xl flex`}>
        <main className="flex flex-col flex-1">
          {header}
          <div className="w-full h-full flex items-start justify-between relative" >
            <div className="rounded-br-2xl flex flex-col absolute bottom-0 w-full h-full" ref={messagesContainer}>
              {/* 消息流 */}
              <VirtualMessageFeed key={`${context}_${to}`} context={context} id={to} />
              {/* 发送框 */}
              <div className={`px-2 py-0 md:p-4 ${selects ? "selecting" : ""}`}>
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
        {aside && <div className={clsx("flex z-50 p-3 absolute right-0 top-14 md:right-0 md:top-0 md:translate-x-full flex-col")}>
          {aside}
        </div>}
        {users && <div className="hidden md:block">{users}</div>}
        {voice && <div className="absolute right-11 top-14 h-fit overflow-y-scroll bg-white dark:!bg-gray-700 md:block">{voice}</div>}
        {!readonly && inputMode == "text" && isActive && (
          <DnDTip context={context} name={name} />
        )}
      </section >
    </>
  );
};

export default Layout;
