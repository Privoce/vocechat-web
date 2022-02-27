import MyAccount from "./MyAccount";
import Overview from "./Overview";
import ManageMembers from "../ManageMembers";
const getNavs = (members = []) => {
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
          name: "security",
          title: "Security",
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
          component: <ManageMembers members={members} />,
        },
      ],
    },
  ];
  return navs;
};

export default getNavs;
