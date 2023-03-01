import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, queryUser } from "../features/userSlice";
import { searchExerciseDB } from "../utils/Api";
import Auth from "../utils/auth";
import { idbPromise } from "../utils/helpers";
import { WorkoutCardContainer } from "../containers/WorkoutCardContainer";
import SearchInput from "../components/Select";

export default function SearchWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const handleSearch = async (bodypart) => {
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

  // refresh the page and data persists
  const [bodypart, setBodypart] = useState("");
  useEffect(() => {
    if (bodypart) {
      handleSearch(bodypart);
    }
  }, []);

  return (
    <div>
      <h1 className="pt-5 text-center text-white">Get started now!</h1>
      {!Auth.loggedIn() && (
        <h4 className="mt-3 text-center text-white">Login to save workouts</h4>
      )}
      <SearchInput
        handleSearch={handleSearch}
        bodypart={bodypart}
        setBodypart={setBodypart}
      />
      <div className="container-fluid ">
        <div className="mt-5 row d-flex justify-content-center">
          {workouts &&
            workouts.map((workout) => (
              <WorkoutCardContainer key={workout.id} workout={workout} />
            ))}
        </div>
      </div>
    </div>
  );
}
