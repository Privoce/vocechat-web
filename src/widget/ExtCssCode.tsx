import BASE_URL from "@/app/config";
import { useAppSelector } from "@/app/store";
import { compareVersion } from "@/utils";
import React, { useEffect } from "react";

type Props = {};

const ExtCssCode = ({}: Props) => {
  const serverVersion = useAppSelector((store) => store.server.version);
  useEffect(() => {
    if (!serverVersion) return;
    const res = compareVersion(serverVersion, "0.4.0");
    console.log({ res });

    if (res >= 0) {
      const link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.href = `${BASE_URL}/resource/widget-extra.css`;
      document.head.append(link);
    }
  }, [serverVersion]);

  return null;
};

export default ExtCssCode;
