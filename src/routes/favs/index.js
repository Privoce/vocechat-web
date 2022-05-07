// import { useState, useEffect, useRef, memo } from "react";
import Styled from "./styled";
import { useSelector } from "react-redux";
import SavedMessage from "../../common/component/Message/SavedMessage";
import dayjs from "dayjs";
function FavsPage() {
  // const listContainerRef = useRef(null);
  // const [filter, setFilter] = useState({});
  const { favorites } = useSelector((store) => {
    console.log("favs", store.favorites);
    return {
      favorites: store.favorites,
      // channelMessage: store.channelMessage,
      // view: store.ui.fileListView,
    };
  });
  return (
    <Styled>
      {favorites.map(({ id, created_at, messages }) => {
        const [
          {
            source: { gid, uid },
          },
        ] = messages;

        return (
          <div className="fav" key={id}>
            <h4 className="tip">
              {gid ? `gid:${gid}` : `uid:${uid}`}{" "}
              {dayjs(created_at).format("YYYY-MM-DD")}
            </h4>
            <SavedMessage key={id} id={id} />
          </div>
        );
      })}
    </Styled>
  );
}
export default FavsPage;
// const equals = (a, b) => a.length === b.length && a.every((v, i) => v == b[i]);
// export default memo(FavsPage, (prevs, nexts) => {
//   return equals(prevs.fileMessages, nexts.fileMessages);
// });
