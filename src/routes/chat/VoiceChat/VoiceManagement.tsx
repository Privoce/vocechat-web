import clsx from 'clsx';
import React from 'react';
import { VoicingInfo } from '../../../app/slices/voice';
import { useAppSelector } from '../../../app/store';
import Avatar from '../../../common/component/Avatar';
import IconMic from '../../../assets/icons/mic.on.svg';
import IconMicOff from '../../../assets/icons/mic.off.svg';
// import User from '../../../common/component/User';

type Props = {
    info: VoicingInfo | null
}

const VoiceManagement = ({ info }: Props) => {
    const { userData, voicingMembers } = useAppSelector(store => {
        return {
            userData: store.users.byId,
            voicingMembers: store.voice.voicingMembers
        };
    });
    if (!info) return null;
    const { context, id } = info;
    const nameClass = clsx(`text-sm text-gray-500 max-w-[190px] truncate font-semibold dark:text-white`);
    const members = voicingMembers.ids;
    const membersData = voicingMembers.byId;
    return (
        <div className='w-full h-full py-2'>
            <ul className='flex flex-col gap-2'>
                {members.map((uid) => {
                    const curr = userData[uid];
                    if (!curr) return null;
                    const { muted, speakingVolume = 0 } = membersData[uid];
                    const speaking = speakingVolume > 50;
                    return <li key={uid}>
                        <div className="flex items-center justify-between gap-6 ">
                            <div className="flex items-center gap-2 transition-opacity" style={{ opacity: `${speaking ? 0.4 : 1}` }}>
                                <div className="w-8 h-8 flex shrink-0">
                                    <Avatar
                                        width={32}
                                        height={32}
                                        className="w-full h-full rounded-full object-cover"
                                        src={curr.avatar}
                                        name={curr.name}
                                        alt="avatar"
                                    />
                                </div>
                                <span className={nameClass} title={curr?.name}>
                                    {curr?.name}
                                </span>
                            </div>
                            <div className="flex items-center">
                                {/* {muted ? <IconMicOff className="w-4" /> : <IconMic className="w-4" />} */}
                                {muted ? <IconMicOff className="w-4" /> : <IconMic className="w-4" />}
                            </div>
                        </div>
                        {/* <User uid={uid} interactive={false} /> */}
                        {/* {userData[uid]?.name} */}
                    </li>;
                })}

            </ul>
        </div>
    );
};

export default VoiceManagement;