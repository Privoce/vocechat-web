import { useAppSelector } from "@/app/store";
import clsx from "clsx";
// import React from "react";

type Props = {};

const StreamStatus = (props: Props) => {
  const status = useAppSelector((store) => store.ui.SSEStatus);
  return (
    <aside className="fixed right-2 bottom-2">
      <div
        className={clsx(
          "w-1 h-1 rounded-full",
          status === "connected" && "bg-green-500",
          status === "disconnected" && "bg-red-500",
          status === "connecting" && "bg-yellow-500"
        )}
      ></div>
    </aside>
  );
};

export default StreamStatus;
