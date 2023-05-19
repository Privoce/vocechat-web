import { useTranslation } from "react-i18next";

import { useAppSelector } from "@/app/store";
import ManageMembers from "@/components/ManageMembers";
import ServerVersionChecker from "@/components/ServerVersionChecker";
import Version from "@/components/Version";
import APIConfig from "./APIConfig";
import APIDocument from "./APIDocument";
import BotConfig from "./BotConfig";
import ConfigAgora from "./config/Agora";
import ConfigFirebase from "./config/Firebase";
import Logins from "./config/Logins";
import ConfigSMTP from "./config/SMTP";
import License from "./License";
import MyAccount from "./MyAccount";
import Overview from "./Overview";
import Widget from "./Widget";

const navs = [
  {
    name: "general",
    items: [
      {
        name: "overview",
        component: <Overview />
      },
      {
        name: "my_account",
        component: <MyAccount />
      },
      {
        name: "members",
        component: <ManageMembers />,
        admin: true
      }
    ]
  },
  {
    name: "config",
    items: [
      {
        name: "bot",
        component: (
          <ServerVersionChecker version="0.3.2">
            <BotConfig />
          </ServerVersionChecker>
        ),
        admin: true
      },
      {
        name: "firebase",
        component: <ConfigFirebase />
      },
      {
        name: "agora",
        component: (
          <ServerVersionChecker version="0.3.5">
            <ConfigAgora />
          </ServerVersionChecker>
        )
      },
      {
        name: "smtp",
        component: <ConfigSMTP />
      },
      {
        name: "login_method",
        component: <Logins />
      },
      {
        name: "third_app",
        component: <APIConfig />
      },
      {
        name: "widget",
        component: <Widget />
      },
      {
        name: "license",
        component: <License />
      }
    ],
    admin: true
  },
  {
    name: "about",
    items: [
      {
        name: "api_doc",
        component: <APIDocument />
      },
      {
        name: "version",
        component: <Version />
      }
    ]
  }
];

const useNavs = () => {
  const { t } = useTranslation("setting");
  const { loginUser, upgraded } = useAppSelector((store) => {
    return { loginUser: store.authData.user, upgraded: store.server.upgraded };
  });
  const transformedNavs = navs.map((n) => {
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
          ...rest
        };
      }),
      ...rest
    };
  });
  return transformedNavs.filter((nav) => {
    if (loginUser?.is_admin) {
      return true;
    } else {
      // about 特殊处理下
      if (nav.name == "about") {
        // 有付费，但是普通用户，则不显示about
        return !upgraded;
      } else {
        return !nav.admin;
      }
    }
  });
};

export default useNavs;
