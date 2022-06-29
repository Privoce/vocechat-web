import Overview from "./Overview";
import ManageMembers from "../../common/component/ManageMembers";
import { ReactNode } from "react";

export interface NavItem {
  name: string;
  title: string;
  component: ReactNode;
}

export interface Nav {
  name?: string;
  title: string;
  items: NavItem[];
}

const useNavs = (cid: number): Nav[] => {
  return [
    {
      title: "General",
      items: [
        {
          name: "overview",
          title: "Overview",
          component: <Overview id={cid} />
        },
        {
          name: "members",
          title: "Members",
          component: <ManageMembers cid={cid} />
        }
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
      ]
    }
    // {
    //   title: "User Management",
    //   items: [

    //   ],
    // },
  ];
};

export default useNavs;
