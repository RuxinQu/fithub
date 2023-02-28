//this file is currently not being used, but save it for future development
import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from "./workoutSlice";

export default configureStore({
  reducer: {
    workout: workoutReducer,
  },
});
