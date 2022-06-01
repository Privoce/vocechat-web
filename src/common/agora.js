import AgoraRTC from "agora-rtc-sdk-ng";
import store from "../app/store";
import {
 openMic,
 openVideo,
 closeMic,
 closeVideo,
 addUser,
 removeUser,
 openUserVideo,
 closeUserVideo,
 openUserMic,
 closeUserMic,
 setDevices,
 resetState
} from "../app/slices/videocall.js";

export class AgoraClient {
 constructor(uid, cid) {
  this.uid = uid;
  this.cid = cid;
  this.rtc = {
   client: null,
   audioTrack: null,
   videotrack: null,
   videoTrackMuted: true,
   audioTrackMuted: true,
   remoteUser: [],
   isLogin: false
  };

  this.rtm = {
   client: null,
   channel: null,
   isLogin: false
  };
  this.token = null;
  this.appId = "020c861b44424b0eb0ff768ee9bffda2";
  this.rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  this._log("create rtc client");
  this._debuuger();
 }
 // 加入 Channel & 发布当前本地的 Track
 // 在第一版当中，采用了 RTC 作为基本的数据发布 & 同步的能力，出现了诸如 1. 用户信息无法很好的维护；2. 用户行为无法很好的记录等问题
 // 在当前重构版本中，采用了 RTM 进行信令的发布，从而规避了 AgoraRTC 本身的一些设计的不合理之处（Muted 掉一个服务，会导致 RTC Track 被 unpublished）
 // 因此，这个版本中优先使用 RTM，RTC 仅用做流的同步。
 // 用户信息也采用 RTM 的 Memebers 来进行管理。

 // TODO: 部分已经发布的 track 无法正常播放，需要进一步解决

 async join(channelId) {
  //   join rtc
  await this.rtc.client.join(
   this.appId,
   this._getChchannelNameById(channelId),
   this.token,
   this.uid
  );

  this._initCallbacks();
  // load device for system.
  await this._initDevice();
  await this._initDeviceChange();
 }

