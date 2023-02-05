import { FC, useState, useEffect } from "react";
import clsx from "clsx";
import { Ring } from "@uiball/loaders";
import Button from "./styled/Button";
import useLogout from "../hook/useLogout";

interface Props {
  reload?: boolean;
  fullscreen?: boolean;
}

const Loading: FC<Props> = ({ reload = false, fullscreen = false }) => {
  const [reloadVisible, setReloadVisible] = useState(false);
  const { clearLocalData } = useLogout();
  const handleReload = () => {
    clearLocalData();
    location.reload();
  };
  useEffect(() => {
    let inter = 0;
    if (reload) {
      inter = window.setTimeout(() => {
        setReloadVisible(true);
      }, 30 * 1000);

    }
    return () => {
      clearTimeout(inter);
    };
  }, [reload]);

  return (
    <div className={clsx("w-full h-full flex-center flex-col gap-4 dark:bg-gray-800/80", fullscreen ? "w-screen h-screen" : "")}>
      <Ring size={40} lineWeight={5} speed={2} color="black" />
      <Button className={clsx(`danger`, reloadVisible ? "visible" : "invisible")} onClick={handleReload}>
        Reload
      </Button>
    </div>
  );
};

export default Loading;
