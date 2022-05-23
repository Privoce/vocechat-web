import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 openPanel: false,
 users: [], // user struct {id,name,openVideo,openMic}
 // 用于控制本地的设备
 device: {
  mic: false,
  camera: false,
  share: false,
  currentMic: "default",
  currentCamera: "default",
  currentPlayBack: "default"
 },
 // 用于记录所有系统设备
 devices: {
  mics: [],
  cameras: [],
  playbacks: []
 }
};

const videocallSlice = createSlice({
 name: "videocall",
 initialState,
 reducers: {
  start: (state) => {
   state.openPanel = true;
  },
  end: (state) => {
   state.users = [];
   state.openPanel = false;
  },
  toggleMic: (state) => {
   state.device.mic = !state.device.mic;
  },
  toggleCamera: (state) => {
   state.device.camera = !state.device.camera;
  },
  toggleShare: (state) => {
   state.device.share = !state.device.share;
  },
  resetState: (state) => {
   state.users = [];
  },
  setDevice: (state, payload) => {
   const { deviceId, type } = payload.payload;
   if (type == "camera") {
    state.device.currentCamera = deviceId;
   }
   if (type == "microphone") {
    state.device.currentMic = deviceId;
   }
   if (type == "playback") {
    state.device.currentPlayBack = deviceId;
   }
  },
  join: (state, payload) => {
   state.channelName = payload;
  },
  openMic: (state) => {
   state.device.mic = true;
  },
  openVideo: (state) => {
   state.device.camera = true;
  },
  closeMic: (state) => {
   state.device.mic = false;
  },
  closeVideo: (state) => {
   state.device.camera = false;
  },
  addUser: (state, payload) => {
   state.users.push(payload.payload.user);
  },
  removeUser: (state, payload) => {
   state.users = state.users.filter((user) => user.id != payload.payload.id);
  },
  addUsers: (state, payload) => {
   const ids = payload.payload.filterIds;
   const users = ids.map((item) => {
    return {
     id: item,
     openMic: false,
     openVide: false
    };
   });
   state.users.push(...users);
  },
  openUserVideo: (state, payload) => {
   const id = payload.payload.id;
   const user = state.users.find((user) => user.id == id);
   user.openVideo = true;
  },
  closeUserVideo: (state, payload) => {
   const id = payload.payload.id;
   const user = state.users.find((user) => user.id == id);
   user.openVideo = false;
  },
  openUserMic: (state, payload) => {
   const id = payload.payload.id;
   const user = state.users.find((user) => user.id == id);
   user.openMic = true;
  },
  closeUserMic: (state, payload) => {
   const id = payload.payload.id;
   const user = state.users.find((user) => user.id == id);
   user.openMic = false;
  },
  setDevices: (state, payload) => {
   const { microphone, camera, playback } = payload.payload;
   state.devices.mics = microphone;
   state.devices.cameras = camera;
   state.devices.playbacks = playback;
  }
 }
});

export const selectDevices = (state) => state.videocall.devices;
export const selectUsers = (state) => state.videocall.users;
export const selectDevice = (state) => state.videocall.device;

export const {
 resetState,
 toggleShare,
 toggleCamera,
 toggleMic,
 openMic,
 openVideo,
 closeMic,
 closeVideo,
 start,
 end,
 setDevice,
 addUser,
 removeUser,
 openUserVideo,
 closeUserVideo,
 openUserMic,
 closeUserMic,
 setDevices,
 addUsers
} = videocallSlice.actions;
export default videocallSlice.reducer;
