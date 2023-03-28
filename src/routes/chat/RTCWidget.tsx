import React from 'react';
import { useAppSelector } from '../../app/store';
import User from '../../common/component/User';
import IconHeadphone from '../../assets/icons/headphone.svg';
import IconMic from '../../assets/icons/mic.on.svg';
import IconSoundOn from '../../assets/icons/sound.on.svg';
import IconSignal from '../../assets/icons/signal.svg';
import { useVoice } from '../../common/component/Voice';

type Props = {
    id: number,
    context?: "channel" | "dm"
}

const RTCWidget = ({ id, context = "channel" }: Props) => {
    const { leave } = useVoice({ context, id });
    const { loginUser, voicingInfo, channelData, userData } = useAppSelector(store => {
        return {
            userData: store.users.byId,
            channelData: store.channels.byId,
            loginUser: store.authData.user,
            voicingInfo: store.voice.voicing
        };
    });
    if (!loginUser) return null;
    return (
        <div className='bg-gray-100 dark:bg-gray-900 flex flex-col p-2 rounded-3xl m-3 text-sm'>
            {voicingInfo &&
                <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3 mb-2">
                    <div className="flex items-center gap-1">
                        <IconSignal />
                        <div className="flex flex-col">
                            <span className='text-green-800'>Voice Connected</span>
                            <span className='text-gray-600 dark:text-gray-400 text-xs'>{voicingInfo.context == "channel" ? "Channel" : "DM"} / {voicingInfo.context == "channel" ? channelData[voicingInfo.id].name : userData[voicingInfo.id].name}</span>
                        </div>
                    </div>
                    <IconHeadphone onClick={leave} role="button" className="fill-red-600" />
                </div>
            }
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <User uid={loginUser.uid} compact />
                    <div className="flex flex-col">
                        <span className='dark:text-white text-sm'>{loginUser.name}</span>
                        <span className='text-gray-400 text-xs'>#{loginUser.uid}</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <IconSoundOn role="button" />
                    <IconMic role="button" />
                </div>
            </div>
        </div>
    );
};

export default RTCWidget;