import { useState, useEffect, memo } from "react";
import { useDebounce } from "rooks";
import { NavLink, useLocation } from "react-router-dom";
import Tippy from "@tippyjs/react";
import { useDispatch } from "react-redux";
import PinList from "./PinList";
import FavList from "../FavList";
import { useReadMessageMutation } from "../../../app/services/message";
import { updateRememberedNavs } from "../../../app/slices/ui";
import useMessageFeed from "../../../common/hook/useMessageFeed";
import ChannelIcon from "../../../common/component/ChannelIcon";
import Tooltip from "../../../common/component/Tooltip";
import User from "../../../common/component/User";
import Layout from "../Layout";
import { renderMessageFragment } from "../utils";
import EditIcon from "../../../assets/icons/edit.svg";
import IconFav from "../../../assets/icons/bookmark.svg";
import IconPeople from "../../../assets/icons/people.svg";
import IconPin from "../../../assets/icons/pin.svg";

import IconAdd from "../../../assets/icons/add.svg";
import InviteModal from "../../../common/component/InviteModal";
import LoadMore from "../LoadMore";
import { useAppSelector } from "../../../app/store";
import { useTranslation } from "react-i18next";
import GoBackNav from "../../../common/component/GoBackNav";
type Props = {
  cid?: number;
  dropFiles?: File[];
};
function ChannelChat({ cid = 0, dropFiles = [] }: Props) {
  const { t } = useTranslation("chat");
  const {
    pulling,
    list: msgIds,
    appends,
    hasMore,
    pullUp
  } = useMessageFeed({
    context: "channel",
    id: cid
  });
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [updateReadIndex] = useReadMessageMutation();
  const updateReadDebounced = useDebounce(updateReadIndex, 300);
  const [membersVisible, setMembersVisible] = useState(true);
  const [addMemberModalVisible, setAddMemberModalVisible] = useState(false);
  const {
    selects,
    userIds,
    data,
    messageData,
    loginUser,
    footprint
  } = useAppSelector((store) => {
    return {
      selects: store.ui.selectMessages[`channel_${cid}`],
      footprint: store.footprint,
      loginUser: store.authData.user,
      userIds: store.users.ids,
      data: store.channels.byId[cid],
      messageData: store.message || {}
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
  const toggleAddVisible = () => {
    setAddMemberModalVisible((prev) => !prev);
  };
  if (!data) return null;
  const { name, description, is_public, members = [], owner } = data;
  const memberIds = is_public ? userIds : members.slice(0).sort((n) => (n == owner ? -1 : 0));
  const addVisible = loginUser?.is_admin || owner == loginUser?.uid;
  const readIndex = footprint.readChannels[cid];
  const pinCount = data?.pinned_messages?.length || 0;
  const feeds = [...msgIds, ...appends];
  const toolClass = `relative cursor-pointer`;
  return (
    <>
      {addMemberModalVisible && <InviteModal cid={cid} closeModal={toggleAddVisible} />}
      <Layout
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
          <div className={`h-full flex-col gap-1 w-[226px] overflow-y-scroll p-2 shadow-[inset_1px_0px_0px_rgba(0,_0,_0,_0.1)] ${membersVisible ? "flex" : "hidden"}`}>
            {addVisible && (
              <div className="cursor-pointer flex items-center justify-start gap-1 select-none rounded-lg p-2.5 hover:bg-gray-500/10" onClick={toggleAddVisible}>
                <IconAdd className="w-6 h-6 dark:fill-slate-300" />
                <div className="font-semibold text-sm text-gray-600 dark:text-gray-50">{t("add_channel_members")}</div>
              </div>
            )}
            {memberIds.map((uid: number) => {
              return (
                <User
                  enableContextMenu={true}
                  cid={cid}
                  owner={owner == uid}
                  key={uid}
                  uid={uid}
                  dm
                  popover
                />
              );
            })}
          </div>
        }
      >
        <>
          {hasMore ? (
            <LoadMore pullUp={pullUp} pulling={pulling} />
          ) : (
            <div className="pt-14 px-1 md:px-0 flex flex-col items-start gap-2">
              <h2 className="font-bold text-4xl dark:text-white">{t("welcome_channel", { name })}</h2>
              <p className="text-gray-600 dark:text-gray-300">{t("welcome_desc", { name })} </p>
              {loginUser?.is_admin && (
                <NavLink to={`/setting/channel/${cid}?f=${pathname}`} className="flex items-center gap-1 bg-clip-text text-fill-transparent bg-gradient-to-r from-blue-500 to-primary-400 ">
                  <EditIcon className="w-4 h-4 fill-blue-500" />
                  {t("edit_channel")}
                </NavLink>
              )}
            </div>
          )}
          {feeds.map((mid, idx) => {
            const curr = messageData[mid];
            if (!curr) return null;
            const isFirst = idx == 0;
            const prev = isFirst ? null : messageData[feeds[idx - 1]];
            const read = curr?.from_uid == loginUser?.uid || mid <= readIndex;
            return renderMessageFragment({
              selectMode: !!selects,
              updateReadIndex: updateReadDebounced,
              read,
              prev,
              curr,
              contextId: cid,
              context: "channel"
            });
          })}
        </>
      </Layout>
    </>
  );
}
export default memo(ChannelChat, (prev, next) => prev.cid == next.cid);
