// import { useState, useEffect, useRef, memo } from "react";
import Styled from "./styled";
import { useSelector } from "react-redux";
import SavedMessage from "../../common/component/Message/SavedMessage";
// import Masonry from "masonry-layout";
// import waterfall from "waterfall.js/src/waterfall";
// import { Views } from "../../app/config";
// import View from "./View";
// import Search from "./Search";
// import Filter from "./Filter";
// import FileBox from "../../common/component/FileBox";
function FavsPage() {
  // const listContainerRef = useRef(null);
  // const [filter, setFilter] = useState({});
  const { favorites } = useSelector((store) => {
    return {
      favorites: store.favorites,
      // channelMessage: store.channelMessage,
      // view: store.ui.fileListView,
    };
  });
  return (
    <Styled>
      {favorites.map(({ id, created_at }) => {
        return <SavedMessage key={id} id={id} />;
      })}
    </Styled>
  );
}
export default FavsPage;
// const equals = (a, b) => a.length === b.length && a.every((v, i) => v == b[i]);
// export default memo(FavsPage, (prevs, nexts) => {
//   return equals(prevs.fileMessages, nexts.fileMessages);
// });
