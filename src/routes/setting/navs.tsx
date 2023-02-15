import MyAccount from "./MyAccount";
import Overview from "./Overview";
import Logins from "./config/Logins";
import ConfigFirebase from "./config/Firebase";
import ConfigSMTP from "./config/SMTP";
import APIConfig from "./APIConfig";
import License from "./License";
import Widget from "./Widget";
import BotConfig from "./BotConfig";
import APIDocument from "./APIDocument";
import ManageMembers from "../../common/component/ManageMembers";
import Version from "../../common/component/Version";
// import ConfigAgora from "./config/Agora";
import { useAppSelector } from "../../app/store";
import { useTranslation } from "react-i18next";
import ServerVersionChecker from "../../common/component/ServerVersionChecker";

const navs = [
  {
    title: "general",
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
      },
    ]
  },
  {
    title: "config",
    items: [
      {
        name: "bot",
        component: <ServerVersionChecker version="0.3.2"><BotConfig /></ServerVersionChecker>,
        admin: true
      },
      {
        name: "firebase",
        component: <ConfigFirebase />
      },
      // {
      //   name: "agora",
      //   component: <ConfigAgora />
      // },
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
    title: "about",
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
  const loginUser = useAppSelector((store) => {
    return store.authData.user;
  });
  const transformedNavs = navs.map(n => {
    const { title, items, ...rest } = n;
    return {
      title: t(`nav.${title}`),
      items: items.map(item => {
        const { name, ...rest } = item;
        return {
          name,
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
      return !nav.admin;
    }
  });
};

export default useNavs;
