import { memo } from "react";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "../../app/store";
import { useWidget } from "../WidgetContext";
import Login from "./Login";
import { shallowEqual } from "react-redux";

type Props = {
  needLogin?: boolean;
};
const Index = ({ needLogin = false }: Props) => {
  const { welcome } = useWidget();
  const logo = useAppSelector((store) => store.server.logo, shallowEqual);
  const { t } = useTranslation("widget");
  // console.log("logooo", logo);
  return (
    <>
      <div className="group relative flex justify-start items-start mb-3">
        <div className="w-9 h-9 absolute top-0 left-3">
          {logo && <img src={logo} alt="logo" className="rounded-full bg-transparent w-9 h-9" />}
        </div>
        <div className="pl-14">
          <div
            className="rounded-lg"
            style={{ maxWidth: "min(((100vw - 56px) - 20px) - 64px, 360px)" }}
          >
            <div
              dangerouslySetInnerHTML={{ __html: welcome || t("welcome") }}
              className="text-md text-gray-900 dark:text-gray-100 px-3 py-1.5 bg-gray-100 dark:bg-gray-900 rounded-lg mb-1.5"
            ></div>
          </div>
        </div>
      </div>
      {needLogin && (
        <div className="pl-14 pr-5 animate-[fadeInUp_.5s_ease-in-out_both]">
          <Login />
        </div>
      )}
    </>
  );
};

export default memo(Index);
