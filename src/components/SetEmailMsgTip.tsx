import { FC, useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

// import { KEY_SET_EMAIL_MSG_TIP } from "@/app/config";
import Button from "./styled/Button";
import { useGetIfInChinaQuery } from "@/app/services/server";
import { useAppSelector } from "@/app/store";

interface ContainerProps {
  id: string;
}
const Container = (props: ContainerProps) => {
  const { id } = props;
  const { t } = useTranslation();
  const handleUpgrade = () => {
    // localStorage.removeItem(KEY_SET_EMAIL_MSG_TIP);
    toast.dismiss(id);
    location.href = "/#/setting/license";
  };
  const handleClose = () => {
    // localStorage.removeItem(KEY_SET_EMAIL_MSG_TIP);
    toast.dismiss(id);
  };
  return (
    <div className="flex flex-col md:flex-row items-center gap-2 whitespace-nowrap">
      <div>{t("tip.email_msg_tip")}</div>
      <div className="flex gap-1">
        <Button className="mini main" onClick={handleUpgrade}>
          {t("action.upgrade")}
        </Button>
        <Button className="mini cancel" onClick={handleClose}>
          {t("action.dismiss")}
        </Button>
      </div>
    </div>
  );
};
// 免费用户，admin，特定版本，在国内，提醒
interface Props {}
const Index: FC<Props> = () => {
  const isAdmin = useAppSelector((store) => store.authData.user?.is_admin);
  const isUpgraded = useAppSelector((store) => store.server.upgraded);
  const { data: isInChina } = useGetIfInChinaQuery();
  // const [visible, setVisible] = useState(false);
  // useEffect(() => {
  //   setVisible(!!localStorage.getItem(KEY_SET_EMAIL_MSG_TIP));
  // }, []);
  const showToast = isAdmin && isInChina && !isUpgraded;
  useEffect(() => {
    if (showToast) {
      toast((t) => <Container id={t.id} />, {
        duration: Infinity,
        position: "top-right"
      });
    }
  }, [showToast]);

  return null;
};

export default Index;
