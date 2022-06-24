import MyAccount from "./MyAccount";
import Overview from "./Overview";
import Logins from "./config/Logins";
import ConfigFirebase from "./config/Firebase";
import ConfigSMTP from "./config/SMTP";
import APIConfig from "./APIConfig";
import ManageMembers from "../../common/component/ManageMembers";
import FAQ from "../../common/component/FAQ";
import ConfigAgora from "./config/Agora";
import { useAppSelector } from "../../app/store";

const navs = [
  {
    title: "General",
    items: [
      {
        name: "overview",
        title: "Overview",
        component: <Overview />
      },
      {
        name: "members",
        title: "Members",
        component: <ManageMembers />,
        admin: true
      }
      // {
      //   name: "notification",
      //   title: "Notification",
      //   component: <Notifications />,
      // },
    ]
  },
  {
    title: "User",
    items: [
      {
        name: "my_account",
        title: "My Account",
        component: <MyAccount />
      }
    ]
  },
  {
    title: "Configuration",
    items: [
      {
        name: "firebase",
        title: "Firebase",
        component: <ConfigFirebase />
      },
      {
        name: "agora",
        title: "Agora",
        component: <ConfigAgora />
      },
      {
        name: "smtp",
        title: "SMTP",
        component: <ConfigSMTP />
      },
      {
        name: "social_login",
        title: "Login Methods",
        component: <Logins />
      },
      {
        name: "api",
        title: "Third-party APP",
        component: <APIConfig />
      }
    ],
    admin: true
  },
  {
    title: "About",
    items: [
      {
        name: "faq",
        title: "FAQ",
        component: <FAQ />
      },
      {
        name: "terms",
        title: "Terms & Privacy",
        component: "Terms & Privacy"
      },
      {
        name: "feedback",
        title: "Feedback",
        component: "feedback"
      }
    ]
  }
];

const useNavs = () => {
  const loginUser = useAppSelector((store) => {
    return store.contacts.byId[store.authData.uid];
  });
  return navs.filter((nav) => {
    if (loginUser?.is_admin) {
      return true;
    } else {
      return !nav.admin;
    }
  });
};

export default useNavs;
