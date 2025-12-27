import { FC, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react";

import { useAppSelector } from "@/app/store";
import GoBackNav from "@/components/GoBackNav";
import Tooltip from "@/components/Tooltip";
import User from "@/components/User";
import MessageSearch from "@/components/MessageSearch";
import FavIcon from "@/assets/icons/bookmark.svg";
import FavList from "../FavList";
import Layout from "../Layout";
import { VirtualMessageFeedHandle } from "../Layout/VirtualMessageFeed";
import VoiceChat from "../VoiceChat";
import { shallowEqual } from "react-redux";

type Props = {
  uid: number;
  dropFiles?: File[];
};
const DMChat: FC<Props> = ({ uid = 0, dropFiles }) => {
  const navigate = useNavigate();
  const feedRef = useRef<VirtualMessageFeedHandle>(null);
  const currUser = useAppSelector((store) => store.users.byId[uid], shallowEqual);
  
  useEffect(() => {
    if (!currUser) {
      // user不存在了 回首页
      navigate("/chat");
    }
  }, [currUser]);
  
  const handleLocate = (mid: number) => {
    feedRef.current?.scrollToMessage(mid);
  };
  
  if (!currUser) return null;
  return (
    <Layout
      to={uid}
      context="dm"
      dropFiles={dropFiles}
      feedRef={feedRef}
      aside={
        <ul className="flex flex-col gap-6">
          <VoiceChat context={`dm`} id={uid} />
          <Tooltip tip="Saved Items" placement="left">
            <Tippy
              placement="left-start"
              popperOptions={{ strategy: "fixed" }}
              offset={[0, 180]}
              interactive
              trigger="click"
              content={<FavList uid={uid} />}
            >
              <li className={`relative cursor-pointer fav`}>
                <FavIcon className="fill-gray-500" />
              </li>
            </Tippy>
          </Tooltip>
        </ul>
      }
      header={
        <header className="box-border px-5 py-1 flex items-center justify-center md:justify-between shadow-[inset_0_-1px_0_rgb(0_0_0_/_10%)]">
          <GoBackNav />
          <User interactive={false} uid={currUser.uid} enableNavToSetting={true} />
          <MessageSearch context="dm" id={uid} onLocate={handleLocate} />
        </header>
      }
    />
  );
};
export default DMChat;
