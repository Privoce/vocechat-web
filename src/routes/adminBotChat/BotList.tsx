import { FC } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

import Avatar from "@/components/Avatar";
import IconBotBadge from "@/assets/icons/bot.svg";
import { useListBotsQuery } from "@/app/services/adminBotChat";

type Props = {
  activeBotUid?: number;
};

const BotList: FC<Props> = ({ activeBotUid }) => {
  const { t } = useTranslation();
  const { data: bots } = useListBotsQuery();

  if (!bots || bots.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-gray-400 px-4 text-center">
        {t("bot_chat.no_bots")}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 px-2 pt-3 pb-20 md:py-3 overflow-y-auto flex-1">
      {bots.map((bot) => (
        <NavLink
          key={bot.uid}
          to={`/admin-bot-chat/${bot.uid}`}
          className={({ isActive }) =>
            clsx(
              "rounded-md p-2 flex items-center gap-2 md:hover:bg-gray-500/10",
              (isActive || bot.uid === activeBotUid) && "bg-gray-500/10"
            )
          }
        >
          <div className="relative w-8 h-8 shrink-0">
            <Avatar
              className="w-8 h-8 rounded-full object-cover"
              width={32}
              height={32}
              src={(bot as any).avatar}
              name={bot.name}
            />
            <div className="absolute -bottom-[2.5px] -right-[2.5px] border-content rounded-full border-[1px] border-white dark:border-gray-300">
              <IconBotBadge className="w-3 h-3" />
            </div>
          </div>
          <span className="text-sm font-semibold text-gray-600 dark:text-white truncate">
            {bot.name}
          </span>
        </NavLink>
      ))}
    </div>
  );
};

export default BotList;
