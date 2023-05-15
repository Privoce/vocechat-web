import { FC, FormEvent } from "react";
import usePinMessage from "@/hooks/usePinMessage";
import IconSurprise from "@/assets/icons/emoji.surprise.svg";
import IconClose from "@/assets/icons/close.svg";
import { useTranslation } from "react-i18next";
import PinnedMessage from "@/components/PinnedMessage";

type Props = {
  id: number;
};
const PinList: FC<Props> = ({ id }: Props) => {
  const { t } = useTranslation("chat");
  const { pins, unpinMessage, canPin } = usePinMessage(id);
  const handleUnpin = (evt: FormEvent<HTMLButtonElement>) => {
    const { mid } = evt.currentTarget.dataset;
    if (!mid) return;
    unpinMessage(+mid);
  };
  const noPins = pins.length == 0;
  return (
    <div className="p-4 drop-shadow-md overflow-y-scroll min-w-[320px] md:min-w-[486px] md:max-h-[90vh] rounded-xl bg-gray-50 dark:bg-gray-800">
      <h4 className=" text-gray-600 dark:text-gray-400 mb-4 font-semibold">{t("pinned_msg")}({pins.length})</h4>
      {noPins ? (
        <div className="flex flex-col items-center gap-2 w-full p-4">
          <IconSurprise />
          <div className="w-60 font-semibold text-gray-500 dark:text-gray-300 text-center">{t("pin_empty_tip")}</div>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {pins.map((data) => {
            return (
              <li key={data.mid} className="group relative border border-solid border-slate-100 dark:border-slate-600 rounded-md ">
                <PinnedMessage data={data} />
                <div className="invisible group-hover:visible flex items-center gap-1 absolute top-1 right-1 p-1 border border-solid border-black/10 dark:border-gray-500 rounded-md">
                  {canPin && (
                    <button className="flex bg-none border-none" data-mid={data.mid} onClick={handleUnpin}>
                      <IconClose className="fill-slate-900 dark:fill-slate-300" />
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default PinList;
