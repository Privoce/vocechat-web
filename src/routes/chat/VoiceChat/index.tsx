// import React from 'react';
// import Tippy from '@tippyjs/react';
// import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { updateChannelVisibleAside } from '../../../app/slices/footprint';
import { useAppSelector } from '../../../app/store';
import IconHeadphone from '../../../assets/icons/headphone.svg';
import Tooltip from '../../../common/component/Tooltip';
import { useVoice } from '../../../common/component/Voice';
import { useGetAgoraConfigQuery } from '../../../app/services/server';

type Props = {
    context?: "channel" | "dm"
    id: number,
}

const VoiceChat = ({ id, context = "channel" }: Props) => {
    const { joinVoice, joined, joining = false, joinedAtThisContext } = useVoice({ id, context });
    const dispatch = useDispatch();
    const { loginUser, voiceList, visibleAside } = useAppSelector(store => {
        return {
            loginUser: store.authData.user,
            contextData: context == "channel" ? store.channels.byId[id] : store.users.byId[id],
            voiceList: store.voice.list,
            visibleAside: context == "channel" ? store.footprint.channelAsides[id] : null,
        };
    });
    const { data: agoraConfig } = useGetAgoraConfigQuery(undefined, { skip: !loginUser?.is_admin });
    const { t } = useTranslation("chat");
    const toggleDashboard = () => {
        if (context == "channel") {
            dispatch(updateChannelVisibleAside({
                id,
                aside: visibleAside == "voice" ? null : "voice"
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
    // 只有admin才能看到入口，后续会改
    if (!loginUser || !loginUser.is_admin || !agoraConfig?.enabled) return null;
    const visible = visibleAside == "voice";
    const memberCount = voiceList.find((v) => v.context == context && v.id == id)?.memberCount ?? 0;
    const badgeClass = `absolute -top-2 -right-2 w-4 h-4 rounded-full bg-primary-400 text-white `;
    return (
        <Tooltip disabled={visible} tip={t("voice")} placement="left">
            <li className={`relative group`} >
                <IconHeadphone className={visible ? "fill-gray-600" : "fill-gray-500"} role="button" onClick={joinedAtThisContext ? toggleDashboard : handleJoin} />
                {visible ?
                    null
                    : <>
                        {memberCount > 0 && <span className={`${badgeClass} flex-center font-bold text-[10px] group-hover:invisible`}>{memberCount}</span>}
                        <span className={`${badgeClass} text-xs flex-center invisible group-hover:visible`}>
                            <em className='not-italic'>+</em>
                        </span>
                    </>}
            </li>
        </Tooltip>
    );
};

export default VoiceChat;