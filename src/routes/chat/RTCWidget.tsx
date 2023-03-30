import React from 'react';
import { useAppSelector } from '../../app/store';
import User from '../../common/component/User';
import IconHeadphone from '../../assets/icons/headphone.svg';
import IconHeadphoneOff from '../../assets/icons/headphone.off.svg';
import IconMic from '../../assets/icons/mic.on.svg';
import IconMicOff from '../../assets/icons/mic.off.svg';
import IconCallOff from '../../assets/icons/call.off.svg';
// import IconSoundOn from '../../assets/icons/sound.on.svg';
import { useVoice } from '../../common/component/Voice';
import Signal from '../../common/component/Signal';

type Props = {
    id: number,
    context?: "channel" | "dm"
}

const RTCWidget = ({ id, context = "channel" }: Props) => {
    const { leave, voicingInfo, setMute, setDeafen } = useVoice({ context, id });
    const { loginUser, channelData, userData } = useAppSelector(store => {
        return {
            userData: store.users.byId,
            channelData: store.channels.byId,
            loginUser: store.authData.user,
        };
    });
    if (!loginUser || !voicingInfo) return null;
    const name = voicingInfo.context == "channel" ? channelData[voicingInfo.id]?.name : userData[voicingInfo.id]?.name;
    if (!name) return null;
    return (
        <div className='bg-gray-100 dark:bg-gray-900 flex flex-col p-2 rounded-3xl m-3 text-sm'>
            {/* {voicingInfo && */}
            <div className="flex justify-between items-center border-b border-b-gray-200 dark:border-b-gray-800 pb-2">
                <div className="flex flex-1 items-center gap-1">
                    <Signal strength={voicingInfo.downlinkNetworkQuality} />
                    <div className="flex flex-col">
                        <span className='text-green-800'>Voice Connected</span>
                        <span className='text-gray-600 dark:text-gray-400 text-xs truncate max-w-[170px]' >{voicingInfo.context == "channel" ? "Channel" : "DM"} / {voicingInfo.context == "channel" ? channelData[voicingInfo.id].name : userData[voicingInfo.id].name}</span>
                    </div>
                </div>
                <IconCallOff onClick={leave} role="button" className="fill-red-600" />
            </div>
            {/* } */}
            <div className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-3">
                    <User uid={loginUser.uid} compact />
                    <div className="flex flex-col">
                        <span className='dark:text-white text-sm'>{loginUser.name}</span>
                        <span className='text-gray-400 text-xs'>#{loginUser.uid}</span>
                    </div>
                </div>
                {/* {voicingInfo && */}
                <div className="flex gap-2 px-1">
                    {voicingInfo.deafen ? <IconHeadphoneOff role="button" onClick={setDeafen.bind(null, false)} /> : <IconHeadphone role="button" onClick={setDeafen.bind(null, true)} />}
                    {voicingInfo.muted ?
                        <IconMicOff onClick={setMute.bind(null, false)} role="button" />
                        :
                        <IconMic onClick={setMute.bind(null, true)} role="button" />}
                </div>
                {/*  } */}
            </div>
        </div>
    );
};

export default RTCWidget;