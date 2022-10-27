/* eslint-disable @typescript-eslint/indent */
import { FC, memo, useEffect } from 'react';
// import { MessagePayload } from '../../../app/slices/message';
import { useAppSelector } from '../../../app/store';
import TextMessage from './Message/Text';

type Props = {
  uid: number
};

// 间隔10秒
const interval = 10 * 1000;
const Index: FC<Props> = ({ uid }) => {
  const { mids, messageMap } = useAppSelector(store => { return { mids: store.userMessage.byId[uid], messageMap: store.message }; });
  console.log("mids", mids, uid);
  useEffect(() => {
    const container = document.querySelector("#MESSAGE_LIST_CONTAINER");
    if (mids && mids.length > 0 && container) {
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 30);
    }
  }, [mids]);

  if (!mids) return null;
  return mids.map((mid, idx) => {
    const currMsg = messageMap[mid];
    const prevMsg = messageMap[mids[idx - 1]];
    const compact = !prevMsg
      ? false
      : prevMsg.from_uid !== currMsg.from_uid
        ? false
        : (currMsg.created_at ?? 0) - (prevMsg.created_at ?? 0) < interval;
    return <TextMessage hostId={uid} key={currMsg.mid} {...currMsg} compact={compact} isFirst={idx === 0} />;
  });
};

export default memo(Index, (prev, next) => {
  return JSON.stringify(prev.uid) === JSON.stringify(next.uid);
});
