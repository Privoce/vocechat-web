import { FC, ReactElement, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { ChatContext } from "@/types/common";
import useNormalizeMessage from "@/hooks/useNormalizeMessage";
import IconForward from "@/assets/icons/forward.svg";
import Avatar from "../Avatar";
import renderContent from "./renderContent";

type Props = {
  context: ChatContext;
  to: number;
  from_uid: number;
  id: string;
};
const ForwardedMessage: FC<Props> = ({ context, to, from_uid, id }) => {
  const { t } = useTranslation();
  const { messages, isLoading } = useNormalizeMessage(id);
  const [forwards, setForwards] = useState<ReactElement | null>(null);

  useEffect(() => {
    if (messages) {
      const forward_mids = messages.map(({ from_mid }) => from_mid) || [];
      // console.log("fff", messages);
      setForwards(
        <div
          data-forwarded-mids={forward_mids.join(",")}
          className="flex flex-col text-left rounded-lg bg-gray-200 dark:bg-gray-800"
        >
          <h4 className="p-2 pb-0 flex items-center gap-1 text-gray-500 text-xs">
            <IconForward className="w-4 h-4 fill-gray-500" />
            {t("action.forward")}
          </h4>
          <div className="list">
            {messages.map((msg, idx) => {
              const { user = {}, download, content, content_type, properties, thumbnail } = msg;
              return (
                <div
                  className="w-full relative flex items-start gap-4 px-2 py-1 my-2 rounded-lg"
                  key={idx}
                >
                  {user && (
                    <div className="w-6 h-6 rounded-full flex shrink-0 overflow-hidden">
                      <Avatar width={24} height={24} src={user.avatar} name={user.name} />
                    </div>
                  )}
                  <div className="w-full flex flex-col">
                    <div className="flex items-center gap-2 font-semibold">
                      <span className="text-gray-500 text-sm">{user?.name || "Deleted User"}</span>
                    </div>
                    <div className="select-text text-gray-500 text-sm break-all whitespace-pre-wrap dark:text-white">
                      {renderContent({
                        download,
                        context,
                        to,
                        from_uid,
                        content,
                        content_type,
                        properties,
                        thumbnail
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }, [messages, context, to, from_uid]);
  if (!id) return null;
  if (isLoading) return <span className="text-sm dark:text-white">Loading</span>;

  return forwards;
};

export default ForwardedMessage;
