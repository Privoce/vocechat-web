// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import BASE_URL from "@/app/config";

import { useAppSelector } from "@/app/store";
import FileBox from "@/components/FileBox";
import Filter from "./Filter";
import Search from "./Search";
import View from "./View";
import { useLazyGetFilesQuery } from "@/app/services/server";
import { shallowEqual } from "react-redux";

function Files() {
  const [getFiles, { data }] = useLazyGetFilesQuery();
  const listContainerRef = useRef<HTMLDivElement>();
  const [filter, setFilter] = useState({});
  const view = useAppSelector((store) => store.ui.fileListView, shallowEqual);

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
    getFiles();
  }, []);
  if (!data) return null;
  // return null;
  const nonExpiredFiles = data.filter((item) => !item.expired);
  console.log({ view });
  return (
    <div className="h-screen md:overflow-y-scroll flex flex-col items-start my-2 mr-6 rounded-2xl bg-white dark:bg-gray-700">
      <Search value={filter.name} updateSearchValue={handleUpdateSearch} />
      <div className="flex justify-between w-full px-4 py-5">
        <Filter filter={filter} updateFilter={updateFilter} />
        <View view={view} />
      </div>
      <div
        className={clsx(
          `h-full w-full px-4 overflow-y-scroll no-scrollbar`,
          view == "item" && "flex gap-2 flex-col",
          view == "grid" && "col-count-2 md:col-count-3 lg:col-count-5"
        )}
        style={{
          columnGap: "5px"
        }}
        ref={listContainerRef}
      >
        {nonExpiredFiles.map((file) => {
          const { mid, thumbnail, content, created_at, from_uid, properties } = file;
          const { name, content_type, size } = properties ? JSON.parse(properties) : {};
          const url = `${BASE_URL}/resource/file?file_path=${encodeURIComponent(
            thumbnail || content
          )}`;
          return (
            // <div key={mid} className="grid-box mb-2">
            <FileBox
              cla
              preview={view == "grid"}
              flex={view == "item"}
              key={mid}
              file_type={content_type}
              content={url}
              created_at={created_at}
              from_uid={from_uid}
              size={size}
              name={name}
            />
            // </div>
          );
        })}
      </div>
    </div>
  );
}

export default Files;
