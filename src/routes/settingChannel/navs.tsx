import Overview from "./Overview";
import ManageMembers from "../../common/component/ManageMembers";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

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
          name: "members",
          title: t("nav.members"),
          component: <ManageMembers cid={cid} />
        }
      ]
    }
  ];
};

export default useNavs;
