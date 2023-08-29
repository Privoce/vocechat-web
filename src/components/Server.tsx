import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import Tippy from "@tippyjs/react";

import { useAppSelector } from "@/app/store";
import IconAdd from "@/assets/icons/add.svg";
import AddEntriesMenu from "./AddEntriesMenu";
import Tooltip from "./Tooltip";
import { shallowEqual } from "react-redux";

type Props = {
  readonly?: boolean;
};
export default function Server({ readonly = false }: Props) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { name, description, logo } = useAppSelector((store) => store.server, shallowEqual);
  const userCount = useAppSelector((store) => store.users.ids.length, shallowEqual);
  // console.log("server info", server);
  if (readonly)
    return (
      <NavLink to={"/"} className="relative flex items-center justify-between gap-2 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8">
            <img
              alt={`${name} logo`}
              className="w-full h-full object-cover rounded-full"
              src={logo}
            />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm text-gray-600 dark:text-gray-100" title={description}>
              {name}
            </h3>
            <span className="text-xs text-gray-500">
              {userCount} {t("members")}
            </span>
          </div>
        </div>
      </NavLink>
    );

  return (
    <div className="relative flex items-center justify-between gap-2 px-4 py-2">
      <NavLink to={`/setting/overview?f=${pathname}`}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8">
            <img
              alt={`${name} logo`}
              className="w-full h-full object-cover rounded-full"
              src={logo}
            />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm text-gray-600 font-bold dark:text-gray-100" title={description}>
              {name}
            </h3>
            <span className="text-xs text-gray-500">
              {userCount} {t("members")}
            </span>
          </div>
        </div>
      </NavLink>

      <Tooltip tip={t("more")} placement="bottom">
        <Tippy interactive placement="bottom-end" trigger="click" content={<AddEntriesMenu />}>
          <IconAdd className="dark:fill-gray-400" role="button" />
        </Tippy>
      </Tooltip>
    </div>
  );
}
