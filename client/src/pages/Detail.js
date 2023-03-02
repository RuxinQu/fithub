import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSavedWorkout, selectWorkouts } from "../features/workoutSlice";
import { selectUser, queryUser } from "../features/userSlice";
import { useParams } from "react-router-dom";

import { searchById } from "../utils/Api";
import { idbPromise } from "../utils/helpers";
import { WorkoutCardContainer } from "../containers/WorkoutCardContainer";
import Auth from "../utils/auth";
import { Button, IconButton } from "@mui/joy";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";

const style = {
  textShadow: "10px 10px 10px #000",
  color: "#fff",
};

export default function Detail() {
  const { workoutId } = useParams();
  const dispatch = useDispatch();
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

  const saved = savedWorkout?.some((w) => w.id === workoutToDisplay.id);

  return (
    <WorkoutCardContainer
      renderDetail={true}
      saved={saved}
      workout={workoutToDisplay}
    />
  );
}
