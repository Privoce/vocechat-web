// import React from 'react';
import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Waveform } from '@uiball/loaders';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { useAppSelector } from '../../../app/store';
import IconCallOff from '../../../assets/icons/call.off.svg';
import IconCallAnswer from '../../../assets/icons/call.svg';
import IconMicOff from '../../../assets/icons/mic.off.svg';
import IconMic from '../../../assets/icons/mic.on.svg';
import IconCamera from '../../../assets/icons/camera.svg';
import IconCameraOff from '../../../assets/icons/camera.off.svg';
import IconScreen from '../../../assets/icons/share.screen.svg';
import Avatar from '../Avatar';
import { VoicingInfo, updateCalling } from '../../../app/slices/voice';
import useVoice from './useVoice';
import { playAgoraVideo } from '../../utils';
import Tooltip from '../Tooltip';

type Props = {
    from: number
    to?: number
}

const DMCalling = ({ from, to = 0 }: Props) => {
    const { t } = useTranslation("chat");
    const { leave, joinVoice, joining, setMute, closeCamera, openCamera, startShareScreen, stopShareScreen } = useVoice({ id: to, context: "dm" });
    const containerRef = useRef(null);
    const dispatch = useDispatch();
    const { voicingInfo, voicingMembers, fromUser, toUser, loginUser } = useAppSelector(store => {
        return {
            voicingInfo: store.voice.voicing ?? {},
            voicingMembers: store.voice.voicingMembers,
            fromUser: store.users.byId[from],
            toUser: store.users.byId[to],
            loginUser: store.authData.user
        };
    });
    const sendByMe = loginUser?.uid !== toUser.uid;
    const handleCancel = () => {
        console.log('cancel');
        if (sendByMe || voicingMembers.ids.length == 2) {
            leave();
        }
        dispatch(updateCalling({ from: 0, to: 0 }));
    };
    const handleAnswer = () => {
        joinVoice();
    };
    useEffect(() => {
        const ids = voicingMembers.ids;
        ids.forEach(id => {
            playAgoraVideo(id);
        });
    }, [voicingMembers.ids]);
    if (!fromUser || !toUser) return null;
    const connected = voicingMembers.ids.length == 2;
    const { name, avatar } = sendByMe ? toUser : fromUser;
    const { muted, shareScreen, video } = voicingInfo as VoicingInfo;
    const { speakingVolume = 0 } = voicingMembers.byId[sendByMe ? to : from] ?? {};
    const speaking = speakingVolume > 50;
    return (
        <div ref={containerRef} className="fixed top-0 left-0 w-full h-screen z-[999] pointer-events-none flex items-center justify-end pr-10">
            <motion.aside drag dragConstraints={containerRef} dragMomentum={false} whileDrag={{ scale: 1.1 }} className={clsx(`pointer-events-auto 
        rounded bg-gray-800  relative
        shadow-lg shadow-slate-200 dark:shadow-slate-800 
        cursor-move overflow-hidden
        `, connected ? "w-80 h-96" : "w-64 h-80")}>
                <div className={clsx("w-20 h-20 flex shrink-0 relative transition-opacity mt-32 m-auto")}>
                    {speaking && <div className={clsx("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 rounded-full bg-green-500 animate-speaking", "w-[86px] h-[86px]")}></div>}
                    <Avatar
                        width={80}
                        height={80}
                        className="w-full h-full rounded-full object-cover"
                        src={avatar}
                        name={name}
                        alt="avatar"
                    />
                </div>
                <div className="absolute left-0 top-0 w-full h-full" id={`CAMERA_${from}`}>
                    {/* from camera video */}
                </div>
                <div className="absolute right-0-0 top-0 w-40 h-32" id={`CAMERA_${to}`}>
                    {/* to camera video */}
                </div>
                <div className={clsx("absolute left-0 top-0 py-5 w-full h-full flex flex-col justify-between items-center", connected ? "bg-transparent" : "bg-gray-800")}>
                    {!connected && <>
                        <div className="flex flex-col gap-2 items-center">
                            <div className="rounded-full overflow-hidden w-20 h-20 shrink-0">
                                <Avatar name={name} src={avatar} width={80} height={80} className='h-20' />
                            </div>
                            <span className='text-white mb-2'>{name}</span>
                        </div>
                        <div className='flex flex-col gap-1 items-center my-4'>
                            <Waveform
                                size={18}
                                lineWeight={3}
                                speed={1}
                                color='#aaa'
                            />
                            <span className='text-xs text-gray-600 dark:text-gray-400'>{sendByMe ? `Calling` : `Incoming call`}</span>
                        </div>
                    </>
                    }
                    <div className={clsx("flex gap-3", connected ? "h-full items-end" : "")}>
                        <Tooltip tip={"Disconnect"} placement="top">
                            <button onClick={handleCancel} className='flex-center bg-red-600 hover:bg-red-700 py-2 px-3 rounded-lg'>
                                <IconCallOff className="w-6 h-6" />
                            </button>
                        </Tooltip>
                        {!sendByMe && !connected &&
                            <Tooltip tip={"Answer"} placement="top">
                                <button disabled={joining} onClick={handleAnswer} className='flex-center bg-green-600 hover:bg-green-700 py-2 px-3 rounded-lg'>
                                    <IconCallAnswer className="w-6 h-6 fill-white" />
                                </button>
                            </Tooltip>
                        }
                        {connected && <>
                            <Tooltip tip={muted ? t("unmute") : t("mute")} placement="top">
                                <button onClick={setMute.bind(null, !muted)} className="flex-center py-2 px-3 rounded-lg bg-gray-100 dark:bg-gray-900">
                                    {muted ? <IconMicOff className="fill-gray-700 dark:fill-gray-200" /> : <IconMic className="fill-gray-700 dark:fill-gray-200" />}
                                </button>
                            </Tooltip>
                            <Tooltip tip={video ? t("camera_off") : t("camera_on")} placement="top">
                                <button onClick={video ? closeCamera : openCamera} className="flex-center py-2 px-3 rounded-lg bg-gray-100 dark:bg-gray-900">
                                    {video ? <IconCamera className="fill-gray-700 dark:fill-gray-200" /> : <IconCameraOff className="fill-gray-700 dark:fill-gray-200" />}
                                </button>
                            </Tooltip>
                            <Tooltip tip={"Share Screen"} placement="top">
                                <button onClick={shareScreen ? stopShareScreen : startShareScreen} className={clsx("flex-center py-2 px-3 rounded-lg ", shareScreen ? "bg-green-700" : "bg-gray-100 dark:bg-gray-900")}>
                                    <IconScreen className={clsx("dark:fill-gray-200 w-6 h-6", shareScreen ? "fill-gray-200" : "fill-gray-700")} />
                                </button>
                            </Tooltip>

                        </>}
                    </div>

                </div>
            </motion.aside>
        </div>
    );
};

export default DMCalling;