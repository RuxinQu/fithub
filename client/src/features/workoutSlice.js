import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useMutation } from "@apollo/client";
import { client } from "../App";
import { SAVE_WORKOUT, REMOVE_WORKOUT } from "../utils/mutations";

export const addWorkout = createAsyncThunk(
  "workout/addWorkout",
  async (workout) => {
    const response = await client.mutate({
      mutation: SAVE_WORKOUT,
      variables: { input: workout },
    });
    console.log(response);
    // const [saveWorkout] = useMutation(SAVE_WORKOUT);
    // const response = await saveWorkout({ variables: { input: workout } });
    // const json = await response.json();
    // return json;
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
  name: "workouts",
  initialState: {
    workouts: [],
    isAdding: false,
    failedToAdd: false,
    isDeleting: false,
    failedToDelete: false,
  },
  reducers: {},
  // extraReducers: {
  //   [addWorkout.pending]: (state, action) => {
  //     state.isAdding = true;
  //   },
  //   [addWorkout.rejected]: (state, action) => {
  //     state.failedToAdd = true;
  //   },
  //   [addWorkout.fulfilled]: (state, action) => {
  //     // console.log(action.payload.data.saveWorkout)
  //     state.workouts.push(action.payload.data.saveWorkout);
  //   },
  //   [removeWorkout.pending]: (state, action) => {
  //     state.isDeleting = true;
  //   },
  //   [removeWorkout.rejected]: (state, action) => {
  //     state.failedToDelete = true;
  //   },
  //   [removeWorkout.fulfilled]: (state, action) => {
  //     state.workout.filter(
  //       (workouts) =>
  //         workouts.workoutId !== action.payload.data.removeWorkout.workoutId
  //     );
  //   },
  // },
});

export const selectWorkouts = (state) => state.workouts;

// export const { addWorkout, removeWorkout } = workoutSlice.actions;
export default workoutSlice.reducer;
