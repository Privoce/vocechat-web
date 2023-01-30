import { MouseEvent, FC } from "react";
import styled from "styled-components";
import FavoredMessage from "../../common/component/Message/FavoredMessage";
import IconSurprise from "../../assets/icons/emoji.surprise.svg";
import IconRemove from "../../assets/icons/close.svg";
import useFavMessage from "../../common/hook/useFavMessage";
import { useTranslation } from "react-i18next";
// 覆盖样式
const Styled = styled.div`
    .favorite {
      background: none;
      &:hover{
        background: #f5f6f7;
      }
      .down img {
        width: 100% !important;
        height: auto !important;
      }
    }
`;
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
    <Styled className="p-4 bg-slate-50 rounded-xl min-w-[500px] max-h-[500px] overflow-auto drop-shadow-[0px_25px_50px_rgba(31,_41,_55,_0.25)]">
      <h4 className="font-bold text-base text-gray-600 mb-4">{t('fav_msg')}({favorites.length})</h4>
      {noFavs ? (
        <div className="flex flex-col gap-2 w-full items-center p-4">
          <IconSurprise />
          <div className="w-60 text-base text-gray-600 text-center font-bold">{t("fav_empty_tip")}</div>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {favorites.map(({ id }) => {
            return (
              <li key={id} className="relative border border-solid border-slate-200 rounded-md group">
                <FavoredMessage id={id} />
                <div className="flex items-center absolute top-2 right-2 border border-solid border-gray-300 rounded-md overflow-hidden invisible group-hover:visible">
                  <button className="flex-center w-6 h-6 p-1" data-id={id} onClick={handleRemove}>
                    <IconRemove className="fill-slate-900" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Styled>
  );
};
export default FavList;
