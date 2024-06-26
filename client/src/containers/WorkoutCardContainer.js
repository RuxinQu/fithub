import { useDispatch } from "react-redux";
import { addWorkout, removeWorkout } from "../features/workoutSlice";
import Auth from "../utils/auth";
import { WorkoutCard } from "../components/WorkoutCard";
import { WorkoutDetail } from "../components/WorkoutDetail";

export const WorkoutCardContainer = ({ workout, saved, renderDetail }) => {
  const dispatch = useDispatch();

  // handle add workout
  const handleAddWorkout = async (workoutToSave) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      dispatch(addWorkout(workoutToSave));
    } catch (err) {
      console.log(err);
    }
  };

  // remove the workout by id
  const handleRemoveWorkout = async (workoutId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      dispatch(removeWorkout(workoutId));
    } catch (err) {
      console.log(err);
    }
  };

  // myworkout page passes a prop add to this Component, when this component is rended in myworkout page, set added to always be true,
  // so the 'like' icon only needs to handle remove workout function; otherwise, it's in search workout page, for each card, it runs
  // .some() method to check whether it's selected
  // const saved = savedWorkout.some((w) => w.id === workout.id);
  const loggedIn = Auth.loggedIn();

  return renderDetail ? (
    <WorkoutDetail
      workout={workout}
      handleAddWorkout={handleAddWorkout}
      handleRemoveWorkout={handleRemoveWorkout}
      saved={saved}
      loggedIn={loggedIn}
    />
  ) : (
    <WorkoutCard
      workout={workout}
      handleAddWorkout={handleAddWorkout}
      handleRemoveWorkout={handleRemoveWorkout}
      saved={saved}
      loggedIn={loggedIn}
    />
  );
};
