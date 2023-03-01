import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../App";
import { GET_USER } from "../utils/queries";

export const queryUser = createAsyncThunk("user/queryUser", async () => {
  const response = await client.query({ query: GET_USER });
  console.log("lll");
  return response.data.user;
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(queryUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
