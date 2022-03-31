import { useState, useEffect, useRef } from "react";
import Styled from "./styled";
import { useSelector } from "react-redux";
import Masonry from "masonry-layout";
// import waterfall from "waterfall.js/src/waterfall";
import { Views } from "../../app/config";
import View from "./View";
import Search from "./Search";
import Filter from "./Filter";
import FileBox from "../../common/component/FileBox";
let msnry = null;
export default function ResourceManagement() {
  const listContainerRef = useRef(null);
  const [filter, setFilter] = useState({});
  const { fileMessages, message, view } = useSelector((store) => {
    return {
      message: store.message,
      fileMessages: store.fileMessage,
      view: store.ui.fileListView,
    };
  });

  const updateFilter = (data) => {
    setFilter((prev) => {
      return { ...prev, ...data };
    });
  };
  useEffect(() => {
    if (view == Views.grid && listContainerRef) {
      msnry = new Masonry(listContainerRef.current, {
        // options
        itemSelector: ".file_box",
        // columnWidth: 200
      });
    } else {
      if (msnry) {
        msnry.destroy();
      }
    }
    // return ()=>{
    //   if(msnry){
    //     msnry.destory()
    //   }
    // }
  }, [view]);

  console.log("files", fileMessages);
  return (
    <Styled>
      <Search />
      <div className="divider"></div>
      <div className="opts">
        <Filter filter={filter} updateFilter={updateFilter} />
        <View view={view} />
      </div>
      <div className={`list ${view}`} ref={listContainerRef}>
        {fileMessages.map((id) => {
          const data = message[id];
          if (!data) return null;
          const {
            mid,
            content,
            created_at,
            from_uid,
            properties: { name, file_type, size },
          } = data;
          return (
            <FileBox
              preview={view == Views.grid}
              flex={view == Views.item}
              key={mid}
              file_type={file_type}
              content={content}
              created_at={created_at}
              from_uid={from_uid}
              size={size}
              name={name}
            />
          );
        })}
      </div>
    </Styled>
  );
}
