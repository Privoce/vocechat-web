import { memo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import { useDebounce, useLocalstorageState } from 'rooks';
import { ViewportList, ViewportListRef } from 'react-viewport-list';
import { Waveform } from '@uiball/loaders';
import clsx from 'clsx';

import { useLazyLoadMoreMessagesQuery, useReadMessageMutation } from '../../../app/services/message';
import { useAppSelector } from '../../../app/store';
import EditIcon from "../../../assets/icons/edit.svg";
import { renderMessageFragment } from '../utils';
import { KEY_UID } from '../../../app/config';
// import LoadMore from '../LoadMore';

const checkHistory = (key: string) => {
    const currUid = localStorage.getItem(KEY_UID) ?? "";
    const _key = `${currUid}_${key}`;
    const local = Number(localStorage.getItem(_key) ?? 0);
    return local == 0;
};

const setHistory = (key: string) => {
    const currUid = localStorage.getItem(KEY_UID) ?? "";
    const _key = `${currUid}_${key}`;
    localStorage.setItem(_key, "1");
};
type Props = {
    context: "user" | "channel",
    id: number
}
const triggerScrollHeight = 400;
const MessageFeed = ({ context, id }: Props) => {
    const { t } = useTranslation("chat");
    const [loadMoreMessage, { isLoading: loadingMore, isSuccess, data: historyData }] = useLazyLoadMoreMessagesQuery();
    const [historyMid, setHistoryMid] = useLocalstorageState(`history_mid_${context}_${id}`, "");
    const listRef = useRef<ViewportListRef | null>(null);
    const ref = useRef<HTMLDivElement | null>(
        null,
    );
    const { pathname } = useLocation();
    const [updateReadIndex] = useReadMessageMutation();
    const updateReadDebounced = useDebounce(updateReadIndex, 300);
    const {
        mids,
        selects,
        data,
        messageData,
        loginUser,
        footprint
    } = useAppSelector((store) => {
        return {
            mids: context == "user" ? store.userMessage.byId[id] : store.channelMessage[id],
            selects: store.ui.selectMessages[`${context}_${id}`],
            footprint: store.footprint,
            loginUser: store.authData.user,
            data: context == "channel" ? store.channels.byId[id] : undefined,
            messageData: store.message || {}
        };
    });
    const debouncedScrollHandler = useDebounce(() => {
        const container = ref ? ref.current : null;
        if (container && historyMid && !loadingMore) {
            if (container.scrollTop <= 200) {
                // pull up
                console.log("start pul up");
                loadMoreMessage({ context, id, mid: +historyMid });
            }
        }
    }, 500);
    useEffect(() => {
        if (isSuccess && historyData) {
            if (historyData.length == 0) {
                // 到顶了
                setHistory(`history_${context}_${id}`);
            } else {
                // 记录最新的mid
                const [{ mid }] = historyData;
                setHistoryMid(String(mid));
            }
        }
    }, [isSuccess, historyData, context, id]);

    useEffect(() => {
        // context changed, scroll to bottom
        console.log("listRef", listRef);
        if (listRef && listRef.current) {
            const list = listRef.current;
            list.scrollToIndex({
                prerender: 40,
                index: Number.POSITIVE_INFINITY
            });
        }
        const hasHistory = checkHistory(`history_${context}_${id}`);
        const container = ref ? ref.current : null;
        if (hasHistory && container) {
            container.addEventListener("scroll", debouncedScrollHandler);
        }
        return () => {
            if (hasHistory && container) {
                container.removeEventListener("scroll", debouncedScrollHandler);
            }
        };
    }, [context, id]);
    useEffect(() => {
        //  check current scroll position first, scroll to bottom only when under the trigger number
        if (ref && ref.current) {
            const container = ref.current;
            const { scrollHeight, scrollTop, offsetHeight } = container;
            const deltaNum = scrollHeight - scrollTop - offsetHeight;
            console.log("delta", deltaNum);
            // sent by myself (tricky!)
            const [lastMid] = mids ? mids.slice(-1) : [0];
            const ts = new Date().getTime();
            const isSentByMyself = ts - lastMid < 1000;
            if (deltaNum < triggerScrollHeight) {
                container.classList.add("scroll-smooth");
                // scroll to bottom
                container.scrollTop = container.scrollHeight;
                container.classList.remove("scroll-smooth");
            } else if (isSentByMyself) {
                container.scrollTop = container.scrollHeight;
            }
        }
        // 首次进入，就用mids
        const lastMid = mids ? mids.slice(0, 1)[0] : "";
        if (!historyMid && lastMid) {
            setHistoryMid(`${lastMid}`);
        }
    }, [mids, historyMid]);

    // const handleMessageListChange = (data: [number, number]) => {
    //     const [first, last] = data;
    //     // todo
    //     // console.log("index changed", data);
    // };
    const readIndex = context == "channel" ? footprint.readChannels[id] : footprint.readUsers[id];
    const isEmptyList = !mids || mids.length == 0;
    return (
        <article ref={ref} id={`VOCECHAT_FEED_${context}_${id}`} className="w-full h-full px-1 md:px-4 py-4.5 overflow-x-hidden overflow-y-scroll will-change-contents">
            {context == "channel" && <div className="pt-14 px-1 md:px-0 flex flex-col items-start gap-2">
                <h2 className="font-bold text-4xl dark:text-white">{t("welcome_channel", { name: data?.name })}</h2>
                <p className="text-gray-600 dark:text-gray-300">{t("welcome_desc", { name: data?.name })} </p>
                {loginUser?.is_admin && (
                    <NavLink to={`/setting/channel/${id}/overview?f=${pathname}`} className="flex items-center gap-1 bg-clip-text text-fill-transparent bg-gradient-to-r from-blue-500 to-primary-400 ">
                        <EditIcon className="w-4 h-4 fill-blue-500" />
                        {t("edit_channel")}
                    </NavLink>
                )}
            </div>}
            <div className={clsx("mt-2 w-full py-2", loadingMore ? "flex-center" : "hidden")} >
                <Waveform size={18} lineWeight={4} speed={1} color="#ccc" />
            </div>
            {isEmptyList ? null : <ViewportList
                // onViewportIndexesChange={handleMessageListChange}
                overscan={10}
                // itemSize={100}
                initialPrerender={40}
                scrollThreshold={2000}
                ref={listRef}
                viewportRef={ref}
                items={mids}
            >
                {((mid, idx) => {
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
                })}
            </ViewportList>}
        </article>
    );
};

export default memo(MessageFeed);