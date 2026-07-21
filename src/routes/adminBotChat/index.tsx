import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import clsx from "clsx";

import { ADMIN_BOT_CHAT_VIEWER_MIN_VERSION } from "@/app/config";
import GoBackNav from "@/components/GoBackNav";
import ServerVersionChecker from "@/components/ServerVersionChecker";
import AdminMessageThread from "./AdminMessageThread";
import BotList from "./BotList";
import ConversationList from "./ConversationList";

function AdminBotChatPage() {
  const { t } = useTranslation();
  const { bot_uid, kind, target_id } = useParams();

  const botUid = bot_uid ? +bot_uid : undefined;
  const hasConversation = kind === "user" || kind === "group";
  const isBotSelected = !!botUid;

  const conversationTarget =
    hasConversation && target_id
      ? kind === "user"
        ? { uid: +target_id }
        : { gid: +target_id }
      : undefined;

  return (
    <ServerVersionChecker version={ADMIN_BOT_CHAT_VIEWER_MIN_VERSION}>
      <div className={clsx("flex h-screen md:h-full md:pt-2 md:pb-2.5 md:pr-12")}>
        <div
          className={clsx(
            "md:rounded-l-2xl bg-white dark:bg-gray-800 relative flex flex-col w-full md:w-[200px] md:min-w-[200px] shadow-[inset_-1px_0px_0px_rgba(0,_0,_0,_0.1)]",
            isBotSelected && "hidden md:flex"
          )}
        >
          <div className="px-4 py-3 font-semibold text-sm text-gray-600 dark:text-white shadow-[inset_0_-1px_0_rgb(0_0_0_/_10%)]">
            {t("bot_chat_viewer")}
          </div>
          <BotList activeBotUid={botUid} />
        </div>
        <div
          className={clsx(
            "bg-white dark:bg-gray-800 relative flex-col w-full md:w-[268px] md:min-w-[268px] shadow-[inset_-1px_0px_0px_rgba(0,_0,_0,_0.1)]",
            isBotSelected ? "flex" : "hidden md:flex",
            hasConversation && "hidden md:flex"
          )}
        >
          {isBotSelected ? (
            <>
              <div className="px-4 py-3 relative flex items-center justify-center">
                <GoBackNav path="/admin-bot-chat" />
                <span className="font-semibold text-sm text-gray-600 dark:text-white">
                  {t("bot_chat.select_a_conversation")}
                </span>
              </div>
              <ConversationList botUid={botUid!} />
            </>
          ) : null}
        </div>
        <div
          className={clsx(
            "md:rounded-r-2xl bg-white w-full relative flex-col items-start dark:bg-gray-700",
            hasConversation ? "flex" : "hidden md:flex",
            !hasConversation && "items-center justify-center h-full"
          )}
        >
          {conversationTarget ? (
            <AdminMessageThread botUid={botUid!} target={conversationTarget} />
          ) : (
            <div className="flex-1 flex items-center justify-center text-sm text-gray-400 px-4 text-center">
              {isBotSelected ? t("bot_chat.select_a_conversation") : t("bot_chat.select_a_bot")}
            </div>
          )}
        </div>
      </div>
    </ServerVersionChecker>
  );
}

export default memo(AdminBotChatPage);
