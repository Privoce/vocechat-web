import MyAccount from "./MyAccount";
import Overview from "./Overview";
import Logins from "./config/Logins";
import ConfigFirebase from "./config/Firebase";
import ConfigSMTP from "./config/SMTP";
import APIConfig from "./APIConfig";
import License from "./License/License";
import Widget from "./Widget";
import BotConfig from "./BotConfig";
import APIDocument from "./APIDocument";
import ManageMembers from "../../common/component/ManageMembers";
import Version from "../../common/component/Version";
// import ConfigAgora from "./config/Agora";
import { useAppSelector } from "../../app/store";
import { useTranslation } from "react-i18next";

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
        component: <BotConfig />,
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
      },
      {
        name: "terms",
        component: "Terms & Privacy"
      },
      {
        name: "feedback",
        component: <ul className="flex flex-col gap-2 text-lg">
          <li>Email: <strong className="font-bold">han@privoce.com</strong></li>
          <li>Wechat: <strong className="font-bold">Privoce</strong></li>
          <li>Github:&nbsp;
            <strong className="font-bold">
              <a className="text-[#06b6d4] underline underline-offset-2" href="https://github.com/Privoce/vocechat-web/issues" target="_blank" rel="noopener noreferrer">vocechat-web/issues</a>
            </strong>
          </li>
        </ul>
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
