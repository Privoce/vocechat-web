// import React from 'react'
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import clsx from "clsx";

import { useAppSelector } from "@/app/store";
import Tooltip from "@/components/Tooltip";
import IconCallOff from '@/assets/icons/call.off.svg';
import IconCallAnswer from '@/assets/icons/call.svg';
import IconMicOff from '@/assets/icons/mic.off.svg';
import IconMic from '@/assets/icons/mic.on.svg';
import IconCamera from '@/assets/icons/camera.svg';
import IconCameraOff from '@/assets/icons/camera.off.svg';
import IconScreen from '@/assets/icons/share.screen.svg';
import { VoicingInfo, updateCallInfo } from "@/app/slices/voice";
import { useVoice } from "@/components/Voice";
import { playAgoraVideo } from "@/utils";
import Avatar from "@/components/Avatar";

type VoicingMember = {
    id: number,
    video: boolean,
    speaking: boolean,
    name: string,
    avatar?: string
}
type BlockProps = {
    sendByMe: boolean;
    connected: boolean;
    from: VoicingMember,
    to: VoicingMember
}
const VoicingBlocks = ({ sendByMe, connected, from, to }: BlockProps) => {
    const blocks = [from, to].map(({ id, speaking, name, avatar, video }, idx) => {
        const showWaiting = idx == 1 && !connected && !sendByMe;
        const showToWaiting = idx == 1 && !connected && sendByMe;
        return <div key={id} className={clsx("relative flex-center", video ? "w-80 h-60 overflow-hidden rounded" : "")}>
            <div className={clsx("w-20 h-20 flex shrink-0 relative transition-opacity", showToWaiting && "animate-pulse", showWaiting && "opacity-40")}>
                {speaking && <div className={clsx("z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 rounded-full bg-green-500 animate-speaking", "w-[86px] h-[86px]")}></div>}
                {showToWaiting && <div className={clsx("z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-400", "w-[88px] h-[88px]")}></div>}
                <Avatar
                    width={80}
                    height={80}
                    className={clsx("z-20 w-full h-full rounded-full object-cover")}
                    src={avatar}
                    name={name}
                    alt="avatar"
                />
            </div>
            <div className="z-30 absolute left-0 top-0 w-full h-full" id={`CAMERA_${id}`}>
                {/* camera video */}
            </div>
        </div>;
    }
    );
    return <>{blocks}</>;
};
type Props = {
    uid: number
}
const DMVoice = ({ uid }: Props) => {
    const dispatch = useDispatch();
    const { t } = useTranslation("chat");
    const { voice: {
        callingFrom, callingTo, voicing: voicingInfo, voicingMembers
    }, userData, loginUser } = useAppSelector(store => {
        return {
            voice: store.voice,
            userData: store.users.byId,
            loginUser: store.authData.user
        };
    });
    const { leave, joinVoice, joining, setMute, closeCamera, openCamera, startShareScreen, stopShareScreen } = useVoice({ id: callingTo, context: "dm" });
    useEffect(() => {
        const ids = voicingMembers.ids;
        ids.forEach(id => {
            playAgoraVideo(id);
        });
    }, [voicingMembers.ids]);
    if (![callingFrom, callingTo].includes(uid)) return null;

    const { name: fromUsername, avatar: fromAvatar } = userData[callingFrom];
    const { name: toUsername, avatar: toAvatar, uid: toUid } = userData[callingTo];
    const sendByMe = loginUser?.uid !== toUid;
    const handleCancel = () => {
        console.log('cancel');
        if (sendByMe || voicingMembers.ids.length == 2) {
            leave();
        }
        dispatch(updateCallInfo({ from: 0, to: 0 }));
    };
    const handleAnswer = () => {
        joinVoice();
    };
    const connected = voicingMembers.ids.length == 2;
    const { muted, shareScreen, video } = voicingInfo ?? {} as VoicingInfo;
    const { speakingVolume: toSpeakingVol = 0, video: toVideo = false, shareScreen: toScreen = false } = voicingMembers.byId[callingTo] ?? {};
    const toSpeaking = toSpeakingVol > 50;
    const { speakingVolume: fromSpeakingVol = 0, video: fromVideo = false, shareScreen: fromScreen = false } = voicingMembers.byId[callingFrom] ?? {};
    const fromSpeaking = fromSpeakingVol > 50;
    return (
        <div className="py-4 px-10 flex flex-col items-center gap-3 bg-slate-200 dark:bg-slate-800">
            <div className="flex gap-4">
                <VoicingBlocks sendByMe={sendByMe} connected={connected} from={{
                    id: callingFrom,
                    video: fromVideo || fromScreen,
                    speaking: fromSpeaking,
                    name: fromUsername,
                    avatar: fromAvatar
                }} to={{
                    id: callingTo,
                    video: toVideo || toScreen,
                    speaking: toSpeaking,
                    name: toUsername,
                    avatar: toAvatar
                }} />
            </div>
            <div className={clsx("flex gap-3", connected ? "h-full items-end" : "")}>
                {(sendByMe || connected) && <Tooltip tip={"Disconnect"} placement="top">
                    <button onClick={handleCancel} className='flex-center bg-red-600 hover:bg-red-700 py-2 px-3 rounded-lg'>
                        <IconCallOff className="w-6 h-6" />
                    </button>
                </Tooltip>}
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
    );
};

export default DMVoice;