import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateSavedWorkout, selectWorkouts } from "../features/workoutSlice";
import { selectUser, queryUser } from "../features/userSlice";

import { searchById } from "../utils/Api";
import { idbPromise } from "../utils/helpers";
import { WorkoutCardContainer } from "../containers/WorkoutCardContainer";

export default function Detail() {
  const dispatch = useDispatch();
  const { workoutId } = useParams();
  const user = useSelector(selectUser);
  const savedWorkout = useSelector(selectWorkouts);
  useEffect(() => {
    dispatch(queryUser());
    dispatch(updateSavedWorkout(user.workouts));
  }, [user]);

  const [workoutToDisplay, setWorkoutToDisplay] = useState({});
  useEffect(() => {
    async function getWorkoutDetail() {
      try {
        const localWorkout = await idbPromise("detail", "getOne", workoutId);
        if (!localWorkout) {
          console.log("========making an api call to exerciseDB========");
          const response = await searchById(workoutId);
          const jsonResponse = await response.json();
          idbPromise("detail", "add", jsonResponse);
          setWorkoutToDisplay(jsonResponse);
        } else {
          console.log("========retrieving data from idb========");
          setWorkoutToDisplay(localWorkout);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getWorkoutDetail();
  }, []);

  return (
    <WorkoutCardContainer
      renderDetail={true}
      saved={savedWorkout?.some((w) => w.id === workoutToDisplay.id)}
      workout={workoutToDisplay}
    />
  );
}
