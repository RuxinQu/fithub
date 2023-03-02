import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSavedWorkout, selectWorkouts } from "../features/workoutSlice";
import { selectUser, queryUser } from "../features/userSlice";
import Auth from "../utils/auth";
import { ToggleCalendar } from "../components/Modal";
import { WorkoutCardContainer } from "../containers/WorkoutCardContainer";

export default function MyWorkouts() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const savedWorkout = useSelector(selectWorkouts);
  useEffect(() => {
    dispatch(queryUser());
    dispatch(updateSavedWorkout(user.workouts));
  }, [user]);

  const loggedIn = Auth.loggedIn();
  return (
    <div>
      {loggedIn ? (
        <div className="container-fluid ">
          <ToggleCalendar />
          <h1 className="text-center text-white">My Workouts</h1>
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
              <h2 className="mt-5 text-center text-white">No saved workout</h2>
            )}
          </div>
        </div>
      ) : (
        <h1 className="mt-5 text-center text-white">You need to login!</h1>
      )}
    </div>
  );
}
