import AgoraRTC from "agora-rtc-sdk-ng";
import AgoraRTM from "agora-rtm-sdk";
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
 addUsers
} from "../app/slices/videocall.js";

const commandMap = {
 login: "LOGIN",
 join: "JOIN",
 openMic: "OPENMIC",
 closeMic: "CLOSEMIC",
 openVideo: "OPENVIDEO",
 closeVideo: "CLOSEVIDEO",
 leave: "LEAVE"
};
export class AgoraClient {
 constructor(uid) {
  this.uid = uid;
  this.rtc = {
   client: null,
   audioTrack: null,
   videotrack: null,
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
  this.rtm.client = AgoraRTM.createInstance(this.appId);
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
  //   join rtm
  await this.rtm.client.login({
   uid: this.uid.toString(),
   token: this.token
  });
  // join rtm channel for send login msg
  this.rtm.channel = this.rtm.client.createChannel(this._getChchannelNameById(channelId));
  await this.rtm.channel.join();

  this._send(commandMap.login, {});

  // load default members from rtm
  this._initMember();
  // add rtm channel msg login & logout & onMessageReceived
  this._initCallbacks();

  //   join rtc
  await this.rtc.client.join(
   this.appId,
   this._getChchannelNameById(channelId),
   this.token,
   this.uid
  );

  // load device for system.
  await this._initDevice();
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
  //   exit rtm
  if (this.rtm.channel) {
   this.rtm.channel.leave();
   console.log("[agora]leave RTM Channel");
  }
  if (this.rtm.client) {
   this.rtm.client.logout();
   console.log("[agora]logoOut Rtm Client");
  }
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
 async openVideo() {
  if (!this.rtc.videoTrack) {
   this.rtc.videoTrack = await AgoraRTC.createCameraVideoTrack();
  }
  this.rtc.client.publish([this.rtc.videoTrack]);
  this._send(commandMap.openVideo);
  store.dispatch(openVideo());
 }
 closeVideo() {
  this._send(commandMap.closeVideo);
  store.dispatch(closeVideo());
 }
 async openMic() {
  if (!this.rtc.audioTrack) {
   this.rtc.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
  }
  this.rtc.client.publish([this.rtc.audioTrack]);
  this._send(commandMap.openMic);
  store.dispatch(openMic());
 }
 closeMic() {
  this._send(commandMap.closeMic);
  store.dispatch(closeMic());
 }
 // private function
 async _send(msg, args) {
  function build(uid, msg, args = {}) {
   const argString = JSON.stringify(args);
   return `${uid}|${msg.toUpperCase()}|${argString}`;
  }
  this.rtm.channel.sendMessage({ text: build(this.uid, msg, args) });
 }
 _initCallbacks() {
  if (this.rtm.client) {
   const handleChannelMsg = (message, memberId) => {
    // 处理音频信令
    function _parseMessage(command) {
     var cmds = command.split("|");
     return {
      user: cmds[0],
      cmd: cmds[1],
      args: JSON.parse(cmds[2])
     };
    }
    const { user, cmd, args } = _parseMessage(message.text);
    console.log(args);
    //  当前用户的信息不可能出现，如果出现则是异常信令 & memeber ID != userid ,则有异常
    if (user == this.uid || user != memberId) {
     return;
    }
    // 找到用户和对应的 Track
    const userWithTrack = this.rtc.client.remoteUsers.find((user) => user.uid == memberId);
    // 开启视频则控制 Component 展示 & 订阅对应的 Track；
    if (cmd == commandMap.openVideo) {
     store.dispatch(openUserVideo({ id: memberId }));
     this.rtc.client.subscribe(userWithTrack, "video");
    }
    // 开启音频则控制 Component Icon 展示 & 订阅对应的 Track；
    // 订阅完成后并播放；
    if (cmd == commandMap.openMic) {
     store.dispatch(openUserMic({ id: memberId }));
     this.rtc.client.subscribe(userWithTrack, "audio");
     userWithTrack.audioTrack?.play();
    }
    if (cmd == commandMap.closeVideo) {
     store.dispatch(closeUserVideo({ id: memberId }));
     this.rtc.client.unsubscribe(userWithTrack, "video");
    }
    if (cmd == commandMap.closeMic) {
     store.dispatch(closeUserMic({ id: memberId }));
     this.rtc.client.unsubscribe(userWithTrack, "audio");
    }
   };
   // 有 RTM 用户加入，进入 Redux
   const handleRTMMemberJoined = (memberId) => {
    store.dispatch(
     addUser({
      user: { id: parseInt(memberId), openVideo: false, openMic: false }
     })
    );
   };
   // 有 RTM 用户退出，则从 Redux 中移除。
   const handleRTMMemberLeft = (memberId) => {
    store.dispatch(removeUser({ id: parseInt(memberId) }));
    this._log("[rtm][MemberLeft]", memberId);
   };
   // 处理对应的 RTM 事件
   this.rtm.channel.on("ChannelMessage", handleChannelMsg);
   this.rtm.channel.on("MemberJoined", handleRTMMemberJoined);
   this.rtm.channel.on("MemberLeft", handleRTMMemberLeft);
   this.rtc.client.on("volume-indicator", (volumes) => {
    console.log("[agora] voulume", volumes);
   });
  }
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
  if (!window || process.env.NODE_ENV == "production") return;
  window.agoraRtc = this.rtc;
  window.agoraRtm = this.rtm;
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
 // 用户初次进入后，对历史用户进行批量加入
 async _initMember() {
  const ids = await this.rtm.channel.getMembers();
  const filterIds = ids.filter((id) => id != this.uid);
  store.dispatch(addUsers({ filterIds }));
 }
}
