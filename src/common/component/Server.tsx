import { NavLink, useLocation } from "react-router-dom";
import Tippy from "@tippyjs/react";
import addIcon from "../../assets/icons/add.svg?url";
import Tooltip from "./Tooltip";
import AddEntriesMenu from "./AddEntriesMenu";
import { useAppSelector } from "../../app/store";
import { useTranslation } from "react-i18next";

type Props = {
  readonly?: boolean;
};
export default function Server({ readonly = false }: Props) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { server, userCount } = useAppSelector((store) => {
    return {
      userCount: store.users.ids.length,
      server: store.server
    };
  });
  // console.log("server info", server);
  const { name, description, logo } = server;
  if (readonly)
    return (
      <div className="relative flex items-center justify-between gap-2 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8">
            <img alt={`${name} logo`} className="w-full h-full object-cover rounded-full" src={logo} />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm text-gray-600 dark:text-gray-100" title={description}>
              {name}
            </h3>
            <span className="text-xs text-gray-500">{userCount} {t("members")}</span>
          </div>
        </div>
      </div>
    );

  return (
    <div className="relative flex items-center justify-between gap-2 px-4 py-2">
      <NavLink to={`/setting?f=${pathname}`}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8">
            <img alt={`${name} logo`} className="w-full h-full object-cover rounded-full" src={logo} />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm text-gray-600 font-bold dark:text-gray-100" title={description}>
              {name}
            </h3>
            <span className="text-xs text-gray-500">{userCount} {t("members")}</span>
          </div>
        </div>
      </NavLink>

      <Tooltip tip={t("more")} placement="bottom">
        <Tippy interactive placement="bottom-end" trigger="click" content={<AddEntriesMenu />}>
          <img src={addIcon} alt="add icon" className="cursor-pointer" />
        </Tippy>
      </Tooltip>
    </div>
  );
}
