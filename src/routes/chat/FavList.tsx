import { FC, MouseEvent } from "react";
import { useTranslation } from "react-i18next";

import FavoredMessage from "@/components/Message/FavoredMessage";
import useFavMessage from "@/hooks/useFavMessage";
import IconRemove from "@/assets/icons/close.svg";
import IconSurprise from "@/assets/icons/emoji.surprise.svg";

type Props = { cid?: number; uid?: number };
const FavList: FC<Props> = ({ cid = null, uid = null }) => {
  const { t } = useTranslation("chat");
  const { favorites, removeFavorite } = useFavMessage({ cid, uid });
  const handleRemove = (evt: MouseEvent<HTMLButtonElement>) => {
    const { id = "" } = evt.currentTarget.dataset;
    // console.log("remove fav", id);
    removeFavorite(id);
  };
  const noFavs = favorites.length == 0;
  return (
    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl min-w-[500px] max-h-[500px] overflow-auto drop-shadow-[0px_25px_50px_rgba(31,_41,_55,_0.25)]">
      <h4 className="font-bold text-gray-600 dark:text-gray-400 mb-4">
        {t("fav_msg")}({favorites.length})
      </h4>
      {noFavs ? (
        <div className="flex flex-col gap-2 w-full items-center p-4">
          <IconSurprise />
          <div className="w-60 text-gray-600 dark:text-gray-400 text-center font-bold">
            {t("fav_empty_tip")}
          </div>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {favorites.map(({ id }) => {
            return (
              <li
                key={id}
                className="relative border border-solid border-slate-200 dark:border-gray-600 rounded-md group"
              >
                <FavoredMessage id={id} />
                <div className="flex items-center absolute top-2 right-2 border border-solid border-gray-300 dark:border-gray-600 rounded-md overflow-hidden invisible group-hover:visible">
                  <button className="flex-center w-6 h-6 p-1" data-id={id} onClick={handleRemove}>
                    <IconRemove className="fill-slate-900 dark:fill-slate-500" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default FavList;
