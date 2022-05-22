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
 async join(channelId) {
  //   join rtm
  this._log("login to rtm");
  await this.rtm.client.login({
   uid: this.uid.toString(),
   token: this.token
  });
  this.rtm.channel = this.rtm.client.createChannel(this._getChchannelNameById(channelId));
  await this.rtm.channel.join();
  this._send(commandMap.login, {});
  this._initMember();
  this._initCallbacks();
  this._log("login to rtc");
  //   join rtc
  await this.rtc.client.join(
   this.appId,
   this._getChchannelNameById(channelId),
   this.token,
   this.uid
  );
  this.rtc.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
  this.rtc.videoTrack = await AgoraRTC.createCameraVideoTrack();
  if (!this.rtc.isLogin) {
   const res = await this.rtc.client.publish([this.rtc.audioTrack, this.rtc.videoTrack]);
   this._log("publish track", res);
  }
  await this._initDevice();
 }

 async leave() {
  //   exit rtc
  if (this.rtc.audioTrack) {
   this.rtc.audioTrack.stop();
   this.rtc.audioTrack.close();
  }
  if (this.rtc.videotrack) {
   this.rtc.videotrack.stop();
   this.rtc.videotrack.close();
  }
  this.rtc.client.leave();
  //   exit rtm
  if (this.rtm.channel) {
   this.rtm.channel.leave();
  }
  if (this.rtm.client) {
   this.rtm.client.logout();
  }
 }
 getUserById(uid) {
  const user = this.rtc.remoteUsers.find((user) => user.uid == uid);
  return user;
 }
 openVideo() {
  this.rtc.client.publish([this.rtc.videoTrack]);
  this._send(commandMap.openVideo);
  store.dispatch(openVideo());
 }
 closeVideo() {
  this._send(commandMap.closeVideo);
  store.dispatch(closeVideo());
 }
 openMic() {
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
  // if (this.rtc.client) {
  //   const handleRTCUserPublished = (user, type) => {};
  //   const handleRTCUserUnPublished = (user, type) => {};
  //   this.rtc.client.on("user-published", handleRTCUserPublished);
  //   this.rtc.client.on("user-unpublished", handleRTCUserUnPublished);
  // }

  if (this.rtm.client) {
   const handleChannelMsg = (message, memberId) => {
    function _parseMessage(command) {
     var cmds = command.split("|");
     return {
      user: cmds[0],
      cmd: cmds[1],
      args: JSON.parse(cmds[2])
     };
    }
    const { user, cmd, args } = _parseMessage(message.text);
    //  当前用户的信息不可能出现，如果出现则是异常信令 & memeber ID != userid ,则有异常
    if (user == this.uid || user != memberId) {
     return;
    }
    console.log("[agora]", cmd, args);
    const userWithTrack = this.rtc.client.remoteUsers.find((user) => user.uid == memberId);
    if (cmd == commandMap.openVideo) {
     store.dispatch(openUserVideo({ id: memberId }));
     this.rtc.client.subscribe(userWithTrack, "video");
    }
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
   const handleRTMMemberJoined = (memberId) => {
    this._log("[rtm][MemberJoined]", memberId);
    store.dispatch(
     addUser({
      user: { id: parseInt(memberId), openVideo: false, openMic: false }
     })
    );
   };
   const handleRTMMemberLeft = (memberId) => {
    store.dispatch(removeUser({ id: parseInt(memberId) }));
    this._log("[rtm][MemberLeft]", memberId);
   };
   this.rtm.channel.on("ChannelMessage", handleChannelMsg);
   this.rtm.channel.on("MemberJoined", handleRTMMemberJoined);
   this.rtm.channel.on("MemberLeft", handleRTMMemberLeft);
  }
 }
 _getChchannelNameById(channelId) {
  if (process.env.NODE_ENV == "production") {
   return `rustchat_channel_${channelId}`;
  }
  return `rustchat_channel_${channelId}`;
  // const devChannel = `rustchat_channel_${channelId}_${Math.random()}`;
  // return devChannel;
 }
 _debuuger() {
  if (!window || process.env.NODE_ENV == "production") return;
  window.agoraRtc = this.rtc;
  window.agoraRtm = this.rtm;
 }
 _log(...msg) {
  console.warn("[agora]", ...msg);
 }
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
 async _initMember() {
  const ids = await this.rtm.channel.getMembers();
  store.dispatch(addUsers({ ids }));
 }
}
