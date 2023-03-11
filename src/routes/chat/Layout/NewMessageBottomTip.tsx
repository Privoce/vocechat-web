import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../app/store';
import getUnreadCount from '../utils';
import { triggerScrollHeight } from './MessageFeed';

type Props = {
    context: "channel" | "user",
    id: number
}
// linear-gradient(135deg,_#3C8CE7_0%,_#00EAFF_100%)
const NewMessageBottomTip = ({ context, id }: Props) => {
    const [visible, setVisible] = useState(false);
    const { t } = useTranslation("chat");
    const {
        readIndex,
        mids,
        messageData,
        loginUid,
    } = useAppSelector((store) => {
        return {
            readIndex: context == "channel" ? store.footprint.readChannels[id] : store.footprint.readUsers[id],
            mids: context == "user" ? store.userMessage.byId[id] : store.channelMessage[id],
            selects: store.ui.selectMessages[`${context}_${id}`],
            loginUid: store.authData.user?.uid ?? 0,
            data: context == "channel" ? store.channels.byId[id] : undefined,
            messageData: store.message || {}
        };
    });
    const { unreads = 0 } = getUnreadCount({
        mids,
        readIndex,
        messageData,
        loginUid
    });
    useEffect(() => {
        const container = document.querySelector(`#VOCECHAT_FEED_${context}_${id}`) as HTMLElement;
        if (container) {
            const { scrollHeight, scrollTop, offsetHeight } = container;
            const deltaNum = scrollHeight - scrollTop - offsetHeight;
            const showTheTip = deltaNum > triggerScrollHeight && unreads > 0;
            console.log("show the tip", showTheTip);
            setVisible(showTheTip);
        }
    }, [context, id, unreads]);
    const handleMarkRead = () => {
        const container = document.querySelector(`#VOCECHAT_FEED_${context}_${id}`) as HTMLElement;
        if (container) {
            // scroll to bottom
            container.classList.add("scroll-smooth");
            container.scrollTop = container.scrollHeight;
            container.classList.remove("scroll-smooth");
            setVisible(false);
        }
    };
    return (
        <aside className={clsx(`absolute -top-2 right-4 -translate-y-full
                                justify-between text-xs
                                rounded-full py-1 px-3 text-white z-10 
                                bg-gradient-to-tl from-[#3C8CE7] to-[#00EAFF]`,
            visible ? "flex" : "hidden")}>
            <button onClick={handleMarkRead}>{t("new_msg", { num: unreads })}</button>
            <span className='absolute -left-1 -translate-x-full'>👇</span>
        </aside>
    );
};

export default NewMessageBottomTip;