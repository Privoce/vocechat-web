import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 openPanel: false,
 devices: {
  currentMic: "default",
  currentCamera: "default",
  mics: [],
  cameras: [],
  playbacks: []
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
  resetVideocall() {},
  joinChannel(name) {
   window.clientInfo.join(name);
   window.rtmClient.send(buildCMD(1, commandMap.login));
  }
 }
});

export const { resetVideocall } = videocallSlice.actions;
export default videocallSlice.reducer;
