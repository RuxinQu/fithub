import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, queryUser } from "../features/userSlice";
import { selectWorkouts, updateSavedWorkout } from "../features/workoutSlice";

import { searchExerciseDB } from "../utils/Api";
import Auth from "../utils/auth";
import { idbPromise } from "../utils/helpers";

import { SearchInput } from "../components/SearchInput";
import { WorkoutCardContainer } from "../containers/WorkoutCardContainer";

export default function SearchWorkouts() {
  const dispatch = useDispatch();
  //search workouts by bodypart
  const [workouts, setWorkouts] = useState([]);
  const handleSearch = async (bodypart) => {
    localStorage.setItem("bodypart", bodypart);
    try {
      // if api response was saved in indexedDB, no need to do api calls
      const workouts = await idbPromise(bodypart, "get");
      if (workouts.length) {
        console.log("========retrieving data from idb========");
        setWorkouts(workouts);
        return;
      } else {
        const response = await searchExerciseDB(bodypart);
        console.log("========making an api call to exerciseDB========");
        if (response.ok) {
          const jsonResponse = await response.json();
          setWorkouts(jsonResponse);
          jsonResponse.forEach((workout) => {
            idbPromise(bodypart, "put", workout);
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  // get user saved workouts
  const user = useSelector(selectUser);
  const savedWorkout = useSelector(selectWorkouts);
  useEffect(() => {
    dispatch(queryUser());
    dispatch(updateSavedWorkout(user.workouts));
  }, [user]);

  // refresh the page and data persists
  const [bodypart, setBodypart] = useState("");
  useEffect(() => {
    const bodypart = localStorage.getItem("bodypart");
    if (bodypart) {
      setBodypart(bodypart);
      handleSearch(bodypart);
    }
  }, []);

  return (
    <div>
      <h2 className="pt-5 text-center text-shadow">Get started now!</h2>
      {!Auth.loggedIn() && (
        <h4 className="mt-3 text-center text-shadow">Login to save workouts</h4>
      )}
      <SearchInput
        bodypart={bodypart}
        handleSearch={handleSearch}
        setBodypart={setBodypart}
      />
      <div className="container-fluid ">
        <div className="mt-5 row d-flex justify-content-center">
          {workouts &&
            workouts.map((workout) => (
              <WorkoutCardContainer
                key={workout.id}
                workout={workout}
                saved={savedWorkout?.some((w) => w.id === workout.id)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
