import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import ManageMembers from "@/components/ManageMembers";
import AutoDeleteMessages from "../../components/AutoDeleteMessages";
import Overview from "./Overview";

export interface NavItem {
  name: string;
  title: string;
  link?: string;
  component: ReactNode;
}

export interface Nav {
  name?: string;
  title: string;
  items: NavItem[];
}

const useNavs = (cid: number): Nav[] => {
  const { t } = useTranslation("setting");
  return [
    {
      title: t("nav.general"),
      items: [
        {
          name: "overview",
          title: t("nav.overview"),
          component: <Overview id={cid} />
        },
        {
          name: "auto_delete_msg",
          title: t("nav.auto_delete_msg"),
          component: <AutoDeleteMessages id={cid} />
        },
        {
          name: "members",
          title: t("nav.members"),
          component: <ManageMembers cid={cid} />
        }
      ]
    }
  ];
};

export default useNavs;
