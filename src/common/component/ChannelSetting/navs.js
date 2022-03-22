import Overview from "./Overview";
import ManageMembers from "../ManageMembers";
const useNavs = (channelId) => {
  const navs = [
    {
      title: "General",
      items: [
        {
          name: "overview",
          title: "Overview",
          component: <Overview id={channelId} />,
        },
        {
          name: "members",
          title: "Members",
          component: <ManageMembers cid={channelId} />,
        },
        // {
        //   name: "permissions",
        //   title: "Permissions",
        // },
        // {
        //   name: "invites",
        //   title: "Invites",
        // },
        // {
        //   name: "integrations",
        //   title: "Integrations",
        // },
      ],
    },
    // {
    //   title: "User Management",
    //   items: [

    //   ],
    // },
  ];
  return navs;
};

export default useNavs;