 async leave() {
  //   exit rtc
  if (this.rtc.client.localTracks) {
   this.rtc.client.localTracks.map((track) => {
    track.stop();
    track.close();
   });
  }
  this.rtc.client.leave();
  store.dispatch(resetState());
 }
 getUserById(uid) {
  if (uid == this.uid) {
   return {
    uid,
    audioTrack: this.rtc.audioTrack,
    videoTrack: this.rtc.videoTrack
   };
  }
  const user = this.rtc.client.remoteUsers.find((user) => user.uid == uid);
  return user;
 }
 /**
  * 控制视频的显示与否
  *
  * 1. 因为需要红点在需要的时候开启，所以默认第一次要发布 track;
  * 2. 后续的控制采用 setMuted
  */
 async openVideo() {
  // 初次开启视频，发布 Video Track
  if (!this.rtc.videoTrack) {
   this.rtc.videoTrack = await AgoraRTC.createCameraVideoTrack();
   await this.rtc.client.publish([this.rtc.videoTrack]);
  }
  // 第二次打开时，则使用 Muted 来控制视频的播放
  if (this.rtc.videoTrackMuted) {
   this._log("第二次打开");
   this.videoTrackMuted = false;
   await this.rtc.videoTrack.setMuted(false);
  }

  store.dispatch(openVideo());
 }
 closeVideo() {
  // 使用 Muted 来控制视频
  this.rtc.videoTrackMuted = true;
  this.rtc.videoTrack.setMuted(true);
  store.dispatch(closeVideo());
 }
 async openMic() {
  // 初次开始视频，发布 Audio Track
  if (!this.rtc.audioTrack) {
   this.rtc.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
   await this.rtc.client.publish([this.rtc.audioTrack]);
  }
  //  第二次打开时，则使用 Muted 来控制音频的播放
  if (this.rtc.audioTrackMuted) {
   this.rtc.audioTrackMuted = false;
   this.rtc.audioTrack.setMuted(false);
  }
  store.dispatch(openMic());
 }
 closeMic() {
  // 使用 Muted 来控制音频
  this.rtc.audioTrackMuted = true;
  this.rtc.audioTrack.setMuted(true);
  store.dispatch(closeMic());
 }
 // private function
 _initCallbacks() {
  // rtc
  // this.rtc.client.enableAudioVolumeIndicator();
  this.rtc.client.on("volume-indicator", (volumes) => {
   if (volumes.length == 0) return; // 没有人说话
   console.log("[agora] voulume", volumes);
  });

  const handleRTCUserPublished = async (user, type) => {
   await this.rtc.client.subscribe(user, type);
   if (type == "audio") {
    user.audioTrack?.play();
    store.dispatch(openUserMic({ id: user.uid }));
   }
   if (type == "video") {
    store.dispatch(openUserVideo({ id: user.uid }));
   }
  };
  const handleRTCUserUnpublished = async (user, type) => {
   await this.rtc.client.unsubscribe(user, type);
   if (type == "audio") {
    user.audioTrack?.play();
    store.dispatch(closeUserMic({ id: user.uid }));
   }
   if (type == "video") {
    store.dispatch(closeUserVideo({ id: user.uid }));
   }
  };
  // RTC 实现用户加入/离开的控制
  // 用来控制是否上具体信息。
  const handleRTCUserJoined = async (user) => {
   this._log(user);
   store.dispatch(
    addUser({
     user: { id: parseInt(user.uid), openVideo: false, openMic: false }
    })
   );
  };
  const handleRTCUserLeft = async (user) => {
   store.dispatch(removeUser({ id: parseInt(user.uid) }));
  };
  // 用户状态变化的记录
  // 暂时没有用这个部分
  // 直接使用 published  和 unpublished 来处理
  const handleRTCUserInfoUpdated = async (user, msg) => {
   this._log(user, msg);
   switch (msg) {
    case "mute-audio":
     break;
    case "mute-video":
     break;
    case "unmute-audio":
     break;
    case "unmute-video":
     break;
    // only for native sdk currnt not work
    case "enable-local-video":
     break;
    case "disable-local-video":
     break;

    default:
     break;
   }
  };
  this.rtc.client.on("user-info-updated", handleRTCUserInfoUpdated);
  this.rtc.client.on("user-joined", handleRTCUserJoined);
  this.rtc.client.on("user-left", handleRTCUserLeft);
  this.rtc.client.on("user-published", handleRTCUserPublished);
  this.rtc.client.on("user-unpublished", handleRTCUserUnpublished);
 }
 // 用于在开发环境规避 Channel 冲突的问题。
 _getChchannelNameById(channelId) {
  if (process.env.NODE_ENV == "production") {
   return `rustchat_channel_${channelId}`;
  }
  return `rustchat_channel_${channelId}`;
  // const devChannel = `rustchat_channel_${channelId}_${Math.random()}`;
  // return devChannel;
 }
 //  在开发环境下，将 rtc 和 rtm 挂载至全局的 Window 下，以便调试
 _debuuger() {
  // if (!window || process.env.NODE_ENV == "production") return;
  window.agoraRtc = this.rtc;
 }
 // 自带 prefix 的 log
 _log(...msg) {
  console.warn("[agora]", ...msg);
 }
 // 初始化设备信息，并传递至 Redux 用于调整 UI
 async _initDevice() {
  const camera = await AgoraRTC.getCameras();
  const microphone = await AgoraRTC.getMicrophones();
  const playback = await AgoraRTC.getPlaybackDevices();
  const cameras = camera.map((item) => {
   return { deviceId: item.deviceId, label: item.label };
  });
  const playbacks = playback.map((item) => {
   return { deviceId: item.deviceId, label: item.label };
  });
  const microphones = microphone.map((item) => {
   return { deviceId: item.deviceId, label: item.label };
  });

  store.dispatch(
   setDevices({
    microphone: microphones,
    camera: cameras,
    playback: playbacks
   })
  );
 }
 async _initDeviceChange() {
  AgoraRTC.onCameraChanged = async () => {
   await this._initDevice();
  };
  AgoraRTC.onMicrophoneChanged = async () => {
   await this._initDevice();
  };
  AgoraRTC.onPlaybackDeviceChanged = async () => {
   await this._initDevice();
  };
 }
}
