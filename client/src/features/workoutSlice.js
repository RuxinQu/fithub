import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useMutation } from "@apollo/client";
import { SAVE_WORKOUT, REMOVE_WORKOUT } from "../utils/mutations";

export const addWorkout = createAsyncThunk(
  "workout/addWorkout",
  async (workout) => {
    const [saveWorkout] = useMutation(SAVE_WORKOUT);
    const response = await saveWorkout({ variables: { input: workout } });
    const json = await response.json();
    return json;
  }
);

export const removeWorkout = createAsyncThunk(
  "workout/removeWorkout",
  async (workoutId) => {
    const [deleteWorkout] = useMutation(REMOVE_WORKOUT);
    const response = await deleteWorkout({ variables: { workoutId } });
    const json = await response.json();
    return json;
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
  reducers: {},
  extraReducers: {
    [addWorkout.pending]: (state, action) => {
      state.isAdding = true;
    },
    [addWorkout.rejected]: (state, action) => {
      state.failedToAdd = true;
    },
    [addWorkout.fulfilled]: (state, action) => {
      state.workouts.push(action.payload.data.saveWorkout);
    },
    [removeWorkout.pending]: (state, action) => {
      state.isDeleting = true;
    },
    [removeWorkout.rejected]: (state, action) => {
      state.failedToDelete = true;
    },
    [removeWorkout.fulfilled]: (state, action) => {
      state.workouts.filter(
        (workout) =>
          workout.workoutId !== action.payload.data.removeWorkout.workoutId
      );
    },
  },
});

export const selectWorkout = (state) => state.workout;

// export const { addWorkout, removeWorkout } = workoutSlice.actions;
export default workoutSlice.reducer;
