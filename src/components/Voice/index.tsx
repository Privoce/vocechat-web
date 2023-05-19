import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import AgoraRTC from "agora-rtc-sdk-ng";

import {
  useGetAgoraChannelsQuery,
  useGetAgoraStatusQuery,
  useLazyGetAgoraUsersByChannelQuery
} from "../../app/services/server";
import {
  addVoiceMember,
  removeVoiceMember,
  updateCallInfo,
  updateConnectionState,
  updateDevices,
  updateVoicingMember,
  updateVoicingNetworkQuality
} from "../../app/slices/voice";
import { useAppSelector } from "../../app/store";
import { playAgoraVideo } from "../../utils";
import DMCalling from "./DMCalling";
import useVoice from "./useVoice";

AgoraRTC.setLogLevel(process.env.NODE_ENV === "development" ? 0 : 4);
window.VOICE_TRACK_MAP = window.VOICE_TRACK_MAP ?? {};
window.VIDEO_TRACK_MAP = window.VIDEO_TRACK_MAP ?? {};
// let tmpUids: number[] = [];
const Voice = () => {
  const { from, to, voiceList, loginUid, voicingInfo } = useAppSelector((store) => {
    return {
      voicingInfo: store.voice.voicing,
      voiceList: store.voice.list,
      from: store.voice.callingFrom,
      to: store.voice.callingTo,
      loginUid: store.authData.user?.uid
    };
  });
  const { data: enabled } = useGetAgoraStatusQuery();
  const [getUsersByChannel] = useLazyGetAgoraUsersByChannelQuery();
  useGetAgoraChannelsQuery(
    { page_no: 0, page_size: 100 },
    {
      skip: !enabled || !navigator.onLine,
      pollingInterval: 5000
    }
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const initializeAgoraClient = async () => {
      // 创建agora客户端实例
      const agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
      // 无论频道内是否有人说话，都会每两秒返回提示音量
      agoraEngine.enableAudioVolumeIndicator();
      // Listen for the "user-published" event to retrieve an AgoraRTCRemoteUser object.
      agoraEngine.on("user-published", async (user, mediaType) => {
        // Subscribe to the remote user when the SDK triggers the "user-published" event.
        await agoraEngine.subscribe(user, mediaType);
        console.log(user, " has published at the channel");
        if (mediaType == "audio" && user.hasAudio) {
          // 播放远端音频
          user.audioTrack?.play();
          window.VOICE_TRACK_MAP[+user.uid] = user.audioTrack;
        }
        if (mediaType == "video" && user.hasVideo) {
          // const label = user.videoTrack?.getMediaStreamTrack()?.label;
          // console.log("labell", label);

          // if (label?.includes("screen")) {
          //     // 远端用户共享屏幕
          //     // const screenTrack = user.videoTrack as ShareScreenTrack;
          //     // screenTrack.on("track-ended", () => {
          //     //     // 远端用户停止共享屏幕
          //     dispatch(updateVoicingMember({ uid: +user.uid, info: { shareScreen: true } }));
          // }
          dispatch(updateVoicingMember({ uid: +user.uid, info: { video: true } }));
          window.VIDEO_TRACK_MAP[+user.uid] = user.videoTrack;
          playAgoraVideo(+user.uid);
        }
        agoraEngine.on("user-unpublished", (user) => {
          if (!user.hasAudio) {
            //   远端用户取消了音频（muted）
            dispatch(updateVoicingMember({ uid: +user.uid, info: { muted: true } }));
          }
          if (!user.hasVideo) {
            //   远端用户取消了视频
            dispatch(
              updateVoicingMember({ uid: +user.uid, info: { video: false, shareScreen: false } })
            );
            // 注销本地视频变量
            window.VIDEO_TRACK_MAP[+user.uid] = null;
            // 关闭视频后，需要把视频的高度设置回去
            const playerEle = document.querySelector(`#CAMERA_${user.uid}`) as HTMLElement;
            playerEle.classList.remove("h-[120px]");
          }
        });
        //remote user leave
        agoraEngine.on("user-left", (user, reason) => {
          console.log(user, "has left the channel", reason);
          switch (reason) {
            case "Quit":
            case "ServerTimeOut":
              {
                dispatch(removeVoiceMember(+user.uid as number));
                // clear tracks
                window.VOICE_TRACK_MAP[+user.uid] = null;
                window.VIDEO_TRACK_MAP[+user.uid] = null;
                // if (voicingInfo && voicingInfo.context == "dm") {
                //     // 有人离开，就断开
                //     dispatch(updateCallInfo({ from: 0 }));
                // }
              }
              break;
            default:
              break;
          }
        });
        // 报告频道内正在说话的远端用户及其音量的回调。
        agoraEngine.on("volume-indicator", (vols) => {
          vols.forEach((vol, index) => {
            console.log(`${index} UID ${vol.uid} Level ${vol.level}`);
            const { uid, level } = vol;
            dispatch(updateVoicingMember({ uid: +uid, info: { speakingVolume: level } }));
          });
        });
        // 信号强度
        agoraEngine.on("network-quality", (qlt) => {
          const { downlinkNetworkQuality } = qlt;
          dispatch(updateVoicingNetworkQuality(downlinkNetworkQuality));
        });
        // 连接状态有变化
        agoraEngine.on("connection-state-change", (state, prevState, reason) => {
          console.log("connection-state-change", state, prevState, reason);
          dispatch(updateConnectionState(state));
        });
        // 用户状态变化
        agoraEngine.on("user-info-updated", (uid, msg) => {
          console.log("user-info-updated", uid, msg);
          switch (msg) {
            case "mute-audio":
              // todo
              dispatch(updateVoicingMember({ uid: +uid, info: { muted: true } }));
              break;
            case "unmute-audio":
              // todo
              dispatch(updateVoicingMember({ uid: +uid, info: { muted: false } }));
              break;
            case "mute-video":
              // todo
              dispatch(updateVoicingMember({ uid: +uid, info: { video: false } }));
              break;
            case "unmute-video":
              // todo
              dispatch(updateVoicingMember({ uid: +uid, info: { video: true } }));
              break;
            default:
              break;
          }
        });
      });
      // 有新用户加入
      agoraEngine.on("user-joined", async (user) => {
        console.log(user.uid, " has joined the channel", user);
        dispatch(addVoiceMember(+user.uid));
      });
      AgoraRTC.onMicrophoneChanged = (info) => {
        console.log("onMicrophoneChanged", info);
      };
      AgoraRTC.getDevices()
        .then((devices) => {
          console.log("devices", devices);
          dispatch(
            updateDevices(
              devices.map((d) => {
                const { deviceId, groupId, label, kind } = d;
                return { deviceId, groupId, label, kind };
              })
            )
          );
        })
        .catch((err) => {
          console.log("err", err);
        });
      window.VOICE_CLIENT = agoraEngine;
    };
    const handlePageUnload = (evt: BeforeUnloadEvent) => {
      console.log("unload");
      if (window.VOICE_CLIENT?.connectionState === "CONNECTED") {
        evt.preventDefault();
        return (evt.returnValue = "");
      }
    };
    window.addEventListener("beforeunload", handlePageUnload, { capture: true });
    if (!window.VOICE_CLIENT) {
      initializeAgoraClient();
    }

    return () => {
      window.removeEventListener("beforeunload", handlePageUnload, { capture: true });
    };
  }, [voicingInfo]);

  useEffect(() => {
    // 有人呼叫我
    const callMeList = voiceList.filter((item) => item.context == "dm" && item.id == loginUid);
    if (callMeList.length) {
      const [firstCall] = callMeList;
      const { memberCount, channelName, id } = firstCall;
      if (memberCount == 1) {
        // 呼叫的人在频道里
        getUsersByChannel(channelName).then((resp) => {
          const [uid] = resp.data ?? [];
          if (uid && uid != loginUid) {
            dispatch(updateCallInfo({ from: uid, to: id }));
          }
        });
      }
    }
    // else {
    //     dispatch(updateCallInfo({ from: 0, to: 0, calling: false }));
    // }
  }, [voiceList, loginUid]);
  // return <DMCalling uid={1} sendByMe={calling !== loginUid} />;
  if (from !== 0) return <DMCalling from={from} to={to} />;
  return null;
};

export { useVoice };
export default memo(Voice);
