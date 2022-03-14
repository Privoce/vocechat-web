import MyAccount from "./MyAccount";
import Overview from "./Overview";
import ConfigFirebase from "./config/Firebase";
import ConfigSMTP from "./config/SMTP";
import Notifications from "./Notifications";
import ManageMembers from "../ManageMembers";
import ConfigAgora from "./config/Agora";
const useNavs = () => {
  const navs = [
    {
      title: "General",
      items: [
        {
          name: "overview",
          title: "Overview",
          component: <Overview />,
        },
        {
          name: "roles",
          title: "Roles",
        },
        {
          name: "notification",
          title: "Notification",
          component: <Notifications />,
        },
      ],
    },
    {
      title: "User",
      items: [
        {
          name: "my_account",
          title: "My Account",
          component: <MyAccount />,
        },
        {
          name: "auth_apps",
          title: "Authorized Apps",
        },
      ],
    },
    {
      title: "User Management",
      items: [
        {
          name: "members",
          title: "Members",
          component: <ManageMembers />,
        },
      ],
    },
    {
      title: "Configuration",
      items: [
        {
          name: "firebase",
          title: "Firebase",
          component: <ConfigFirebase />,
        },
        {
          name: "agora",
          title: "Agora",
          component: <ConfigAgora />,
        },
        {
          name: "smtp",
          title: "SMTP",
          component: <ConfigSMTP />,
        },
      ],
    },
  ];
  return navs;
};

export default useNavs;
