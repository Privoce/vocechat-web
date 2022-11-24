import { FC, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Trans, useTranslation } from "react-i18next";
import { KEY_MOBILE_APP_TIP } from "../../app/config";
import Button from "./styled/Button";

interface ContainerProps {
  id: string;
}
const Container = (props: ContainerProps) => {
  const { id } = props;
  const { t } = useTranslation();
  const handleOpen = () => {
    localStorage.removeItem(KEY_MOBILE_APP_TIP);
    toast.dismiss(id);
    window.open("https://voce.chat#download");
  };
  const handleClose = () => {
    localStorage.removeItem(KEY_MOBILE_APP_TIP);
    toast.dismiss(id);
  };
  return <div className="flex items-center gap-2 whitespace-nowrap">
    <div>
      <Trans i18nKey={"mobile_app"}>
        <strong className="font-bold" />
      </Trans>
    </div>
    <div className="flex gap-1">
      <Button className="mini main" onClick={handleOpen}>
        {t("action.open")}
      </Button>
      <Button className="mini cancel" onClick={handleClose}>
        {t("action.dismiss")}
      </Button>
    </div>
  </div>;
};
interface Props { }
const Index: FC<Props> = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(!!localStorage.getItem(KEY_MOBILE_APP_TIP));
  }, []);
  useEffect(() => {
    if (visible) {
      toast((t) => <Container id={t.id} />, {
        duration: Infinity,
        position: "top-right"
      });
    }
  }, [visible]);

  return null;
};

export default Index;
