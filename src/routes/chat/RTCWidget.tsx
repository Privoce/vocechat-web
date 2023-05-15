// import React from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useAppSelector } from '../../app/store';
import User from '../../components/User';
import IconMic from '@/assets/icons/mic.on.svg';
import IconMicOff from '@/assets/icons/mic.off.svg';
import IconCallOff from '@/assets/icons/headphone.svg';
import IconSoundOn from '@/assets/icons/sound.on.svg';
import IconSoundOff from '@/assets/icons/sound.off.svg';
// import IconCameraOff from '@/assets/icons/camera.off.svg';
import IconCamera from '@/assets/icons/camera.svg';
import IconScreen from '@/assets/icons/share.screen.svg';
import { useVoice } from '../../components/Voice';
import Signal from '../../components/Signal';
import Tooltip from '../../components/Tooltip';
import { ChatContext } from '../../types/common';

type Props = {
    id: number,
    context?: ChatContext
}

const RTCWidget = ({ id, context = "channel" }: Props) => {
    const { t } = useTranslation("chat");
    const { leave, voicingInfo, setMute, setDeafen, joining = true, openCamera, closeCamera, startShareScreen, stopShareScreen } = useVoice({ context, id });
    const { loginUser, channelData, userData } = useAppSelector(store => {
        return {
            userData: store.users.byId,
            channelData: store.channels.byId,
            loginUser: store.authData.user,
        };
    });
    if (!loginUser || !voicingInfo || joining) return null;
    // const name = voicingInfo.context == "channel" ? channelData[voicingInfo.id]?.name : userData[voicingInfo.id]?.name;
    // if (!name) return null;
    const isReConnecting = voicingInfo.connectionState == "RECONNECTING";
    return (
        <div className='bg-gray-100 dark:bg-gray-900 flex flex-col p-2 rounded-3xl m-3 mb-4 text-sm'>
            <div className="border-b border-b-gray-200 dark:border-b-gray-800 pb-2">
                <div className="flex justify-between items-center">
                    <div className="flex flex-1 items-center gap-1">
                        <Signal strength={voicingInfo.downlinkNetworkQuality} />
                        <div className="flex flex-col">
                            <span className={clsx('text-green-800 font-bold', isReConnecting && `text-red-500`)}>{isReConnecting ? `Voice Reconnecting...` : `Voice Connected`}</span>
                            <span className='text-gray-600 dark:text-gray-400 text-xs truncate max-w-[170px]' >{voicingInfo.context == "channel" ? "Channel" : "DM"} / {voicingInfo.context == "channel" ? channelData[voicingInfo.id]?.name : userData[voicingInfo.id]?.name}</span>
                        </div>
                    </div>
                    <Tooltip tip={t("leave_voice")} placement="top">
                        <IconCallOff onClick={leave} role="button" className="fill-red-600" />
                    </Tooltip>
                </div>
                <div className={clsx("flex items-center justify-around gap-2 mt-3 text-sm font-semibold text-gray-800 dark:text-gray-200")}>
                    <button onClick={voicingInfo.video ? closeCamera : openCamera} className={clsx('rounded-lg py-2 px-5 flex items-center gap-1', voicingInfo.video ? "bg-green-700 text-gray-200" : "bg-white/50 dark:bg-black/50 ")}>
                        <IconCamera className={clsx("dark:fill-gray-200 w-6 h-6", voicingInfo.video ? "fill-gray-200" : "fill-gray-800")} />
                        <span>Video</span>
                    </button>
                    <button onClick={voicingInfo.shareScreen ? stopShareScreen : startShareScreen} className={clsx('rounded-lg py-2 px-5 flex items-center gap-1', voicingInfo.shareScreen ? "bg-green-700 text-gray-200" : "bg-white/50 dark:bg-black/50 ")}>
                        <IconScreen className={clsx("dark:fill-gray-200 w-6 h-6", voicingInfo.shareScreen ? "fill-gray-200" : "fill-gray-800")} />
                        <span>Screen</span>
                    </button>
                </div>
            </div>
            <div className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-3">
                    <User uid={loginUser.uid} compact />
                    <div className="flex flex-col">
                        <span className='dark:text-white text-sm font-bold'>{loginUser.name}</span>
                        <span className='text-gray-400 text-xs'>#{loginUser.uid}</span>
                    </div>
                </div>
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
            </div>
        </div>
    );
};

export default RTCWidget;