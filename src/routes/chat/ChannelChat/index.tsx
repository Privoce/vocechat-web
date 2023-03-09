import { useState, useEffect, memo } from "react";
import { useLocation } from "react-router-dom";
import Tippy from "@tippyjs/react";
import { useDispatch } from "react-redux";
import PinList from "./PinList";
import FavList from "../FavList";
import { updateRememberedNavs } from "../../../app/slices/ui";
import ChannelIcon from "../../../common/component/ChannelIcon";
import Tooltip from "../../../common/component/Tooltip";
import Layout from "../Layout";
import IconFav from "../../../assets/icons/bookmark.svg";
import IconPeople from "../../../assets/icons/people.svg";
import IconPin from "../../../assets/icons/pin.svg";

import { useAppSelector } from "../../../app/store";
import { useTranslation } from "react-i18next";
import GoBackNav from "../../../common/component/GoBackNav";
import Members from "./Members";
type Props = {
  cid?: number;
  dropFiles?: File[];
};
function ChannelChat({ cid = 0, dropFiles = [] }: Props) {
  const { t } = useTranslation("chat");
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [membersVisible, setMembersVisible] = useState(true);

  const {
    userIds,
    data,
    loginUser,
  } = useAppSelector((store) => {
    return {
      loginUser: store.authData.user,
      userIds: store.users.ids,
      data: store.channels.byId[cid],
    };
  });
  useEffect(() => {
    dispatch(updateRememberedNavs());
    return () => {
      dispatch(updateRememberedNavs({ path: pathname }));
    };
  }, [pathname]);

  const toggleMembersVisible = () => {
    setMembersVisible((prev) => !prev);
  };

  if (!data) return null;
  const { name, description, is_public, members = [], owner } = data;
  const memberIds = is_public ? userIds : members.slice(0).sort((n) => (n == owner ? -1 : 0));
  const addVisible = loginUser?.is_admin || owner == loginUser?.uid;
  const pinCount = data?.pinned_messages?.length || 0;
  const toolClass = `relative cursor-pointer`;
  return <Layout
    to={cid}
    context="channel"
    dropFiles={dropFiles}
    aside={
      <ul className="flex flex-col gap-6">
        <Tooltip tip={t("pin")} placement="left">
          <Tippy
            placement="left-start"
            popperOptions={{ strategy: "fixed" }}
            offset={[0, 150]}
            interactive
            trigger="click"
            content={<PinList id={cid} />}
          >
            <li className={`${toolClass}`}>
              {pinCount > 0 ? <span className="absolute -top-2 -right-2 flex-center w-4 h-4 rounded-full bg-primary-400 text-white font-bold text-[10px]">{pinCount}</span> : null}
              <IconPin className="fill-gray-500" />
            </li>
          </Tippy>
        </Tooltip>
        <Tooltip tip={t("fav")} placement="left">
          <Tippy
            placement="left-start"
            popperOptions={{ strategy: "fixed" }}
            offset={[0, 164]}
            interactive
            trigger="click"
            content={<FavList cid={cid} />}
          >
            <li className={`${toolClass}`}>
              <IconFav className="fill-gray-500" />
            </li>
          </Tippy>
        </Tooltip>
        <li
          className={`${toolClass}`}
          onClick={toggleMembersVisible}
        >
          <Tooltip tip={t("channel_members")} placement="left">
            <IconPeople className={membersVisible ? "fill-gray-600" : ""} />
          </Tooltip>
        </li>
      </ul>
    }
    header={
      <header className="px-5 py-4 flex items-center justify-center md:justify-between shadow-[inset_0_-1px_0_rgb(0_0_0_/_10%)]">
        <GoBackNav />
        <div className="flex items-center gap-1">
          <ChannelIcon personal={!is_public} />
          <span className="text-gray-800 dark:text-white">{name}</span>
          <span className="ml-2 text-gray-500 hidden md:block">{description}</span>
        </div>
      </header>
    }
    users={
      <Members uids={memberIds} addVisible={addVisible} cid={cid} ownerId={owner} membersVisible={membersVisible} />
    }
  />;
}
export default memo(ChannelChat, (prev, next) => prev.cid == next.cid);
