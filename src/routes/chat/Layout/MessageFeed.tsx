import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import { useDebounce } from 'rooks';
import { ViewportList } from 'react-viewport-list';

import { useReadMessageMutation } from '../../../app/services/message';
import { useAppSelector } from '../../../app/store';
import EditIcon from "../../../assets/icons/edit.svg";
import { renderMessageFragment } from '../utils';


type Props = {
    context: "user" | "channel",
    id: number
}

const MessageFeed = ({ context, id }: Props) => {
    // const listRef = useRef<ViewportListRef | null>(null);
    const ref = useRef<HTMLDivElement | null>(
        null,
    );
    const { t } = useTranslation("chat");
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
    // useEffect(() => {
    //     //   滚动到记忆位置
    //     if (listRef && listRef.current) {
    //         listRef.current.scrollToIndex({ index: 5 });
    //     }
    // }, [context, id]);

    const readIndex = context == "channel" ? footprint.readChannels[id] : Number.POSITIVE_INFINITY;
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
            {isEmptyList ? null : <ViewportList
                overscan={10}
                // itemSize={100}
                initialPrerender={50}
                scrollThreshold={2000}
                // ref={listRef}
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

export default MessageFeed;