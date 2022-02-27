import Overview from "./Overview";
import ManageMembers from "../ManageMembers";
import { useSelector } from "react-redux";
const useNavs = (channelId) => {
  const { channels, contacts } = useSelector((store) => {
    return {
      channels: store.channels,
      contacts: store.contacts,
    };
  });
  const ids = channels[channelId]?.members || [];
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
          component: (
            <ManageMembers
              members={
                ids.length == 0
                  ? contacts
                  : contacts.filter((c) => ids.includes(c.uid))
              }
            />
          ),
        },
      ],
    },
  ];
  return navs;
};

export default useNavs;
