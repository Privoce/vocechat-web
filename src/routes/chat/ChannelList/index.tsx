import { useState } from "react";
import DeleteConfirmModal from "../../settingChannel/DeleteConfirmModal";
import NavItem from "./NavItem";
import { useAppSelector } from "../../../app/store";

export default function ChannelList({ setDropFiles }: { setDropFiles: (files: File[]) => void }) {
  const [currId, setCurrId] = useState<number>();
  const { channelIds } = useAppSelector((store) => {
    return { channelIds: store.channels.ids };
  });

  const setRemoveChannel = (cid?: number) => {
    setCurrId(cid);
  };

  return (
    <>
      {channelIds.map((cid) => {
        return (
          <NavItem
            key={cid}
            toggleRemoveConfirm={setRemoveChannel}
            id={cid}
            setFiles={setDropFiles}
          />
        );
      })}
      {typeof currId !== "undefined" && (
        <DeleteConfirmModal id={currId} closeModal={setRemoveChannel} />
      )}
    </>
  );
}
