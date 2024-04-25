import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSavedWorkout, selectWorkouts } from "../features/workoutSlice";
import { selectUser, queryUser } from "../features/userSlice";
import Auth from "../utils/auth";

import { ToggleCalendar } from "../components/ToggleCalendar";
import { WorkoutCardContainer } from "../containers/WorkoutCardContainer";

export default function MyWorkouts() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const savedWorkout = useSelector(selectWorkouts);
  useEffect(() => {
    dispatch(queryUser());
    dispatch(updateSavedWorkout(user.workouts));
  }, [user, dispatch]);

  const loggedIn = Auth.loggedIn();
  return (
    <div>
      {loggedIn ? (
        <div className="container-fluid ">
          <ToggleCalendar />
          <h2 className="text-center text-shadow">My Workouts</h2>
          <div className="mt-5 row d-flex justify-content-center">
            {savedWorkout?.length ? (
              savedWorkout.map((workout) => (
                <WorkoutCardContainer
                  key={workout.id}
                  workout={workout}
                  saved={true}
                />
              ))
            ) : (
              <h4 className="mt-5 text-center text-shadow">No saved workout</h4>
            )}
          </div>
        </div>
      ) : (
        <h2 className="mt-5 text-center text-shadow">You need to login!</h2>
      )}
    </div>
  );
}
