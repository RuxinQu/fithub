import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useMutation } from "@apollo/client";
import { client } from "../App";
import { SAVE_WORKOUT, REMOVE_WORKOUT } from "../utils/mutations";

export const addWorkout = createAsyncThunk(
  "workout/addWorkout",
  async (workout) => {
    const response = await client.mutate({
      variables: { input: workout },
      mutation: SAVE_WORKOUT,
    });
    return response.data.saveWorkout.workouts;
  }
);

export const removeWorkout = createAsyncThunk(
  "workout/removeWorkout",
  async (id) => {
    const response = await client.mutate({
      variables: { workoutId: id },
      mutation: REMOVE_WORKOUT,
    });
    console.log(response.data.removeWorkout.workouts);
  }
);

export const workoutSlice = createSlice({
  name: "workout",
  initialState: {
    workouts: [],
    isAdding: false,
    failedToAdd: false,
    isDeleting: false,
    failedToDelete: false,
  },
  reducers: {
    updateSavedWorkout: (state, action) => {
      state.workouts = action.payload;
    },
  },
  extraReducers: {
    [addWorkout.pending]: (state, action) => {
      state.isAdding = true;
    },
    [addWorkout.rejected]: (state, action) => {
      state.failedToAdd = true;
    },
    [addWorkout.fulfilled]: (state, action) => {
      state.workouts = action.payload;
    },
    [removeWorkout.pending]: (state, action) => {
      state.isDeleting = true;
    },
    [removeWorkout.rejected]: (state, action) => {
      state.failedToDelete = true;
    },
    [removeWorkout.fulfilled]: (state, action) => {
      state.workouts = action.payload;
    },
  },
});

export const selectWorkouts = (state) => state.workout.workouts;

export const { updateSavedWorkout } = workoutSlice.actions;
export default workoutSlice.reducer;
