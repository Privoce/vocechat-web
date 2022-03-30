import { useState, useEffect, useRef } from "react";
import Styled from "./styled";
import { useSelector } from "react-redux";
// import waterfall from "waterfall.js/src/waterfall";
import View, { Views } from "./View";
import Search from "./Search";
import Filter from "./Filter";
import FileBox from "../../common/component/FileBox";
export default function ResourceManagement() {
  const listContainerRef = useRef(null);
  const [view, setView] = useState(Views.item);
  const { fileMessages, message } = useSelector((store) => {
    return { message: store.message, fileMessages: store.fileMessage };
  });

  const toggleView = () => {
    setView((prev) => (prev == Views.item ? Views.grid : Views.item));
  };
  // useEffect(() => {
  //   if (view == Views.grid && listContainerRef) {
  //     const wtf = waterfall(listContainerRef.current);
  //     console.log("wtf", wtf);
  //     waterfall
  //   }
  // }, [view]);

  console.log("files", fileMessages);
  return (
    <Styled>
      <Search />
      <div className="divider"></div>
      <div className="opts">
        <Filter />
        <View view={view} toggleView={toggleView} />
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
