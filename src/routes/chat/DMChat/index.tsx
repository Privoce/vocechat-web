import { FC } from "react";
import { useDebounce } from "rooks";
import Tippy from "@tippyjs/react";
import FavList from "../FavList";
import Tooltip from "../../../common/component/Tooltip";
import FavIcon from "../../../assets/icons/bookmark.svg";
import { useReadMessageMutation } from "../../../app/services/message";
import User from "../../../common/component/User";
import Layout from "../Layout";
import LoadMore from "../LoadMore";
import { renderMessageFragment } from "../utils";
import useMessageFeed from "../../../common/hook/useMessageFeed";
import { useAppSelector } from "../../../app/store";
import GoBackNav from "../GoBackNav";
type Props = {
  uid: number;
  dropFiles?: File[];
};
const DMChat: FC<Props> = ({ uid = 0, dropFiles }) => {
  const {
    pulling,
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
        <ul className="flex flex-col gap-6">
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
        <header className="box-border h-14 px-5 flex items-center justify-center md:justify-between shadow-[inset_0_-1px_0_rgb(0_0_0_/_10%)]">
          <GoBackNav />
          <User interactive={false} uid={currUser.uid} />
        </header>
      }
    >
      <article id={`VOCECHAT_FEED_user_${uid}`} className="w-full h-full px-4 py-4.5 overflow-auto">
        {hasMore ? <LoadMore pullUp={pullUp} pulling={pulling} /> : null}
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
      </article>
    </Layout>
  );
};
export default DMChat;
