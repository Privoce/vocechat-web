import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useStreaming from "../hook/useStreaming";
// import clsx from "clsx";
import Button from "./styled/Button";

interface Props {
}

const InactiveScreen: FC<Props> = () => {
  const { t } = useTranslation();
  const { stopStreaming } = useStreaming();
  // const [reloadVisible, setReloadVisible] = useState(false);
  useEffect(() => {
    stopStreaming();
    const currTitle = document.title;
    document.title = `[INACTIVE] ${currTitle}`;
    return () => {
      document.title = currTitle;
    };
  }, []);
  const handleReload = () => {
    location.reload();
  };
  return (
    <div className="w-screen h-screen flex-center text-4xl font-bold">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold">{t("inactive.title")}</h1>
        <p className="text-gray-400 text-base font-semibold" >{t("inactive.desc")}</p>
        <Button className="mt-4 uppercase" onClick={handleReload}>{t("action.reload")}</Button>
      </div>

    </div>
  );
};

export default InactiveScreen;
