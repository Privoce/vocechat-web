import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useParams } from "react-router-dom";
import { shallowEqual } from "react-redux";
import clsx from "clsx";
import dayjs from "dayjs";

import { useAppSelector } from "@/app/store";
import { useListBotConversationsQuery } from "@/app/services/adminBotChat";
import { useLazyGetChannelQuery } from "@/app/services/channel";
import Avatar from "@/components/Avatar";

type Props = {
  botUid: number;
};

const ConversationRow: FC<{ botUid: number; target: { uid?: number; gid?: number }; lastCreatedAt: number }> = ({
  botUid,
  target,
  lastCreatedAt,
}) => {
  const { target_id: activeTargetId, kind: activeKind } = useParams();
  const isUser = "uid" in target;
  const uid = isUser ? target.uid! : undefined;
  const gid = !isUser ? target.gid! : undefined;

  const user = useAppSelector((store) => (uid ? store.users.byId[uid] : undefined), shallowEqual);
  const channel = useAppSelector((store) => (gid ? store.channels.byId[gid] : undefined), shallowEqual);
  const [fetchChannel] = useLazyGetChannelQuery();

  useEffect(() => {
    if (gid && !channel) {
      fetchChannel(gid);
    }
  }, [gid, channel]);

  const name = isUser ? user?.name || `User ${uid}` : channel?.name || `Group ${gid}`;
  const to = isUser ? `/admin-bot-chat/${botUid}/user/${uid}` : `/admin-bot-chat/${botUid}/group/${gid}`;
  const isActive = isUser
    ? activeKind === "user" && +(activeTargetId || 0) === uid
    : activeKind === "group" && +(activeTargetId || 0) === gid;

  return (
    <NavLink
      to={to}
      className={clsx(
        "rounded-md p-2 flex items-center gap-2 md:hover:bg-gray-500/10",
        isActive && "bg-gray-500/10"
      )}
    >
      <Avatar
        className="w-8 h-8 rounded-full object-cover shrink-0"
        width={32}
        height={32}
        src={isUser ? (user as any)?.avatar : (channel as any)?.icon}
        name={name}
        type={isUser ? "user" : "channel"}
      />
      <div className="flex-1 min-w-0 flex flex-col">
        <span className="text-sm font-semibold text-gray-600 dark:text-white truncate">{name}</span>
        <span className="text-xs text-gray-400">{dayjs(lastCreatedAt).format("YYYY-MM-DD HH:mm")}</span>
      </div>
    </NavLink>
  );
};

const ConversationList: FC<Props> = ({ botUid }) => {
  const { t } = useTranslation();
  const { data } = useListBotConversationsQuery({ botUid });

  const conversations = data?.conversations || [];

  if (conversations.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-gray-400 px-4 text-center">
        {t("bot_chat.no_conversations")}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 px-2 pt-3 pb-20 md:py-3 overflow-y-auto flex-1">
      {conversations.map((conv, idx) => (
        <ConversationRow
          key={idx}
          botUid={botUid}
          target={conv.target as any}
          lastCreatedAt={conv.last_created_at}
        />
      ))}
    </div>
  );
};

export default ConversationList;
