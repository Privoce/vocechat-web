// import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDebounce } from "rooks";
import Tippy from "@tippyjs/react";
import FavList from "../FavList";

import Tooltip from "../../../common/component/Tooltip";
import FavIcon from "../../../assets/icons/bookmark.svg";
// import searchIcon from "../../../assets/icons/search.svg?url";
import IconHeadphone from "../../../assets/icons/headphone.svg";

import boardosIcon from "../../../assets/icons/app.boardos.svg?url";
import webrowseIcon from "../../../assets/icons/app.webrowse.svg?url";
// import useChatScroll from "../../../common/hook/useChatScroll";
import { useReadMessageMutation } from "../../../app/services/message";
import Contact from "../../../common/component/Contact";
import Layout from "../Layout";
import { StyledHeader, StyledDMChat } from "./styled";
import LoadMore from "../LoadMore";
import { renderMessageFragment } from "../utils";
import useMessageFeed from "../../../common/hook/useMessageFeed";
export default function DMChat({ uid = "", dropFiles = [] }) {
  const { list: msgIds, appends, hasMore, pullUp } = useMessageFeed({
    context: "user",
    id: uid,
  });
  const [updateReadIndex] = useReadMessageMutation();
  const updateReadDebounced = useDebounce(updateReadIndex, 300);
  console.log("dm files", dropFiles);
  // const [mids, setMids] = useState([]);
  const { currUser, messageData, footprint, loginUid, selects } = useSelector(
    (store) => {
      return {
        selects: store.ui.selectMessages[`user_${uid}`],
        loginUid: store.authData.uid,
        footprint: store.footprint,
        currUser: store.contacts.byId[uid],
        messageData: store.message,
      };
    }
  );
  // const ref = useChatScroll(msgIds);

  if (!currUser) return null;
  // console.log("user msgs", msgs);
  const readIndex = footprint.readUsers[uid];
  const feeds = [...msgIds, ...appends];
  return (
    <Layout
      to={uid}
      context="user"
      dropFiles={dropFiles}
      aside={
        <>
          <ul className="tools">
            <li className="tool">
              <IconHeadphone />
            </li>
            {/* <li className="tool">
              <img src={alertIcon} alt="opt icon" />
            </li> */}
            <Tooltip tip="Saved Items" placement="left">
              <Tippy
                placement="left-start"
                popperOptions={{ strategy: "fixed" }}
                offset={[0, 180]}
                interactive
                trigger="click"
                content={<FavList uid={uid} />}
              >
                <li className={`tool fav`}>
                  <FavIcon />
                </li>
              </Tippy>
            </Tooltip>
            {/* <li className="tool fav">
              <FavIcon />
            </li> */}
          </ul>
          <hr className="divider" />
          <ul className="apps">
            <li className="app">
              <Tooltip tip="Webrowse" placement="left">
                <img src={webrowseIcon} alt="app icon" />
              </Tooltip>
            </li>
            <li className="app">
              <Tooltip tip="BoardOS" placement="left">
                <img src={boardosIcon} alt="app icon" />
              </Tooltip>
            </li>
          </ul>
        </>
      }
      header={
        <StyledHeader className="head">
          <Contact interactive={false} uid={currUser.uid} />
        </StyledHeader>
      }
    >
      <StyledDMChat id={`RUSTCHAT_FEED_user_${uid}`}>
        {hasMore ? <LoadMore pullUp={pullUp} /> : null}
        {[...feeds].map((mid, idx) => {
          const curr = messageData[mid];
          const prev = idx == 0 ? null : messageData[feeds[idx - 1]];
          const read = curr?.from_uid == loginUid || mid <= readIndex;
          return renderMessageFragment({
            selectMode: !!selects,
            updateReadIndex: updateReadDebounced,
            read,
            prev,
            curr,
            contextId: uid,
            context: "user",
          });
        })}
      </StyledDMChat>
    </Layout>
  );
}
