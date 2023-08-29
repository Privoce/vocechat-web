import QR from "qrcode.react";

import { useAppSelector } from "@/app/store";
import { shallowEqual } from "react-redux";

type Props = {
  link: string;
  size?: number;
  level?: "L" | "M" | "H" | "Q";
};

const QRCode = ({ link, size = 512, level = "L" }: Props) => {
  const logo = useAppSelector((store) => store.server.logo, shallowEqual);
  return (
    <div className="p-2 bg-white dark:bg-slate-200 rounded">
      <QR
        renderAs="svg"
        value={link}
        className="rounded border border-solid border-gray-200 dark:border-none !w-full !h-full"
        size={size}
        bgColor={"#fff"}
        fgColor={"#000"}
        level={level}
        // includeMargin={true}
        imageSettings={{
          src: logo,
          x: undefined,
          y: undefined,
          height: size / 6,
          width: size / 6,
          excavate: true
        }}
      />
    </div>
  );
};

export default QRCode;
