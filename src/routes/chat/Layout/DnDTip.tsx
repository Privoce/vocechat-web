// import { useEffect } from "react";
import { ChatPrefixes } from "../../../app/config";
import { useTranslation } from "react-i18next";
type Props = {
  context: "user" | "channel",
  name: string
};
const DnDTip = ({ context, name }: Props) => {
  const { t } = useTranslation("chat");

  return (
    <div
      className={`z-50 flex-center absolute left-0 top-0 w-full h-full bg-black/50`}
    >
      <div className={`p-4 drop-shadow-md rounded-lg bg-primary-300`}>
        <div className="p-4 pt-16 border-2 border-dashed border-primary-300 rounded-md flex flex-col items-center text-white">
          <h4 className="text-xl font-semibold">{`${t("send_to")} ${ChatPrefixes[context]}${name}`}</h4>
          <span className="text-sm">Photos accept jpg, png, max size limit to 10M.</span>
        </div>
      </div>
    </div>
  );
};

export default DnDTip;
