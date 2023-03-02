import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from "./workoutSlice";
import userReducer from "./userSlice";

export default configureStore({
  reducer: {
    workout: workoutReducer,
    user: userReducer,
  },
});
