// import React from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useAppSelector } from '../../app/store';
import User from '../../common/component/User';
import IconMic from '../../assets/icons/mic.on.svg';
import IconMicOff from '../../assets/icons/mic.off.svg';
import IconCallOff from '../../assets/icons/headphone.svg';
import IconSoundOn from '../../assets/icons/sound.on.svg';
import IconSoundOff from '../../assets/icons/sound.off.svg';
import { useVoice } from '../../common/component/Voice';
import Signal from '../../common/component/Signal';
import Tooltip from '../../common/component/Tooltip';

type Props = {
    id: number,
    context?: "channel" | "dm"
}

const RTCWidget = ({ id, context = "channel" }: Props) => {
    const { t } = useTranslation("chat");
    const { leave, voicingInfo, setMute, setDeafen, joining = true } = useVoice({ context, id });
    const { loginUser, channelData, userData } = useAppSelector(store => {
        return {
            userData: store.users.byId,
            channelData: store.channels.byId,
            loginUser: store.authData.user,
        };
    });
    if (!loginUser || !voicingInfo || joining) return null;
    const name = voicingInfo.context == "channel" ? channelData[voicingInfo.id]?.name : userData[voicingInfo.id]?.name;
    if (!name) return null;
    const isReConnecting = voicingInfo.connectionState == "RECONNECTING";
    return (
        <div className='bg-gray-100 dark:bg-gray-900 flex flex-col p-2 rounded-3xl m-3 text-sm'>
            {/* {voicingInfo && */}
            <div className="flex justify-between items-center border-b border-b-gray-200 dark:border-b-gray-800 pb-2">
                <div className="flex flex-1 items-center gap-1">
                    <Signal strength={voicingInfo.downlinkNetworkQuality} />
                    <div className="flex flex-col">
                        <span className={clsx('text-green-800 font-bold', isReConnecting && `text-red-500`)}>{isReConnecting ? `Voice Reconnecting...` : `Voice Connected`}</span>
                        <span className='text-gray-600 dark:text-gray-400 text-xs truncate max-w-[170px]' >{voicingInfo.context == "channel" ? "Channel" : "DM"} / {voicingInfo.context == "channel" ? channelData[voicingInfo.id].name : userData[voicingInfo.id].name}</span>
                    </div>
                </div>
                <Tooltip tip={t("leave_voice")} placement="top">
                    <IconCallOff onClick={leave} role="button" className="fill-red-600" />
                </Tooltip>
            </div>
            {/* } */}
            <div className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-3">
                    <User uid={loginUser.uid} compact />
                    <div className="flex flex-col">
                        <span className='dark:text-white text-sm font-bold'>{loginUser.name}</span>
                        <span className='text-gray-400 text-xs'>#{loginUser.uid}</span>
                    </div>
                </div>
                {/* {voicingInfo && */}
                <div className="flex gap-2 px-1">
                    <Tooltip tip={voicingInfo.deafen ? t("undeafen") : t("deafen")} placement="top">
                        {voicingInfo.deafen ? <IconSoundOff role="button" onClick={setDeafen.bind(null, false)} /> : <IconSoundOn role="button" onClick={setDeafen.bind(null, true)} />}
                    </Tooltip>
                    <Tooltip tip={voicingInfo.muted ? t("unmute") : t("mute")} placement="top">
                        {voicingInfo.muted ?
                            <IconMicOff onClick={setMute.bind(null, false)} role="button" />
                            :
                            <IconMic onClick={setMute.bind(null, true)} role="button" />}
                    </Tooltip>
                </div>
                {/*  } */}
            </div>
        </div>
    );
};

export default RTCWidget;