import { useState, useEffect } from "react";
import { useDebounce } from "rooks";
import { NavLink, useLocation } from "react-router-dom";
import Tippy from "@tippyjs/react";
import { useDispatch } from "react-redux";
import PinList from "./PinList";
import FavList from "../FavList";
import { useReadMessageMutation } from "../../../app/services/message";
import { updateRememberedNavs } from "../../../app/slices/ui";
import useMessageFeed from "../../../common/hook/useMessageFeed";
import useConfig from "../../../common/hook/useConfig";
import ChannelIcon from "../../../common/component/ChannelIcon";
import Tooltip from "../../../common/component/Tooltip";
import User from "../../../common/component/User";
import Layout from "../Layout";
import { renderMessageFragment } from "../utils";
import EditIcon from "../../../assets/icons/edit.svg";
// import alertIcon from "../../../assets/icons/alert.svg?url";
import IconFav from "../../../assets/icons/bookmark.svg";
import IconPeople from "../../../assets/icons/people.svg";
import IconPin from "../../../assets/icons/pin.svg";
// import searchIcon from "../../../assets/icons/search.svg?url";
import IconHeadphone from "../../../assets/icons/headphone.svg";

import addIcon from "../../../assets/icons/add.svg?url";
import { StyledUsers, StyledChannelChat, StyledHeader } from "./styled";
import InviteModal from "../../../common/component/InviteModal";
import LoadMore from "../LoadMore";
import { useAppSelector } from "../../../app/store";
import { AgoraConfig } from "../../../types/server";
type Props = {
  cid?: number;
  dropFiles?: File[];
};
export default function ChannelChat({ cid = 0, dropFiles = [] }: Props) {
  const { values: agoraConfig } = useConfig("agora");
  const {
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
    // msgIds,
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
      // msgIds: store.channelMessage[cid] || [],
      userIds: store.users.ids,
      data: store.channels.byId[cid] || {},
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
  console.log("channel message list", msgIds);
  const readIndex = footprint.readChannels[cid];
  const pinCount = data?.pinned_messages?.length || 0;
  const feeds = [...msgIds, ...appends];
  return (
    <>
      {addMemberModalVisible && <InviteModal cid={cid} closeModal={toggleAddVisible} />}
      <Layout
        to={cid}
        context="channel"
        dropFiles={dropFiles}
        aside={
          <>
            <ul className="tools">
              {(agoraConfig as AgoraConfig)?.enabled && (
                <li className="tool">
                  <Tooltip tip="Voice/Video Chat" placement="left">
                    <IconHeadphone />
                  </Tooltip>
                </li>
              )}
              <Tooltip tip="Pin" placement="left">
                <Tippy
                  placement="left-start"
                  popperOptions={{ strategy: "fixed" }}
                  offset={[0, 150]}
                  interactive
                  trigger="click"
                  content={<PinList id={cid} />}
                >
                  <li className={`tool ${pinCount > 0 ? "badge" : ""}`} data-count={pinCount}>
                    <IconPin />
                  </li>
                </Tippy>
              </Tooltip>
              <Tooltip tip="Favorite" placement="left">
                <Tippy
                  placement="left-start"
                  popperOptions={{ strategy: "fixed" }}
                  offset={[0, 162]}
                  interactive
                  trigger="click"
                  content={<FavList cid={cid} />}
                >
                  <li className={`tool fav`} data-count={pinCount}>
                    <IconFav />
                  </li>
                </Tippy>
              </Tooltip>
              <li
                className={`tool ${membersVisible ? "active" : ""}`}
                onClick={toggleMembersVisible}
              >
                <Tooltip tip="Channel Members" placement="left">
                  <IconPeople />
                </Tooltip>
              </li>
            </ul>
          </>
        }
        header={
          <StyledHeader className="head">
            <div className="txt">
              <ChannelIcon personal={!is_public} />
              <span className="title">{name}</span>
              <span className="desc">{description}</span>
            </div>
          </StyledHeader>
        }
        users={
          membersVisible ? (
            <>
              <StyledUsers>
                {addVisible && (
                  <div className="add" onClick={toggleAddVisible}>
                    <img className="icon" src={addIcon} />
                    <div className="txt">Add members</div>
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
              </StyledUsers>
            </>
          ) : null
        }
      >
        <StyledChannelChat id={`VOCECHAT_FEED_channel_${cid}`}>
          {hasMore ? (
            <LoadMore pullUp={pullUp} />
          ) : (
            <div className="info">
              <h2 className="title">Welcome to #{name} !</h2>
              <p className="desc">This is the start of the #{name} channel. </p>
              <NavLink to={`/setting/channel/${cid}?f=${pathname}`} className="edit">
                <EditIcon className="icon" />
                Edit Channel
              </NavLink>
            </div>
          )}
          {/* <div className="feed"> */}
          {feeds.map((mid, idx) => {
            const curr = messageData[mid];
            if (!curr) return null;
            const isFirst = idx == 0;
            const prev = isFirst ? null : messageData[feeds[idx - 1]];
            const read = curr?.from_uid == loginUser.uid || mid <= readIndex;
            return renderMessageFragment({
              selectMode: !!selects,
              updateReadIndex: updateReadDebounced,
              read,
              isFirst,
              prev,
              curr,
              contextId: cid,
              context: "channel"
            });
          })}
        </StyledChannelChat>
      </Layout>
    </>
  );
}
