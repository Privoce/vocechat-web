import { FC, memo, useEffect, useState } from "react";
import { Ring } from "@uiball/loaders";
import clsx from "clsx";

import useLogout from "@/hooks/useLogout";
import Button from "./styled/Button";
import { reloadCurrentPage } from "@/utils";

interface Props {
  reload?: boolean;
  fullscreen?: boolean;
  context?: string;
  transparent?: boolean;
  error?: boolean;
}

const Loading: FC<Props> = ({
  transparent = false,
  reload = false,
  fullscreen = false,
  error = false,
  context = ""
}) => {
  const [reloadVisible, setReloadVisible] = useState(false);
  const { clearLocalData } = useLogout();
  const handleReload = () => {
    clearLocalData();
    reloadCurrentPage();
  };
  useEffect(() => {
    let inter = 0;
    if (window.AUTO_RELOAD) {
      const AUTO_RELOAD_KEY = "auto_reload_count";
      const count = Number(sessionStorage.getItem(AUTO_RELOAD_KEY) || "0");
      if (count < 3) {
        sessionStorage.setItem(AUTO_RELOAD_KEY, String(count + 1));
        inter = window.setTimeout(() => {
          location.reload();
        }, 5000);
      } else {
        setReloadVisible(true);
      }
    } else {
      sessionStorage.removeItem("auto_reload_count");
    }
    return () => {
      window.AUTO_RELOAD = false;
      clearTimeout(inter);
    };
  }, []);

  useEffect(() => {
    if (error) {
      setReloadVisible(true);
    }
  }, [error]);

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
    <div
      data-ctx={context}
      className={clsx(
        "w-full h-full flex-center flex-col gap-4 ",
        transparent ? "bg-transparent" : fullscreen ? "bg-white dark:bg-gray-800" : "dark:bg-gray-800/80",
        fullscreen ? "w-screen h-screen" : ""
      )}
    >
      <Ring size={40} lineWeight={5} speed={2} color="black" />
      {fullscreen && (
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {error ? "Failed to load. Please reload." : "Loading..."}
        </span>
      )}
      <Button
        className={clsx(`danger`, reloadVisible ? "visible" : "invisible")}
        onClick={handleReload}
      >
        Reload
      </Button>
    </div>
  );
};

export default memo(Loading);
