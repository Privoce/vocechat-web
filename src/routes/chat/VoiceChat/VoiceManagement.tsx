import clsx from 'clsx';
import { useEffect } from 'react';

import { VoicingInfo, updatePin } from '../../../app/slices/voice';
import { useAppSelector } from '../../../app/store';
import Avatar from '../../../components/Avatar';
import IconMic from '@/assets/icons/mic.on.svg';
import IconMicOff from '@/assets/icons/mic.off.svg';
import IconFullscreen from '@/assets/icons/fullscreen.svg';
import { playAgoraVideo } from '@/utils';
import { ChatContext } from '../../../types/common';
import Operations from '@/components/Voice/Operations';
import { updateChannelVisibleAside } from '@/app/slices/footprint';
import { useDispatch } from 'react-redux';

type Props = {
    id: number,
    context: ChatContext,
    info: VoicingInfo | null,
}

const VoiceManagement = ({ id, context, info, }: Props) => {
    const dispatch = useDispatch();
    const { userData, voicingMembers } = useAppSelector(store => {
        return {
            userData: store.users.byId,
            voicingMembers: store.voice.voicingMembers
        };
    });
    useEffect(() => {
        const ids = voicingMembers.ids;
        ids.forEach(id => {
            playAgoraVideo(id);
        });
    }, [voicingMembers.ids]);
    const handleFullscreen = (uid?: number) => {
        if (context == "channel") {
            dispatch(updateChannelVisibleAside({ id, aside: "voice_fullscreen" }));
            if (uid) {
                dispatch(updatePin({ uid, action: "pin" }));
            }
        }
    };
    if (!info) return null;
    const nameClass = clsx(`text-sm text-gray-500 max-w-[120px] truncate font-semibold dark:text-white`);
    const members = voicingMembers.ids;
    const membersData = voicingMembers.byId;
    if (info.joining) {
        return <div className='w-full h-full flex-center p-1 text-sm text-gray-600 dark:text-gray-400'>
            Connecting to voice channel...
        </div>;
    }
    if (info.connectionState == "RECONNECTING") {
        return <div className='w-full h-full flex-center flex-col gap-1 p-1 '>
            <span className='text-red-300'>
                Reconnecting...
            </span>
            <span className='text-xs text-red-500'>Please check network connection!</span>
        </div>;
    }
    return (
        <div className='w-full h-full py-2 flex flex-col'>
            <ul className='flex grow flex-col'>
                {members.map((uid) => {
                    const curr = userData[uid];
                    if (!curr) return null;
                    const { muted, speakingVolume = 0 } = membersData[uid];
                    const speaking = speakingVolume > 50;
                    return <li key={uid} className='pb-4'>
                        <div className="flex items-center justify-between gap-6 pb-2">
                            <div className="flex items-center gap-2 transition-opacity">
                                <div className={clsx("w-8 h-8 flex shrink-0 relative")}>
                                    {speaking && <div className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 rounded-full bg-green-500 animate-speaking w-[36px] h-[36px]"></div>}
                                    <Avatar
                                        width={32}
                                        height={32}
                                        className="w-full h-full rounded-full object-cover z-20"
                                        src={curr.avatar}
                                        name={curr.name}
                                        alt="avatar"
                                    />
                                </div>
                                <span className={nameClass} title={curr?.name}>
                                    {curr?.name}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                {/* {deafen ? <IconHeadphoneOff className="w-4" /> : <IconHeadphone className="w-4" />} */}
                                {muted ? <IconMicOff className="w-4 fill-gray-500 dark:fill-gray-400" /> : <IconMic className="w-4 fill-gray-500  dark:fill-gray-400" />}
                            </div>
                        </div>
                        <div className="overflow-hidden group rounded relative" onDoubleClick={handleFullscreen.bind(null, uid)}>
                            <div id={`CAMERA_${uid}`} className="w-[98%] m-auto">
                                {/* camera placeholder */}
                            </div>
                            <button onClick={handleFullscreen.bind(null, uid)} className="invisible group-hover:visible w-5 h-5 p-1 bg-black/40 top-1 right-1.5 absolute rounded">
                                <IconFullscreen className="w-full h-full fill-white" />
                            </button>
                        </div>
                    </li>;
                })}
            </ul>
            <div className="grid grid-rows-2 grid-cols-4 gap-2">
                <Operations id={id} context={context} />
            </div>
        </div>
    );
};

export default VoiceManagement;