import { useTranslation } from "react-i18next";
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
import ServerVersionChecker from "../../common/component/ServerVersionChecker";
import useLicense from "../../common/hook/useLicense";

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
      },
    ]
  },
  {
    name: "config",
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
    name: "about",
    items: [
      {
        name: "api_doc",
        component: <APIDocument />
      },
      {
        name: "version",
        component: <Version />
      },
      {
        name: "faq",
        link: "https://doc.voce.chat/faq",
      },
      {
        name: "feedback",
        link: `https://privoce.voce.chat/widget?from=${encodeURIComponent(location.host)}`,
      },
    ]
  }
];

const useNavs = () => {
  const { upgraded } = useLicense();
  const { t } = useTranslation("setting");
  const loginUser = useAppSelector((store) => {
    return store.authData.user;
  });
  const transformedNavs = navs.map(n => {
    const { name, items, ...rest } = n;
    return {
      name,
      // @ts-ignore
      title: t(`nav.${name}`),
      items: items.map(item => {
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
