import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    onChat: false,
    channelName: '',
    trackState: {
        video: true,
        audio: true,
    },
    users: []
};

const videoCallSlice = createSlice({
    name: 'videoCall',
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
                state.users = state.users.filter((User) => User.uid != payload.user.uid);
            }
        },
        setTrackState(state, payload) {
            state.trackState = payload;
        }

    }
});

export const selectUsers = (state) => state.videoCall.users;

export const { toggleChat, addUser, removeUser, setTrackState } = videoCallSlice.actions;
export default videoCallSlice.reducer;