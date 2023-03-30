// import React from 'react';
// import Tippy from '@tippyjs/react';
// import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { updateChannelVisibleAside } from '../../../app/slices/channels';
import { useAppSelector } from '../../../app/store';
import IconHeadphone from '../../../assets/icons/headphone.svg';
import Tooltip from '../../../common/component/Tooltip';
// import Dashboard from './Dashboard';

type Props = {
    context?: "channel" | "dm"
    id: number,
}

const VoiceChat = ({ id, context = "channel" }: Props) => {
    const dispatch = useDispatch();
    const { loginUser, contextData } = useAppSelector(store => { return { loginUser: store.authData.user, contextData: context == "channel" ? store.channels.byId[id] : store.users.byId[id] }; });
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
    if (!loginUser) return null;
    const visible = contextData.visibleAside == "voice";
    return (
        <Tooltip disabled={visible} tip={t("voice")} placement="left">
            <li className={`relative`} >
                <IconHeadphone className={visible ? "fill-gray-600" : "fill-gray-500"} role="button" onClick={toggleDashboard} />
            </li>
        </Tooltip>
    );
};

export default VoiceChat;