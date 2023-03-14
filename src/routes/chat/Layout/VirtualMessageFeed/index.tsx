import { useEffect, useRef, useCallback, useState } from 'react';
// import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
import { useDebounce } from 'rooks';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';

import { useLazyLoadMoreMessagesQuery, useReadMessageMutation } from '../../../../app/services/message';
import { useAppSelector } from '../../../../app/store';
import { renderMessageFragment } from '../../utils';
import NewMessageBottomTip from "../NewMessageBottomTip";
import CustomList from './CustomList';
import CustomHeader from './CustomHeader';
import { useDispatch } from 'react-redux';
import { updateHistoryMark } from '../../../../app/slices/footprint';
type Props = {
    context: "user" | "channel",
    id: number
}
// const firstMsgIndex = 10000;
// let prevMids: number[] = [];
const VirtualMessageFeed = ({ context, id }: Props) => {
    const dispatch = useDispatch();
    // const { t } = useTranslation("chat");
    // const [firstItemIndex, setFirstItemIndex] = useState(firstMsgIndex);
    const [atBottom, setAtBottom] = useState(false);
    const [loadMoreMessage, { isLoading: loadingMore, isSuccess, data: historyData }] = useLazyLoadMoreMessagesQuery();
    const vList = useRef<VirtuosoHandle | null>(null);
    const [updateReadIndex] = useReadMessageMutation();
    const updateReadDebounced = useDebounce(updateReadIndex, 300);
    const {
        historyMid = "",
        mids = [],
        selects,
        messageData,
        loginUser,
        footprint
    } = useAppSelector((store) => {
        return {
            historyMid: context == "user" ? store.footprint.historyUsers[id] : store.footprint.historyChannels[id],
            mids: context == "user" ? store.userMessage.byId[id] : store.channelMessage[id],
            selects: store.ui.selectMessages[`${context}_${id}`],
            footprint: store.footprint,
            loginUser: store.authData.user,
            messageData: store.message || {}
        };
    });

    useEffect(() => {
        if (isSuccess && historyData) {
            if (historyData.length == 0) {
                // 到顶了
                dispatch(updateHistoryMark({ type: context, id, mid: "reached" }));
            } else {
                // 记录最新的mid
                const [{ mid }] = historyData;
                dispatch(updateHistoryMark({ type: context, id, mid: `${mid}` }));
            }
        }
    }, [isSuccess, historyData, mids, context, id]);
    // useEffect(() => {
    //     console.log("diff mids", prevMids, mids);
    //     const newCount = mids.length - prevMids.length;
    //     setFirstItemIndex((prev) => prev - newCount);
    // }, [mids]);

    // 加载更多
    const handleLoadMore = useCallback(() => {
        console.log("reach start ");
        if (historyMid === "reached") return;
        let lastMid = mids.slice(0, 1)[0];
        if (historyMid) {
            lastMid = +historyMid;
        }
        // prevMids = mids;
        loadMoreMessage({ context, id, mid: lastMid });
        // return false;
    }, [mids, context, id]);
    // 自动跟随
    const handleFollowOutput = (isAtBottom: boolean) => {
        const [lastMid] = mids ? mids.slice(-1) : [0];
        const ts = new Date().getTime();
        // tricky
        const isSentByMyself = ts - lastMid < 1000;
        if (isAtBottom || isSentByMyself) {
            return isAtBottom ? "smooth" : true;
        } else {
            return false;
        }
    };
    // 滚动到底部
    const handleScrollBottom = useCallback(() => {
        const vl = vList!.current;
        if (vl) {
            vl.scrollToIndex(mids.length - 1);
        }
    }, [mids]);
    const handleBottomStateChange = (bottom: boolean) => {
        setAtBottom(bottom);
    };
    const readIndex = context == "channel" ? footprint.readChannels[id] : footprint.readUsers[id];
    return <>
        <Virtuoso
            // logLevel={LogLevel.DEBUG}
            overscan={50}
            context={{ loadingMore, id, isChannel: context == "channel" }}
            id={`VOCECHAT_FEED_${context}_${id}`}
            className='px-1 md:px-4 py-4.5 overflow-x-hidden overflow-y-scroll'
            ref={vList}
            components={{
                List: CustomList,
                Header: CustomHeader,
            }}
            // firstItemIndex={firstItemIndex}
            initialTopMostItemIndex={mids.length - 1}
            startReached={handleLoadMore}
            data={mids}
            atTopThreshold={context == "channel" ? 160 : 0}
            atBottomStateChange={handleBottomStateChange}
            atBottomThreshold={400}
            followOutput={handleFollowOutput}
            itemContent={(idx, mid) => {
                // 计算出真正的index
                // const idx = index - firstItemIndex;
                const curr = messageData[mid];
                if (!curr) return null;
                const isFirst = idx == 0;
                const prev = isFirst ? null : messageData[mids[idx - 1]];
                const read = curr?.from_uid == loginUser?.uid || mid <= readIndex;
                return renderMessageFragment({
                    selectMode: !!selects,
                    updateReadIndex: updateReadDebounced,
                    read,
                    prev,
                    curr,
                    contextId: id,
                    context
                });
            }} />
        {!atBottom && <NewMessageBottomTip context={context} id={id} scrollToBottom={handleScrollBottom} />}
    </>
        ;
};

export default VirtualMessageFeed;