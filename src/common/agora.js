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
 resetState,
 setDevice,
 setVolume,
 setUserVolume
} from "../app/slices/videocall.js";

export class AgoraClient {
 constructor(uid) {
  this.uid = uid;
  this.cid = null;
  this.rtc = {
   audioTrack: null,
   videoTrack: null,
   videoTrackMuted: true,
   audioTrackMuted: true,
   remoteUser: []
  };

  this.rtm = {
   client: null,
   channel: null
  };
  this.token = null;
  this.appId = "020c861b44424b0eb0ff768ee9bffda2";
  this.rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  this._log("create rtc client");
  this._debuuger();
 }

 async join(channelId) {
  try {
   // 如果 CID 存在，则说明当前仍在某个组内
   // 则 1. 加入对应的 Channel
   //    2. 重新打开 Channel
   if (this.cid) {
    //   join rtc
    await this.rtc.client.join(this.appId, this.cid, this.token, this.uid);
   } else {
    //   join rtc
    await this.rtc.client.join(
     this.appId,
     this._getChchannelNameById(channelId),
     this.token,
     this.uid
    );
    this.cid = this._getChchannelNameById(channelId);
   }

   this.cid = channelId;

   this._initCallbacks();
   await this._initDevice();
   await this._initDeviceChange();
   this.openMic();
   this.openVideo();
  } catch (error) {
   this._log("join error", error);
  }
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
  this.audioTrack = null;
  this.videoTrack = null;
  this.cid = null;
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
   this._initDefaultCamera();
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
   this._initDefaultMicrophone();
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
 setDevice(deviceId, type) {
  if (type == "camera") {
   this.rtc.videoTrack.setDevice(deviceId);
  }
  if (type == "microphone") {
   this.rtc.audioTrack.setDevice(deviceId);
  }
  if (type == "playback") {
   this.rtc.audioTrack.setPlaybackDevice(deviceId);
  }
 }
 async openScreenShare() {
  // 如果有摄像头 Track 就先取消播放；
  if (this.rtc.videoTrack) {
   await this.rtc.videoTrack.stop();
   await this.rtc.videoTrack.close();
   await this.rtc.client.unpublish([this.rtc.videoTrack]);
  }
  // 创建 screen share 并发布
  this.rtc.videoTrack = await AgoraRTC.createScreenVideoTrack(
   {
    encoderConfig: "1080p_1",
    optimizationMode: "motion" // 流畅优先
   },
   "disable"
  );
  await this.rtc.client.publish([this.rtc.videoTrack]);
  store.dispatch(openVideo());
 }
 async closeScreenShare() {
  store.dispatch(closeVideo());
  // 取消发布现有的 Track；
  this.rtc.videoTrack.stop();
  this.rtc.videoTrack.close();
  await this.rtc.client.unpublish([this.rtc.videoTrack]);
  this.rtc.videoTrack = null;
  this.videoTrackMuted = true;
 }
 // private function
 _initCallbacks() {
  // rtc
  AgoraRTC.setParameter("AUDIO_VOLUME_INDICATION_INTERVAL", 400);
  this.rtc.client.enableAudioVolumeIndicator();
  this._log(this.rtc.client);
  this.rtc.client.on("volume-indicator", (volumes) => {
   console.log("[agora] volume update");
   if (volumes.length == 0) return; // 没有人说话

   volumes.map((item) => {
    // set current user volume
    if (item.uid == this.uid) {
     store.dispatch(setVolume(parseInt(item.level)));
    } else {
     store.dispatch(setUserVolume({ id: item.uid, volume: parseInt(item.level) }));
    }
    // set other user volume
   });
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
   store.dispatch(
    addUser({
     user: {
      id: parseInt(user.uid),
      openVideo: false,
      openMic: false,
      volume: 0
     }
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
 async _initDefaultMicrophone() {
  const microphone = await AgoraRTC.getMicrophones();
  const microphones = microphone.map((item) => {
   return { deviceId: item.deviceId, label: item.label };
  });
  store.dispatch(setDevice({ deviceId: microphones[0].deviceId, type: "microphone" }));
  this.setDevice(microphones[0].deviceId, "microphone");
 }
 async _initDefaultCamera() {
  const camera = await AgoraRTC.getCameras();

  const cameras = camera.map((item) => {
   return { deviceId: item.deviceId, label: item.label };
  });

  store.dispatch(setDevice({ deviceId: cameras[0].deviceId, type: "camera" }));
  this.setDevice(cameras[0].deviceId, "camera");
 }
}
