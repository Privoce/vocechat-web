import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 openPanel: false,
 users: [
  { id: 1, username: "123", openVideo: true, openMic: false },
  { id: 2, username: "123", openVideo: false, openMic: true },
  { id: 4, username: "123", openVideo: false, openMic: true }
 ], // user struct {id,name,openVideo,openMic}
 // 用于控制本地的设备
 device: {
  mic: false,
  camera: false,
  share: false,
  currentMic: "default",
  currentCamera: "default"
 },
 // 用于记录所有系统设备
 devices: {
  mics: [{ id: "default", label: "Default" }],
  cameras: [{ id: "default", label: "Default" }],
  playbacks: [{ id: "default", label: "Default" }]
 }
};

// 定义 AGORA 信令
// 格式：user,cmd
// Example: 1,LOGIN

const commandMap = {
 login: "LOGIN",
 join: "JOIN",
 openMic: "OPENMIC",
 closeMic: "CLOSEMIC",
 openVideo: "OPENVIDEO",
 closeVideo: "CLOSEVIDEO",
 leave: "LEAVE"
};

// function parseCMD(command) {
//   var cmds = command.split(",");
//   return {
//     user: cmds[0],
//     cmd: cmds[1],
//     args: JSON.parse(cmds[2]),
//   };
// }

function buildCMD(user, cmd, args) {
 const argString = JSON.stringify(args);
 return `${user},${cmd.toUpperCase()},${argString}`;
}

const videocallSlice = createSlice({
 name: "videocall",
 initialState,
 reducers: {
  toggleMic: (state) => {
   state.devices.mic = !state.devices.mic;
  },
  resetState: (state) => {
   state.users = [];
  },
  join: (state, payload) => {
   // add current channel name;
   state.channelName = payload;
   // join rtc channel
   // join rtm channel
  },
  test_1(name) {
   window.clientInfo.join(name);
   window.rtmClient.send(buildCMD(1, commandMap.login));
  }
 }
});

export const selectDevice = (state) => state.videocall.devices;
export const selectUsers = (state) => state.videocall.users;

export const { resetState } = videocallSlice.actions;
export default videocallSlice.reducer;
