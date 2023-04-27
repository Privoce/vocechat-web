import { useEffect, useState, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import IconMic from '../../assets/icons/mic.on.svg';
import IconMicOff from '../../assets/icons/mic.off.svg';
import IconCameraOff from '../../assets/icons/camera.off.svg';
import IconPin from '../../assets/icons/pin.svg';
import IconCamera from '../../assets/icons/camera.svg';
import IconScreen from '../../assets/icons/share.screen.svg';
import IconExitScreen from '../../assets/icons/fullscreen.exit.svg';
import IconCallOff from '../../assets/icons/call.off.svg';
import { ChatContext } from '../../types/common';
import { useAppSelector } from '../../app/store';
import Avatar from '../../common/component/Avatar';
import { playAgoraVideo } from '../../common/utils';
import { updateChannelVisibleAside } from '../../app/slices/footprint';
import Tooltip from '../../common/component/Tooltip';
import { useVoice } from '../../common/component/Voice';
import StyledButton from '../../common/component/styled/Button';

type Props = {
    context: ChatContext,
    id: number
}

const VoiceFullscreen = ({ id, context }: Props) => {
    const [speakingIndex, setSpeakingIndex] = useState(0);
    const [pin, setPin] = useState<number | undefined>(undefined);
    const dispatch = useDispatch();
    const { t } = useTranslation("chat");
    const { voicingInfo, setMute, leave, closeCamera, openCamera, startShareScreen, stopShareScreen } = useVoice({ id, context });
    const { name, userData, voicingMembers } = useAppSelector(store => {
        return {
            userData: store.users.byId,
            voicingMembers: store.voice.voicingMembers,
            name: context == "channel" ? store.channels.byId[id].name : store.users.byId[id].name
        };
    });
    useEffect(() => {
        const ids = voicingMembers.ids;
        ids.forEach((id, idx) => {
            playAgoraVideo(id);
            const { speakingVolume = 0 } = voicingMembers.byId[id];
            const speaking = speakingVolume > 50;
            if (speaking) {
                setSpeakingIndex(idx);
            }
        });

    }, [voicingMembers]);
    const handleExitFullscreen = () => {
        if (context == "channel") {
            dispatch(updateChannelVisibleAside({ id, aside: "voice" }));
        }
    };
    const handlePin = (evt: MouseEvent<HTMLButtonElement>) => {
        const idx = evt.currentTarget.dataset.idx ?? "";
        if (idx == "undefined") {
            setPin(undefined);
        } else {
            setPin(parseInt(idx));
        }
    };
    if (!voicingInfo) return null;
    const _name = context == "channel" ? `# ${name}` : `@ ${name}`;
    const members = voicingMembers.ids;
    const membersData = voicingMembers.byId;
    const hasPin = typeof pin !== "undefined";
    const { muted, video, shareScreen } = voicingInfo;
    return (
        <div className='h-full bg-black text-gray-300 flex flex-col justify-between rounded-r-2xl'>
            {/* top */}
            <div className="px-7 py-6 flex justify-between">
                <span className='text-sm font-semibold'>{_name}</span>
                <div className="flex gap-4">
                    <IconExitScreen role="button" onClick={handleExitFullscreen} className="fill-gray-700 dark:fill-gray-300" />
                </div>
            </div>
            {/* middle */}
            <ul className='flex grow justify-center items-end relative gap-2'>
                {members.map((uid, idx) => {
                    const curr = userData[uid];
                    if (!curr) return null;
                    const { muted, speakingVolume = 0, shareScreen } = membersData[uid];
                    const speaking = speakingVolume > 50;
                    const special = hasPin ? pin == idx : idx == speakingIndex;
                    const disablePin = special && !hasPin;
                    return <li key={uid} className={clsx('bg-gray-700 group', special ? "absolute left-0 top-0 w-full h-[calc(100%_-_110px)] flex-center" : "relative rounded-lg py-1.5 px-12")}>
                        <div className={clsx("w-20 h-20 flex shrink-0 relative transition-opacity")}>
                            {speaking && <div className={clsx("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 rounded-full bg-green-500 animate-speaking", special ? "w-[88px] h-[88px]" : "w-[86px] h-[86px]")}></div>}
                            <Avatar
                                width={80}
                                height={80}
                                className="w-full h-full rounded-full object-cover z-20"
                                src={curr.avatar}
                                name={curr.name}
                                alt="avatar"
                            />
                        </div>
                        {shareScreen ? <div className={clsx("w-1 h-1 absolute z-40 rounded-full bg-green-700/60", special ? "top-2 left-2" : "top-1 left-1 px-2")} /> : null}
                        {!disablePin && <button data-idx={special ? "undefined" : idx} role={"button"} onClick={handlePin} className={clsx("absolute left-1 top-1 z-40 p-1 rounded bg-black/50", special ? "" : "invisible group-hover:visible")}>
                            {special ? <IconPin className="w-3 h-3 fill-gray-700 dark:fill-gray-300" /> : <IconPin className="w-3 h-3 fill-gray-700 dark:fill-gray-300" />}
                        </button>}
                        <span className={clsx("text-gray-300 bg-black/50 rounded-lg absolute  z-40", special ? "left-2 bottom-2 px-2 py-1 text-sm " : "left-1 bottom-1 p-1 text-xs")} title={curr?.name}>
                            {curr?.name}
                        </span>
                        <div className={clsx("flex items-center gap-2 absolute z-40 rounded bg-black/50", special ? "bottom-2 right-2  px-2 py-0.5" : "bottom-1 right-1 px-2")}>
                            {muted ? <IconMicOff className={clsx("fill-gray-300", special ? "w-4" : "w-3")} /> : <IconMic className={clsx(" fill-gray-300 ", special ? "w-4" : "w-3")} />}
                        </div>
                        <div id={`CAMERA_${uid}`} className={clsx("absolute top-0 left-0 z-30 w-full h-full overflow-hidden m-auto", special ? "" : "rounded")}>
                            {/* camera placeholder */}
                        </div>
                    </li>;
                })}

            </ul>
            {/* bottom */}
            <ul className='py-4 flex justify-center gap-2'>
                <Tooltip tip={muted ? t("unmute") : t("mute")} placement="top">
                    <li role={"button"} onClick={setMute.bind(null, !muted)} className="flex-center py-1 px-3 rounded bg-gray-100 dark:bg-gray-900">
                        {muted ? <IconMicOff className="fill-gray-700 dark:fill-gray-300" /> : <IconMic className="fill-gray-700 dark:fill-gray-300" />}
                    </li>
                </Tooltip>
                <Tooltip tip={video ? t("camera_off") : t("camera_on")} placement="top">
                    <li role={"button"} onClick={video ? closeCamera : openCamera} className="flex-center py-1 px-3 rounded bg-gray-100 dark:bg-gray-900">
                        {video ? <IconCamera className="fill-gray-700 dark:fill-gray-300" /> : <IconCameraOff className="fill-gray-700 dark:fill-gray-300" />}
                    </li>
                </Tooltip>
                <Tooltip tip={"Share Screen"} placement="top">
                    <li role={"button"} onClick={shareScreen ? stopShareScreen : startShareScreen} className={clsx("flex-center py-1 px-3 rounded ", shareScreen ? "bg-green-700" : "bg-gray-100 dark:bg-gray-900")}>
                        <IconScreen className="fill-gray-700 dark:fill-gray-300 w-6 h-6" />
                    </li>
                </Tooltip>
                <StyledButton onClick={leave} className='bg-red-600 hover:!bg-red-700 text-center'>
                    <Tooltip tip={t("leave_voice")} placement="top" offset={[0, 24]} >
                        <IconCallOff className="m-auto" />
                    </Tooltip>
                </StyledButton>
            </ul>
        </div>
    );
};

export default VoiceFullscreen;