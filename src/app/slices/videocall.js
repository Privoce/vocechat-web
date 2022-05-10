import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onChat: false,
  channelName: "",
  trackState: {
    video: true,
    audio: true,
    screen: true,
  },
  users: [],
};

const videoCallSlice = createSlice({
  name: "videoCall",
  initialState,
  reducers: {
    toggleChat(state) {
      state.onChat = !state.onChat;
    },
    addUser(state, payload) {
      if (payload.mediaType == "video") {
        state.users = state.users.append(payload);
      }
    },
    removeUser(state, payload) {
      if (payload.mediaType == "video") {
        state.users = state.users.filter(
          (User) => User.uid != payload.user.uid
        );
      }
    },

    toggleVideo(state) {
      state.trackState.video = !state.trackState.video;
    },
    toggleAudio(state) {
      state.trackState.audio = !state.trackState.audio;
    },
    toggleScreen(state) {
      state.trackState.screen = !state.trackState.screen;
    },
  },
});

export const selectUsers = (state) => state.videoCall.users;

export const {
  toggleChat,
  addUser,
  removeUser,
  toggleVideo,
  toggleAudio,
} = videoCallSlice.actions;
export default videoCallSlice.reducer;
