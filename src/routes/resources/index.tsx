// @ts-nocheck
import { useState, useEffect, useRef, memo } from "react";
import Masonry from "masonry-layout";
import View from "./View";
import Search from "./Search";
import Filter from "./Filter";
import FileBox from "../../common/component/FileBox";
import { useAppSelector } from "../../app/store";
import clsx from "clsx";
const checkFilter = (data, filter, channelMessage) => {
  let selected = true;
  const { mid, file_type, created_at, from_uid, properties } = data;
  const {
    name: nameFilter,
    type: typeFilter,
    date: timeFilter,
    from: fromFilter,
    channel: channelFilter
  } = filter;
  const name = properties ? properties.name : "";
  if (fromFilter && fromFilter != from_uid) {
    selected = false;
  }
  if (channelFilter && channelMessage[channelFilter].findIndex((id) => id == mid) == -1) {
    selected = false;
  }
  if (nameFilter) {
    let str = ["", ...nameFilter.toLowerCase(), ""].join(".*");
    let reg = new RegExp(str);
    if (!reg.test(name)) {
      selected = false;
    }
  }
  return selected;
};

let msnry: Masonry | null;
function ResourceManagement({ fileMessages }) {
  const listContainerRef = useRef<HTMLDivElement>();
  const [filter, setFilter] = useState({});
  const { message, view, channelMessage } = useAppSelector((store) => {
    return {
      message: store.message,
      channelMessage: store.channelMessage,
      view: store.ui.fileListView
    };
  });

  const updateFilter = (data) => {
    setFilter((prev) => {
      return { ...prev, ...data };
    });
  };

  const handleUpdateSearch = (val) => {
    setFilter((prev) => {
      return { ...prev, name: val };
    });
  };

  useEffect(() => {
    if (view == "grid" && listContainerRef) {
      const container = listContainerRef.current;
      if (!container) return;
      const cWidth = container.getBoundingClientRect().width - 16 * 2;
      const count = Math.floor(cWidth / 368);
      const leftWidth = cWidth % 368;
      const gutter = Math.max(Math.floor(leftWidth / (count - 1)), 8);
      // console.log("gutter", gutter, cWidth, count, leftWidth);
      msnry = new Masonry(container, {
        // options
        fitWidth: true,
        gutter,
        itemSelector: ".grid-box"
        // columnWidth: 200
      });
    } else {
      if (msnry) {
        msnry.destroy();
      }
    }
  }, [view, filter]);

  return (
    <div className="h-screen overflow-y-scroll flex flex-col items-start my-2 mr-6 rounded-2xl bg-white">
      <Search value={filter.name} updateSearchValue={handleUpdateSearch} />
      <div className="divider"></div>
      <div className="flex justify-between w-full px-4 py-5">
        <Filter filter={filter} updateFilter={updateFilter} />
        <View view={view} />
      </div>
      <div className={clsx(`w-full h-full px-4 overflow-scroll flex`,
        view == "item" && 'gap-2 flex-col',
        view == "grid" && "flex-wrap"
      )} ref={listContainerRef}>
        {fileMessages.map((id) => {
          const data = message[id];
          if (!data) return null;
          const isSelected = checkFilter(data, filter, channelMessage);
          if (!isSelected) return null;
          const { mid, content, created_at, from_uid, properties } = data;
          const { name, content_type, size } = properties ?? {};
          return (
            <div key={mid} className="grid-box mb-2">
              <FileBox
                preview={view == "grid"}
                flex={view == "item"}
                key={mid}
                file_type={content_type}
                content={content}
                created_at={created_at}
                from_uid={from_uid}
                size={size}
                name={name}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

const equals = (a, b) => a.length === b.length && a.every((v, i) => v == b[i]);

export default memo(ResourceManagement, (prevs, nexts) => {
  return equals(prevs.fileMessages, nexts.fileMessages);
});
