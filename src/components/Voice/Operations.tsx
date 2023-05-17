import { MouseEvent, SetStateAction, useState, Dispatch } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import Tippy from '@tippyjs/react';

import Tooltip from '../Tooltip';
import IconMicOff from '@/assets/icons/mic.off.svg';
import IconMic from '@/assets/icons/mic.on.svg';
import IconCameraOff from '@/assets/icons/camera.off.svg';
import IconArrow from '@/assets/icons/arrow.down.mini.svg';
import IconCamera from '@/assets/icons/camera.svg';
import IconFullscreen from '@/assets/icons/fullscreen.svg';
import IconScreen from '@/assets/icons/share.screen.svg';
import IconCheck from '@/assets/icons/check.sign.svg';
import IconCallOff from '@/assets/icons/call.off.svg';

import { ChatContext } from '@/types/common';
import useVoice from './useVoice';
// import { updateChannelVisibleAside, updateDMVisibleAside } from '@/app/slices/footprint';
import { DeviceInfo, updateSelectDeviceId } from '@/app/slices/voice';

type DeviceType = "audio" | "video";
// https://docportal.shengwang.cn/cn/video-call-4.x/test_switch_device_web_ng?platform=Web
const DeviceList = ({ type, visible, setVisible, devices, selected }: {
    type: DeviceType,
    visible: VisibleType,
    setVisible: Dispatch<SetStateAction<VisibleType>>,
    devices: DeviceInfo[],
    selected: string
}) => {
    const dispatch = useDispatch();
    // const { t } = useTranslation("chat");
    const toggleVisible = (evt: MouseEvent<HTMLDivElement>) => {
        evt.stopPropagation();
        setVisible((prev: VisibleType) => prev == type ? "" : type);
    };
    const handleSelect = (evt: MouseEvent<HTMLLIElement>) => {
        evt.stopPropagation();
        const { deviceId = "" } = evt.currentTarget.dataset;
        if (selected == deviceId) return;
        dispatch(updateSelectDeviceId({ type, value: deviceId }));
    };
    return <Tippy
        onClickOutside={() => setVisible("")}
        interactive
        popperOptions={{ strategy: "fixed" }}
        visible={visible == type}
        placement="top-start"
        content={<div className="p-3 bg-white dark:bg-gray-800 overflow-auto rounded-lg flex flex-col items-start relative drop-shadow">
            <ul className="w-full flex flex-col gap-4">
                {devices.map(({ deviceId, kind, groupId, label }) => {
                    return (
                        <li data-device-id={deviceId} key={label} className="relative rounded-sm cursor-pointer flex items-center justify-between gap-4 text-gray-500 hover:text-gray-900 dark:text-gray-300 hover:dark:text-gray-100 font-semibold text-sm whitespace-nowrap"
                            onClick={handleSelect}>
                            {label}
                            {selected == deviceId && <IconCheck className="shrink-0" />}
                        </li>
                    );
                })}
            </ul>
        </div>}
    >
        <div onClick={toggleVisible} className="p-1 absolute rounded-sm top-0.5 right-0.5 hover:dark:bg-gray-500/50" role='button' >
            <IconArrow className={clsx("w-2 fill-gray-600 dark:fill-white transition-all", visible == type && "rotate-180")} />
        </div>
    </Tippy>;
};
type VisibleType = "audio" | "video" | "";
type Props = {
    mode?: "channel" | "dm" | "fullscreen",
    id: number,
    context: ChatContext
}

const Operations = ({ id, context, mode = "channel" }: Props) => {
    const [panelVisible, setPanelVisible] = useState<VisibleType>("");
    const { enterFullscreen, voicingInfo, leave, setMute, closeCamera, openCamera, startShareScreen, stopShareScreen, audioInputDevices, audioOutputDevices, videoInputDevices, videoInputDeviceId, audioInputDeviceId } = useVoice({ id, context });
    const { t } = useTranslation("chat");
    if (!voicingInfo) return null;
    const { muted, video, shareScreen } = voicingInfo;
    const baseButtonClass = clsx("flex-center py-2 px-3 rounded bg-gray-100 dark:bg-gray-900 relative");
    const baseIconClass = clsx("w-[25px] h-6 m-auto fill-gray-700 dark:fill-gray-300");
    return <>
        <Tooltip disabled={panelVisible == "audio"} tip={muted ? t("unmute") : t("mute")} placement="top">
            <button onClick={setMute.bind(null, !muted)} className={baseButtonClass}>
                {muted ? <IconMicOff className={baseIconClass} /> : <IconMic className={baseIconClass} />}
                <DeviceList
                    visible={panelVisible}
                    setVisible={setPanelVisible}
                    type='audio'
                    devices={audioInputDevices}
                    selected={audioInputDeviceId}
                />
            </button>
        </Tooltip>
        <Tooltip disabled={panelVisible == "video"} tip={video ? t("camera_off") : t("camera_on")} placement="top">
            <button onClick={video ? closeCamera : openCamera} className={baseButtonClass}>
                {video ? <IconCamera className={baseIconClass} /> : <IconCameraOff className={baseIconClass} />}
                <DeviceList
                    visible={panelVisible}
                    setVisible={setPanelVisible}
                    type='video'
                    devices={videoInputDevices}
                    selected={videoInputDeviceId}
                />
            </button>
        </Tooltip>
        <Tooltip tip={"Share Screen"} placement="top">
            <button onClick={shareScreen ? stopShareScreen : startShareScreen} className={clsx("py-2 px-3 rounded", shareScreen ? "bg-green-700" : "bg-gray-100 dark:bg-gray-900")}>
                <IconScreen className={clsx("w-6 h-6 dark:fill-gray-300", shareScreen ? "fill-gray-200" : "fill-gray-800")} />
            </button>
        </Tooltip>
        {mode !== "fullscreen" && <Tooltip tip={"Fullscreen"} placement="top">
            <button onClick={enterFullscreen.bind(null, undefined)} className={baseButtonClass}>
                <IconFullscreen className={baseIconClass} />
            </button>
        </Tooltip>}
        {mode !== "dm" && <Tooltip tip={t("leave_voice")} placement="top" >
            <button onClick={leave} className={clsx('py-2 px-3 rounded bg-red-600 hover:bg-red-700', mode !== "fullscreen" && "col-span-4")}>
                <IconCallOff className="m-auto w-[25px] h-6" />
            </button>
        </Tooltip>}
    </>;
};

export default Operations;