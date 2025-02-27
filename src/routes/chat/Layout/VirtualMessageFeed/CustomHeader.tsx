import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import { Waveform } from "@uiball/loaders";
import clsx from "clsx";

import { useAppSelector } from "@/app/store";
import EditIcon from "@/assets/icons/edit.svg";
import { shallowEqual } from "react-redux";
import linkifyStr from "linkify-string";

type ChannelHeaderProps = {
  cid: number;
};
const ChannelHeader = ({ cid }: ChannelHeaderProps) => {
  const { pathname } = useLocation();
  const { t } = useTranslation("chat");
  const isAdmin = useAppSelector((store) => store.authData.user?.is_admin, shallowEqual);
  const data = useAppSelector((store) => store.channels.byId[cid], shallowEqual);
  const desc = data.description
    ? linkifyStr(data.description, { target: "_blank" })
    : t("welcome_desc", { name: data?.name });
  return (
    <div className="pt-14 px-1 md:px-0 flex flex-col items-start gap-2">
      <h2 className="font-bold text-4xl dark:text-white">
        {t("welcome_channel", { name: data?.name })}
      </h2>
      <p
        className="text-gray-600 dark:text-gray-300 [&>a]:text-blue-500 [&>a]:hover:underline"
        dangerouslySetInnerHTML={{ __html: desc }}
      />
      {isAdmin && (
        <NavLink
          to={`/setting/channel/${cid}/overview?f=${pathname}`}
          className="flex items-center gap-1 bg-clip-text text-fill-transparent bg-gradient-to-r from-blue-500 to-primary-400 "
        >
          <EditIcon className="w-4 h-4 fill-blue-500" />
          {t("edit_channel")}
        </NavLink>
      )}
    </div>
  );
};

type Props = {
  context?: {
    id: number;
    isChannel: boolean;
    loadingMore: boolean;
  };
};
const CustomHeader = ({ context }: Props) => {
  if (!context) return null;
  const { id, isChannel, loadingMore } = context;
  return (
    <>
      {isChannel ? <ChannelHeader cid={id} /> : null}
      <div className={clsx("mt-2 w-full py-2 ", loadingMore ? "flex-center" : "hidden")}>
        <Waveform size={18} lineWeight={4} speed={1} color="#ccc" />
      </div>
    </>
  );
};

export default CustomHeader;
