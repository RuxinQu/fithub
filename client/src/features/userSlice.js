import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    updateUser: (state, action) => {
      state = action.payload;
    },
  },
});

export const selectUser = (state) => state.user;
export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
