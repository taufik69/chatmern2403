import { createSlice } from "@reduxjs/toolkit";

export const friendsSlice = createSlice({
  name: "friends",
  initialState: {
    value: {},
  },
  reducers: {
    FriendAction: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { FriendAction } = friendsSlice.actions;
export default friendsSlice.reducer;
