import { useTranslation } from "react-i18next";

import { useAppSelector } from "@/app/store";
import ManageMembers from "@/components/ManageMembers";
import Version from "@/components/Version";
import APIConfig from "./APIConfig";
import APIDocument from "./APIDocument";
import BotConfig from "./BotConfig";
import ConfigAgora from "./config/Agora";
import ConfigFirebase from "./config/Firebase";
import Logins from "./config/Logins";
import ConfigSMTP from "./config/SMTP";
import DataManagement from "./DataManagement";
import License from "./License";
import MyAccount from "./MyAccount";
import Overview from "./Overview";
import Widget from "./Widget";
import { shallowEqual } from "react-redux";
import { ConfigVocespace } from "./config/Vocespace";

const dataManagementNav = {
  name: "data_management",
  component: <DataManagement />,
  admin: true,
};
const navs = [
  {
    name: "general",
    items: [
      {
        name: "overview",
        component: <Overview />,
      },
      {
        name: "my_account",
        component: <MyAccount />,
      },
      {
        name: "members",
        component: <ManageMembers />,
        admin: true,
      },
    ],
  },
  {
    name: "config",
    items: [
      {
        name: "bot",
        component: <BotConfig />,
        admin: true,
      },
      {
        name: "firebase",
        component: <ConfigFirebase />,
      },
      {
        name: "video",
        component: <ConfigAgora />,
      },
      {
        name: "smtp",
        component: <ConfigSMTP />,
      },
      {
        name: "login_method",
        component: <Logins />,
      },
      {
        name: "third_app",
        component: <APIConfig />,
      },
      {
        name: "widget",
        component: <Widget />,
      },
      {
        name: "license",
        component: <License />,
      },
    ],
    admin: true,
  },
  {
    name: "about",
    items: [
      {
        name: "api_doc",
        component: <APIDocument />,
        admin: true,
      },
      {
        name: "version",
        component: <Version />,
      },
    ],
  },
];

const useNavs = () => {
  const { t } = useTranslation("setting");
  const loginUser = useAppSelector((store) => store.authData.user, shallowEqual);
  const upgraded = useAppSelector((store) => store.server.upgraded, shallowEqual);
  const filteredNavs = loginUser?.is_admin
    ? navs
    : navs
        .filter((nav) => {
          return !nav.admin;
        })
        .map((nav) => {
          const { name, items, ...rest } = nav;
          return {
            name,
            items: items.filter((item) => {
              return !item.admin;
            }),
            ...rest,
          };
        });
  if (
    loginUser?.uid == 1 &&
    !filteredNavs[0].items.some((item) => item.name == "data_management")
  ) {
    // super admin
    filteredNavs[0].items.push(dataManagementNav);
  }
  const transformedNavs = filteredNavs.map((n) => {
    const { name, items, ...rest } = n;
    return {
      name,
      // @ts-ignore
      title: t(`nav.${name}`),
      items: items.map((item) => {
        const { name, ...rest } = item;
        return {
          name,
          // @ts-ignore
          title: t(`nav.${name}`),
          ...rest,
        };
      }),
      ...rest,
    };
  });
  return transformedNavs.filter((nav) => {
    if (loginUser?.is_admin) {
      return true;
    } else {
      // about 特殊处理下
      // if (nav.name == "about") {
      //   // 有付费，但是普通用户，则不显示 about
      //   return !upgraded;
      // } else {
      return !nav.admin;
      // }
    }
  });
};

export default useNavs;
