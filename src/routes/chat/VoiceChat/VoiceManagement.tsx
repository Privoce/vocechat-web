import clsx from 'clsx';
// import React from 'react';
import { useTranslation } from 'react-i18next';

import { VoicingInfo } from '../../../app/slices/voice';
import { useAppSelector } from '../../../app/store';
import Avatar from '../../../common/component/Avatar';
import IconHeadphone from '../../../assets/icons/sound.on.svg';
import IconHeadphoneOff from '../../../assets/icons/sound.off.svg';
import IconMic from '../../../assets/icons/mic.on.svg';
import IconMicOff from '../../../assets/icons/mic.off.svg';
import StyledButton from '../../../common/component/styled/Button';
import IconCallOff from '../../../assets/icons/call.off.svg';
import Tooltip from '../../../common/component/Tooltip';
// import User from '../../../common/component/User';

type Props = {
    info: VoicingInfo | null,
    setMute: (param: boolean) => void,
    setDeafen: (param: boolean) => void,
    leave: () => void
}

const VoiceManagement = ({ info, setMute, setDeafen, leave }: Props) => {
    const { t } = useTranslation("chat");
    const { userData, voicingMembers } = useAppSelector(store => {
        return {
            userData: store.users.byId,
            voicingMembers: store.voice.voicingMembers
        };
    });
    if (!info) return null;
    const { deafen, muted } = info;
    const nameClass = clsx(`text-sm text-gray-500 max-w-[120px] truncate font-semibold dark:text-white`);
    const members = voicingMembers.ids;
    const membersData = voicingMembers.byId;
    if (info.joining) {
        return <div className='w-full h-full flex-center p-1 text-sm text-gray-600 dark:text-gray-400'>
            Connecting to voice channel...
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
                    return <li key={uid} className="flex items-center justify-between gap-6 pb-4 ">
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
                        <div className="flex items-center gap-2">
                            {/* {deafen ? <IconHeadphoneOff className="w-4" /> : <IconHeadphone className="w-4" />} */}
                            {muted ? <IconMicOff className="w-4 fill-gray-500" /> : <IconMic className="w-4 fill-gray-500" />}
                        </div>
                        {/* <User uid={uid} interactive={false} /> */}
                        {/* {userData[uid]?.name} */}
                    </li>;
                })}

            </ul>
            <div className="flex flex-col gap-2">
                <ul className='flex justify-between'>
                    <Tooltip tip={deafen ? t("undeafen") : t("deafen")} placement="top">
                        <li role={"button"} onClick={setDeafen.bind(null, !deafen)} className="py-2 px-3 rounded bg-gray-100 dark:bg-gray-900">
                            {deafen ? <IconHeadphoneOff className="fill-gray-700 dark:fill-gray-300" /> : <IconHeadphone className="fill-gray-700 dark:fill-gray-300" />}
                        </li>
                    </Tooltip>
                    <Tooltip tip={muted ? t("unmute") : t("mute")} placement="top">
                        <li role={"button"} onClick={setMute.bind(null, !muted)} className="py-2 px-3 rounded bg-gray-100 dark:bg-gray-900">
                            {muted ? <IconMicOff className="fill-gray-700 dark:fill-gray-300" /> : <IconMic className="fill-gray-700 dark:fill-gray-300" />}

                        </li>
                    </Tooltip>
                </ul>
                <StyledButton onClick={leave} className='bg-red-600 hover:!bg-red-700 text-center'>
                    <Tooltip tip={t("leave_voice")} placement="top" offset={[0, 24]} >
                        <IconCallOff className="m-auto" />
                    </Tooltip>
                </StyledButton>
            </div>
        </div>
    );
};

export default VoiceManagement;