import Overview from "./Overview";
import ManageMembers from "../ManageMembers";
import { useSelector } from "react-redux";
const useNavs = (channelId) => {
  const { channels, contactIds } = useSelector((store) => {
    return {
      channels: store.channels.byId,
      contactIds: store.contacts.ids,
    };
  });
  let ids = channels[channelId]?.members ?? [];
  ids = ids.length == 0 ? contactIds : ids;
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
          name: "permissions",
          title: "Permissions",
        },
        {
          name: "invites",
          title: "Invites",
        },
        {
          name: "integrations",
          title: "Integrations",
        },
      ],
    },
    {
      title: "User Management",
      items: [
        {
          name: "members",
          title: "Members",
          component: <ManageMembers members={ids} />,
        },
      ],
    },
  ];
  return navs;
};

export default useNavs;
