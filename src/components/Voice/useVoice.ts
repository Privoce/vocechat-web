import { useDispatch } from "react-redux";
import AgoraRTC, { ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";

import AudioJoin from "@/assets/join.wav";
import { useGenerateAgoraTokenMutation } from "../../app/services/server";
import { updateChannelVisibleAside, updateDMVisibleAside } from "../../app/slices/footprint";
import {
  addVoiceMember,
  updatePin,
  updateVoicingInfo,
  upsertVoiceList
} from "../../app/slices/voice";
import { useAppSelector } from "../../app/store";
import { ChatContext } from "../../types/common";
import { ShareScreenTrack } from "../../types/global";
import { playAgoraVideo } from "../../utils";

type VoiceProps = {
  id: number;
  context?: ChatContext;
};
const audioJoin = new Audio(AudioJoin);
const useVoice = ({ id, context = "channel" }: VoiceProps) => {
  const dispatch = useDispatch();
  const {
    voicingInfo,
    loginUid,
    audioInputDevices,
    audioOutputDevices,
    videoInputDevices,
    audioInputDeviceId,
    audioOutputDeviceId,
    videoInputDeviceId,
    fullscreen
  } = useAppSelector((store) => {
    return {
      fullscreen:
        context == "channel"
          ? store.footprint.channelAsides[id] == "voice_fullscreen"
          : store.footprint.dmAsides[id] == "voice_fullscreen",
      loginUid: store.authData.user?.uid ?? 0,
      voicingInfo: store.voice.voicing,
      audioInputDevices: store.voice.devices.filter((d) => d.kind == "audioinput") ?? [],
      audioOutputDevices: store.voice.devices.filter((d) => d.kind == "audiooutput") ?? [],
      videoInputDevices: store.voice.devices.filter((d) => d.kind == "videoinput") ?? [],
      audioInputDeviceId: store.voice.audioInputDeviceId,
      audioOutputDeviceId: store.voice.audioOutputDeviceId,
      videoInputDeviceId: store.voice.videoInputDeviceId
    };
  });
  const [generateToken] = useGenerateAgoraTokenMutation();
  // const [joining, setJoining] = useState(false);
  const joinVoice = async () => {
    // setJoining(true);
    dispatch(
      updateVoicingInfo({
        id,
        context,
        joining: true
      })
    );
    const resp = await generateToken(context == "channel" ? { gid: id } : { uid: id });
    if ("error" in resp) {
      console.error("generate agora token error");
      dispatch(
        updateVoicingInfo({
          joining: false,
          id,
          context
        })
      );
    } else {
      console.table(resp.data);
      const { channel_name, app_id, agora_token, uid } = resp.data;
      if (window.VOICE_CLIENT) {
        await window.VOICE_CLIENT.join(app_id, channel_name, agora_token, uid);
        // Create a local audio track from the microphone audio.
        const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack({
          microphoneId: audioInputDeviceId
        });
        // Publish the local audio track in the channel.
        await window.VOICE_CLIENT.publish(localAudioTrack);
        // play the join audio
        try {
          await audioJoin.play();
        } catch (error) {
          console.warn("play join sound failed!", error);
        }
        console.log("Publish success!,joined the channel");
        dispatch(
          updateVoicingInfo({
            deafen: false,
            muted: false,
            joining: false,
            id,
            context
          })
        );
        // 把自己加进去
        dispatch(addVoiceMember(uid));
        // 放到全局变量里
        window.VOICE_TRACK_MAP[loginUid] = localAudioTrack;
      }
    }
    // setJoining(false);
  };
  const openCamera = async () => {
    const localVideoTrack = await AgoraRTC.createCameraVideoTrack({ cameraId: videoInputDeviceId });
    // 取消正在进行的桌面共享
    await stopShareScreen();
    await window.VOICE_CLIENT?.publish(localVideoTrack);
    dispatch(
      updateVoicingInfo({
        video: true,
        shareScreen: false,
        id,
        context
      })
    );
    // 放到全局变量里
    window.VIDEO_TRACK_MAP[loginUid] = localVideoTrack;
    playAgoraVideo(loginUid);
  };
  const closeCamera = async () => {
    const localVideoTrack = window.VIDEO_TRACK_MAP[loginUid] as ICameraVideoTrack;
    if (localVideoTrack) {
      await window.VOICE_CLIENT?.unpublish(localVideoTrack);
      localVideoTrack.close();
      window.VIDEO_TRACK_MAP[loginUid] = null;
      // 关闭视频后，需要把视频的高度设置回去
      const playerEle = document.querySelector(`#CAMERA_${loginUid}`) as HTMLElement;
      playerEle.classList.remove("h-[120px]");
      dispatch(
        updateVoicingInfo({
          video: false,
          shareScreen: false,
          id,
          context
        })
      );
    }
  };
  const stopShareScreen = async () => {
    let localVideoTrack = window.VIDEO_TRACK_MAP[loginUid] as ShareScreenTrack | null;
    if (!localVideoTrack) return;
    await window.VOICE_CLIENT?.unpublish(localVideoTrack);
    if ("close" in localVideoTrack) {
      localVideoTrack.close();
    } else {
      localVideoTrack[0].close();
      // localVideoTrack[0]=null
    }
    // localVideoTrack.close();
    window.VIDEO_TRACK_MAP[loginUid] = null;
    // 关闭视频后，需要把视频的高度设置回去
    const playerEle = document.querySelector(`#CAMERA_${loginUid}`) as HTMLElement;
    playerEle.classList.remove("h-[120px]");
    dispatch(
      updateVoicingInfo({
        video: false,
        shareScreen: false,
        id,
        context
      })
    );
  };
  const startShareScreen = async () => {
    try {
      const localVideoTrack = await AgoraRTC.createScreenVideoTrack({
        // electronScreenSourceId: "share_screen",
        selfBrowserSurface: "exclude",
        // 配置屏幕共享编码参数，详情请查看 API 文档。
        encoderConfig: "1080p_1",
        // 设置视频传输优化策略为清晰优先或流畅优先。
        optimizationMode: "detail"
      });

      // 取消正在进行的视频
      await closeCamera();
      await window.VOICE_CLIENT?.publish(localVideoTrack);
      dispatch(
        updateVoicingInfo({
          video: false,
          shareScreen: true,
          id,
          context
        })
      );
      // 放到全局变量里
      window.VIDEO_TRACK_MAP[loginUid] = localVideoTrack;
      playAgoraVideo(loginUid);
      // 进入全屏并Pin自己
      if (context == "channel") {
        dispatch(updateChannelVisibleAside({ id, aside: "voice_fullscreen" }));
      } else {
        dispatch(updateDMVisibleAside({ id, aside: "voice_fullscreen" }));
      }
      dispatch(updatePin({ uid: loginUid, action: "pin" }));
      // 监听屏幕共享结束事件
      if ("close" in localVideoTrack) {
        localVideoTrack.getMediaStreamTrack().onended = () => {
          stopShareScreen();
        };
      }
    } catch (error) {
      console.log("start share screen error", error);
    }
  };

  const leave = async () => {
    const localAudioTrack = window.VOICE_TRACK_MAP[loginUid] as IMicrophoneAudioTrack;
    const localVideoTrack = window.VIDEO_TRACK_MAP[loginUid] as ICameraVideoTrack;
    if (window.VOICE_CLIENT) {
      await window.VOICE_CLIENT.leave();
      dispatch(updateVoicingInfo(null));
      if (localAudioTrack) {
        localAudioTrack.close();
        window.VOICE_TRACK_MAP[loginUid] = null;
      }
      if (localVideoTrack) {
        localVideoTrack.close();
        window.VIDEO_TRACK_MAP[loginUid] = null;
      }
      const updateAside = context == "channel" ? updateChannelVisibleAside : updateDMVisibleAside;
      dispatch(updateAside({ id, aside: null }));
      // 即时更新对应的活跃列表信息
      dispatch(
        upsertVoiceList({
          id,
          context,
          memberCount: 0,
          // will fix it
          channelName: `vocechat:${context}:${id}`
        })
      );
    }
  };
  const setMute = (mute: boolean) => {
    const localAudioTrack = window.VOICE_TRACK_MAP[loginUid] as IMicrophoneAudioTrack;
    if (!localAudioTrack) return;
    localAudioTrack.setMuted(mute);
    if (mute == false && voicingInfo?.deafen) {
      // 远端音频，恢复原音
      Object.entries(window.VOICE_TRACK_MAP).forEach(([, audioTrack]) => {
        audioTrack?.setVolume(100);
      });
      dispatch(
        updateVoicingInfo({
          muted: false,
          id,
          context
        })
      );
    }
    dispatch(
      updateVoicingInfo({
        muted: mute,
        id,
        context
      })
    );
  };
  const setDeafen = (deafen: boolean) => {
    const localAudioTrack = window.VOICE_TRACK_MAP[loginUid] as IMicrophoneAudioTrack;
    if (!localAudioTrack) return;
    if (deafen) {
      localAudioTrack.setMuted(true);
      // 远端音频，全部静音
      Object.entries(window.VOICE_TRACK_MAP).forEach(([, audioTrack]) => {
        audioTrack?.setVolume(0);
      });
    } else {
      localAudioTrack.setMuted(false);
      // 远端音频，恢复原音
      Object.entries(window.VOICE_TRACK_MAP).forEach(([, audioTrack]) => {
        audioTrack?.setVolume(100);
      });
    }
    dispatch(updateVoicingInfo({ deafen, id, context }));
  };
  const enterFullscreen = (uid?: number) => {
    if (context == "channel") {
      dispatch(updateChannelVisibleAside({ id, aside: "voice_fullscreen" }));
    } else {
      dispatch(updateDMVisibleAside({ id, aside: "voice_fullscreen" }));
    }
    if (uid) {
      dispatch(updatePin({ uid, action: "pin" }));
    }
  };
  const exitFullscreen = () => {
    if (context == "channel") {
      dispatch(updateChannelVisibleAside({ id, aside: "voice" }));
    } else {
      dispatch(updateDMVisibleAside({ id, aside: null }));
    }
  };
  const joinedAtThisContext = voicingInfo
    ? voicingInfo.id == id && voicingInfo.context == context
    : false;
  return {
    setMute,
    setDeafen,
    leave,
    // canVoice,
    voicingInfo,
    joining: voicingInfo ? voicingInfo.joining : undefined,
    joinedAtThisContext,
    joined: !!voicingInfo,
    joinVoice,
    openCamera,
    closeCamera,
    startShareScreen,
    stopShareScreen,
    enterFullscreen,
    exitFullscreen,
    fullscreen,
    audioInputDevices,
    audioOutputDevices,
    videoInputDevices,
    audioInputDeviceId,
    audioOutputDeviceId,
    videoInputDeviceId
  };
};

export default useVoice;
