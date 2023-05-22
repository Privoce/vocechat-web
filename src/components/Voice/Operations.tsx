import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import Tippy from "@tippyjs/react";
import { ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import clsx from "clsx";

// import { updateChannelVisibleAside, updateDMVisibleAside } from '@/app/slices/footprint';
import { DeviceInfo, MediaDeviceKind, updateSelectDeviceId } from "@/app/slices/voice";
import { useAppSelector } from "@/app/store";
import { ChatContext } from "@/types/common";
import IconArrow from "@/assets/icons/arrow.down.mini.svg";
import IconCallOff from "@/assets/icons/call.off.svg";
import IconCameraOff from "@/assets/icons/camera.off.svg";
import IconCamera from "@/assets/icons/camera.svg";
import IconCheck from "@/assets/icons/check.sign.svg";
import IconExitFullscreen from "@/assets/icons/fullscreen.exit.svg";
import IconFullscreen from "@/assets/icons/fullscreen.svg";
import IconMicOff from "@/assets/icons/mic.off.svg";
import IconMic from "@/assets/icons/mic.on.svg";
import IconScreen from "@/assets/icons/share.screen.svg";
import Tooltip from "../Tooltip";
import useVoice from "./useVoice";

type DeviceType = "audio" | "video";
// https://docportal.shengwang.cn/cn/video-call-4.x/test_switch_device_web_ng?platform=Web
const DeviceList = ({
  type,
  visible,
  setVisible,
  devices
}: {
  type: DeviceType;
  visible: VisibleType;
  setVisible: Dispatch<SetStateAction<VisibleType>>;
  devices: {
    title: string;
    list: DeviceInfo[];
    selected: string;
  }[];
}) => {
  const loginUid = useAppSelector((store) => store.authData.user?.uid ?? 0);
  const dispatch = useDispatch();
  // const { t } = useTranslation("chat");
  const toggleVisible = (evt: MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation();
    setVisible((prev: VisibleType) => (prev == type ? "" : type));
  };
  const handleSelect = (evt: MouseEvent<HTMLLIElement>) => {
    // evt.stopPropagation();
    const { deviceId = "", kind, selected = "" } = evt.currentTarget.dataset;
    if (selected == deviceId || !kind) return;
    switch (kind as MediaDeviceKind) {
      case "audiooutput":
      case "audioinput":
        {
          const localAudioTrack = window.VOICE_TRACK_MAP[loginUid] as IMicrophoneAudioTrack;
          dispatch(updateSelectDeviceId({ kind: kind as MediaDeviceKind, value: deviceId }));
          if (localAudioTrack) {
            localAudioTrack
              .setDevice(deviceId)
              .then(() => {
                console.log("audioinput setDevice", deviceId);
              })
              .catch((err) => {
                console.log("audioinput setDevice error", err);
              });
          }
        }

        break;
      case "videoinput":
        {
          const localCameraTrack = window.VIDEO_TRACK_MAP[loginUid] as ICameraVideoTrack;
          if (localCameraTrack) {
            localCameraTrack
              .setDevice(deviceId)
              .then(() => {
                console.log("videoinput setDevice", deviceId);
                dispatch(updateSelectDeviceId({ kind: kind as MediaDeviceKind, value: deviceId }));
              })
              .catch((err) => {
                console.log("videoinput setDevice error", err);
              });
          }
        }

        break;

      default:
        break;
    }
  };
  const handleBlockClick = (evt: MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation();
  };
  return (
    <Tippy
      onClickOutside={() => setVisible("")}
      interactive
      popperOptions={{ strategy: "fixed" }}
      visible={visible == type}
      placement="top-start"
      content={
        <div
          onClick={handleBlockClick}
          className="px-3 pb-3 bg-white dark:bg-gray-800 overflow-auto rounded-lg flex flex-col gap-3 divide-gray-500/50 divide-y-[1px] items-start relative drop-shadow"
        >
          {devices.map(({ title, list, selected }) => {
            console.log("device selected", title, selected);
            if (list.length == 0) return null;
            return (
              <div key={title} className="w-full flex flex-col items-start gap-2 pt-3">
                <p className="text-gray-500 text-xs">{title}</p>
                <ul className="w-full flex flex-col gap-4">
                  {list.map(({ deviceId, kind, label }) => {
                    return (
                      <li
                        data-selected={selected}
                        data-kind={kind}
                        data-device-id={deviceId}
                        key={label}
                        className="relative rounded-sm cursor-pointer flex items-center justify-between gap-4 text-gray-500 hover:text-gray-900 dark:text-gray-300 hover:dark:text-gray-100 font-semibold text-sm whitespace-nowrap"
                        onClick={handleSelect}
                      >
                        {label}
                        <i className="w-4 h-3">
                          {selected == deviceId && <IconCheck className={clsx("shrink-0")} />}
                        </i>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      }
    >
      <div
        onClick={toggleVisible}
        className="group p-1 absolute rounded-sm top-0.5 right-0.5 hover:bg-gray-300/50"
        role="button"
      >
        <IconArrow
          className={clsx(
            "w-2 fill-gray-600 group-hover:fill-gray-900 dark:fill-white transition-transform",
            visible == type && "rotate-180"
          )}
        />
      </div>
    </Tippy>
  );
};
type VisibleType = "audio" | "video" | "";
type Props = {
  mode?: "channel" | "dm" | "fullscreen";
  id: number;
  context: ChatContext;
};

const Operations = ({ id, context, mode = "channel" }: Props) => {
  const [panelVisible, setPanelVisible] = useState<VisibleType>("");
  const {
    exitFullscreen,
    enterFullscreen,
    fullscreen,
    voicingInfo,
    leave,
    setMute,
    closeCamera,
    openCamera,
    startShareScreen,
    stopShareScreen,
    audioInputDevices,
    audioOutputDevices,
    videoInputDevices,
    videoInputDeviceId,
    audioInputDeviceId,
    audioOutputDeviceId
  } = useVoice({ id, context });
  const { t } = useTranslation("chat");
  if (!voicingInfo) return null;
  const { muted, video, shareScreen } = voicingInfo;
  const baseButtonClass = clsx(
    "flex-center py-2 px-3 rounded bg-gray-100 dark:bg-gray-900 relative disabled:pointer-events-none disabled:opacity-50"
  );
  const baseIconClass = clsx("w-[25px] h-6 m-auto fill-gray-700 dark:fill-gray-300");
  return (
    <>
      <Tooltip
        disabled={panelVisible == "audio"}
        tip={muted ? t("unmute") : t("mute")}
        placement="top"
      >
        <button
          disabled={audioInputDevices.length == 0 && audioOutputDevices.length == 0}
          onClick={setMute.bind(null, !muted)}
          className={baseButtonClass}
        >
          {muted ? <IconMicOff className={baseIconClass} /> : <IconMic className={baseIconClass} />}
          <DeviceList
            visible={panelVisible}
            setVisible={setPanelVisible}
            type="audio"
            devices={[
              {
                title: "Input Device",
                list: audioInputDevices,
                selected: audioInputDeviceId
              },
              {
                title: "Output Device",
                list: audioOutputDevices,
                selected: audioOutputDeviceId
              }
            ]}
          />
        </button>
      </Tooltip>
      <Tooltip
        disabled={panelVisible == "video"}
        tip={video ? t("camera_off") : t("camera_on")}
        placement="top"
      >
        <button
          disabled={videoInputDevices.length == 0}
          onClick={video ? closeCamera : openCamera}
          className={baseButtonClass}
        >
          {video ? (
            <IconCamera className={baseIconClass} />
          ) : (
            <IconCameraOff className={baseIconClass} />
          )}
          <DeviceList
            visible={panelVisible}
            setVisible={setPanelVisible}
            type="video"
            devices={[
              {
                title: "Camera Device",
                list: videoInputDevices,
                selected: videoInputDeviceId
              }
            ]}
          />
        </button>
      </Tooltip>
      <Tooltip tip={"Share Screen"} placement="top">
        <button
          onClick={shareScreen ? stopShareScreen : startShareScreen}
          className={clsx(
            "py-2 px-3 rounded",
            shareScreen ? "bg-green-700" : "bg-gray-100 dark:bg-gray-900"
          )}
        >
          <IconScreen
            className={clsx(
              "w-6 h-6 dark:fill-gray-300",
              shareScreen ? "fill-gray-200" : "fill-gray-800"
            )}
          />
        </button>
      </Tooltip>
      <Tooltip tip={"Fullscreen"} placement="top">
        <button
          onClick={
            fullscreen
              ? exitFullscreen.bind(null, undefined)
              : enterFullscreen.bind(null, undefined)
          }
          className={baseButtonClass}
        >
          {fullscreen ? (
            <IconExitFullscreen className={baseIconClass} />
          ) : (
            <IconFullscreen className={baseIconClass} />
          )}
        </button>
      </Tooltip>
      {mode !== "dm" && (
        <Tooltip tip={t("leave_voice")} placement="top">
          <button
            onClick={leave}
            className={clsx(
              "py-2 px-3 rounded bg-red-600 hover:bg-red-700",
              mode !== "fullscreen" && "col-span-4"
            )}
          >
            <IconCallOff className="m-auto w-[25px] h-6" />
          </button>
        </Tooltip>
      )}
    </>
  );
};

export default Operations;
