// import React from 'react';
// import Tippy from '@tippyjs/react';
// import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { updateChannelVisibleAside } from '../../../app/slices/channels';
import { useAppSelector } from '../../../app/store';
import IconHeadphone from '../../../assets/icons/headphone.svg';
import Tooltip from '../../../common/component/Tooltip';
import { useVoice } from '../../../common/component/Voice';

type Props = {
    context?: "channel" | "dm"
    id: number,
}

const VoiceChat = ({ id, context = "channel" }: Props) => {
    const { joinVoice, joined, joining = false, joinedAtThisContext } = useVoice({ id, context });
    const dispatch = useDispatch();
    const { loginUser, contextData, voiceList } = useAppSelector(store => {
        return {
            loginUser: store.authData.user,
            contextData: context == "channel" ? store.channels.byId[id] : store.users.byId[id],
            voiceList: store.voice.list
        };
    });
    const { t } = useTranslation("chat");
    const toggleDashboard = () => {
        if (context == "channel") {
            dispatch(updateChannelVisibleAside({
                id,
                aside: contextData.visibleAside == "voice" ? null : "voice"
            }));
        }
        // todo DM
    };
    const handleJoin = () => {
        if (joining || joined) {
            alert("You have joined another channel, please leave first!");
            return;
        }
        joinVoice();
        if (context == "channel") {
            dispatch(updateChannelVisibleAside({
                id,
                aside: "voice"
            }));
        }
    };
    if (!loginUser) return null;
    const visible = contextData.visibleAside == "voice";
    const memberCount = voiceList.find((v) => v.context == context && v.id == id)?.memberCount ?? 0;
    const badgeClass = `absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary-400 text-white `;
    return (
        <Tooltip disabled={visible} tip={t("voice")} placement="left">
            <li className={`relative group`} >
                <IconHeadphone className={visible ? "fill-gray-600" : "fill-gray-500"} role="button" onClick={joinedAtThisContext ? toggleDashboard : handleJoin} />
                {visible ? null : memberCount > 0 ? <span className={`${badgeClass} flex-center font-bold text-[10px]`}>{memberCount}</span> : <span className={`${badgeClass} hidden text-xs group-hover:flex-center`}>
                    <em className='font-normal'>+</em>
                </span>}
            </li>
        </Tooltip>
    );
};

export default VoiceChat;