import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react";
import FavList from "../FavList";
import Tooltip from "@/components/Tooltip";
import FavIcon from "@/assets/icons/bookmark.svg";
import User from "@/components/User";
import Layout from "../Layout";
import { useAppSelector } from "@/app/store";
import GoBackNav from "@/components/GoBackNav";
import ServerVersionChecker from "@/components/ServerVersionChecker";
import VoiceChat from "../VoiceChat";
type Props = {
  uid: number;
  dropFiles?: File[];
};
const DMChat: FC<Props> = ({ uid = 0, dropFiles }) => {
  const navigate = useNavigate();
  const { currUser } = useAppSelector((store) => {
    return {
      currUser: store.users.byId[uid],
    };
  });
  useEffect(() => {
    if (!currUser) {
      // user不存在了 回首页
      navigate("/chat");
    }
  }, [currUser]);
  if (!currUser) return null;
  return (
    <Layout
      to={uid}
      context="dm"
      dropFiles={dropFiles}
      aside={
        <ul className="flex flex-col gap-6">
          <ServerVersionChecker version="0.3.7" empty={true}>
            <VoiceChat context={`dm`} id={uid} />
          </ServerVersionChecker>
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
          <User interactive={false} uid={currUser.uid} />
        </header>
      }
    />
  );
};
export default DMChat;
