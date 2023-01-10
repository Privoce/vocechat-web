import { FC } from "react";
import { useDebounce } from "rooks";
import Tippy from "@tippyjs/react";
import FavList from "../FavList";
import Tooltip from "../../../common/component/Tooltip";
import FavIcon from "../../../assets/icons/bookmark.svg";
import { useReadMessageMutation } from "../../../app/services/message";
import User from "../../../common/component/User";
import Layout from "../Layout";
import { StyledHeader, StyledDMChat } from "./styled";
import LoadMore from "../LoadMore";
import { renderMessageFragment } from "../utils";
import useMessageFeed from "../../../common/hook/useMessageFeed";
import { useAppSelector } from "../../../app/store";
type Props = {
  uid: number;
  dropFiles?: File[];
};
const DMChat: FC<Props> = ({ uid = 0, dropFiles }) => {
  const {
    list: msgIds,
    appends,
    hasMore,
    pullUp
  } = useMessageFeed({
    context: "user",
    id: uid
  });
  const [updateReadIndex] = useReadMessageMutation();
  const updateReadDebounced = useDebounce(updateReadIndex, 300);
  const { currUser, messageData, footprint, loginUid, selects } = useAppSelector((store) => {
    return {
      selects: store.ui.selectMessages[`user_${uid}`],
      loginUid: store.authData.user?.uid,
      footprint: store.footprint,
      currUser: store.users.byId[uid],
      messageData: store.message
    };
  });
  if (!currUser) return null;
  const readIndex = footprint.readUsers[uid];
  const feeds = [...msgIds, ...appends];
  return (
    <Layout
      to={uid}
      context="user"
      dropFiles={dropFiles}
      aside={
        <ul className="tools">
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
        </ul>
      }
      header={
        <StyledHeader className="head">
          <User interactive={false} uid={currUser.uid} />
        </StyledHeader>
      }
    >
      <StyledDMChat id={`VOCECHAT_FEED_user_${uid}`}>
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
            context: "user"
          });
        })}
      </StyledDMChat>
    </Layout>
  );
};
export default DMChat;
