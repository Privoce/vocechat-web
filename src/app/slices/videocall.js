import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 replying: {}
};

const videocallSlice = createSlice({
 name: "videocall",
 initialState,
 reducers: {
  resetVideocall() {}
 }
});

export const { resetVideocall } = videocallSlice.actions;
export default videocallSlice.reducer;
