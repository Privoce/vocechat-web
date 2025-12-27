import { memo, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react";

import { updateChannelVisibleAside } from "@/app/slices/footprint";
import { updateRememberedNavs } from "@/app/slices/ui";
import { useAppSelector } from "@/app/store";
import ChannelIcon from "@/components/ChannelIcon";
import GoBackNav from "@/components/GoBackNav";
import Tooltip from "@/components/Tooltip";
import MessageSearch from "@/components/MessageSearch";
import IconFav from "@/assets/icons/bookmark.svg";
import IconPeople from "@/assets/icons/people.svg";
import IconPin from "@/assets/icons/pin.svg";
import FavList from "../FavList";
import Layout from "../Layout";
import { VirtualMessageFeedHandle } from "../Layout/VirtualMessageFeed";
import VoiceChat from "../VoiceChat";
import Dashboard from "../VoiceChat/Dashboard";
import Members from "./Members";
import PinList from "./PinList";
import { KEY_ADMIN_SEE_CHANNEL_MEMBERS } from "@/app/config";
import useServerExtSetting from "@/hooks/useServerExtSetting";

type Props = {
  cid?: number;
  dropFiles?: File[];
};
function ChannelChat({ cid = 0, dropFiles = [] }: Props) {
  const { getExtSetting } = useServerExtSetting();
  const { t } = useTranslation("chat");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const feedRef = useRef<VirtualMessageFeedHandle>(null);
  const loginUser = useAppSelector((store) => store.authData.user, shallowEqual);
  const visibleAside = useAppSelector((store) => store.footprint.channelAsides[cid], shallowEqual);
  const userIds = useAppSelector((store) => store.users.ids, shallowEqual);
  const data = useAppSelector((store) => store.channels.byId[cid], shallowEqual);
  useEffect(() => {
    if (!data) {
      // channel 不存在了 回首页
      navigate("/chat");
    }
  }, [data]);
  useEffect(() => {
    dispatch(updateRememberedNavs());
    return () => {
      dispatch(updateRememberedNavs({ path: pathname }));
    };
  }, [pathname]);

  const toggleMembersVisible = () => {
    dispatch(
      updateChannelVisibleAside({
        id: cid,
        aside: visibleAside !== "members" ? "members" : null,
      })
    );
  };

  const handleLocate = (mid: number) => {
    feedRef.current?.scrollToMessage(mid);
  };

  if (!data) return null;
  const { name, description, is_public, members = [], owner } = data;
  const memberIds = is_public ? userIds : members.slice(0).sort((n) => (n == owner ? -1 : 0));
  const addVisible = loginUser?.is_admin || owner == loginUser?.uid;
  const pinCount = data?.pinned_messages?.length || 0;
  const toolClass = `relative cursor-pointer hidden md:block`;
  const onlyAdminCanSeeMembers = getExtSetting(KEY_ADMIN_SEE_CHANNEL_MEMBERS);
  const canViewMembers = loginUser?.is_admin ? true : !onlyAdminCanSeeMembers;
  return (
    <Layout
      to={cid}
      context="channel"
      dropFiles={dropFiles}
      feedRef={feedRef}
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
                {pinCount > 0 ? (
                  <span className="absolute -top-2 -right-2 flex-center w-4 h-4 rounded-full bg-primary-400 text-white font-bold text-[10px]">
                    {pinCount}
                  </span>
                ) : null}
                <IconPin className="fill-gray-500" />
              </li>
            </Tippy>
          </Tooltip>
          <VoiceChat context={`channel`} id={cid} />
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
          {canViewMembers && (
            <li className={`${toolClass}`} onClick={toggleMembersVisible}>
              <Tooltip tip={t("channel_members")} placement="left">
                <IconPeople className={visibleAside == "members" ? "fill-gray-600" : ""} />
              </Tooltip>
            </li>
          )}
        </ul>
      }
      header={
        <header className="px-5 py-4 flex items-center justify-center md:justify-between shadow-[inset_0_-1px_0_rgb(0_0_0_/_10%)]">
          <GoBackNav />
          <div className="flex items-center gap-1">
            <Link
              to={`/setting/channel/${cid}/overview?f=/chat/channel/${cid}`}
              className="flex items-center gap-1"
            >
              <ChannelIcon personal={!is_public} />
              <span className="text-gray-800 dark:text-white whitespace-nowrap">{name}</span>
            </Link>
            <span className="ml-2 text-gray-500 hidden md:block">{description}</span>
          </div>
          <MessageSearch context="channel" id={cid} onLocate={handleLocate} />
        </header>
      }
      users={
        canViewMembers ? (
          <Members
            uids={memberIds}
            addVisible={addVisible}
            cid={cid}
            ownerId={owner}
            membersVisible={visibleAside == "members"}
          />
        ) : null
      }
      voice={<Dashboard visible={visibleAside == "voice"} id={cid} context="channel" />}
    />
  );
}
export default memo(ChannelChat, (prev, next) => prev.cid == next.cid);
