import React from "react";
import { useNavigate } from "react-router-dom";

import { IconButton, Button } from "@mui/joy";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";

export const WorkoutDetail = ({
  workout,
  saved,
  loggedIn,
  handleAddWorkout,
  handleRemoveWorkout,
}) => {
  const navigate = useNavigate();
  return (
    <div>
      <IconButton
        variant="solid"
        sx={{ margin: "1rem 0 0 2rem" }}
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon />
      </IconButton>
      <div className="row mt-2 d-flex align-items-center justify-content-center ">
        <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
          <img
            alt={workout.name}
            src={workout.gifUrl}
            style={{ width: "70%", borderRadius: 15 }}
          />
        </div>
        <div className="detail-text col-12 col-md-6 text-shadow">
          <h3>{workout.name}</h3>
          <p>Equipment: {workout.equipment}</p>
          <p>Body part: {workout.bodyPart}</p>
          <p>Target: {workout.target}</p>
          {loggedIn ? (
            <>
              {saved && (
                <IconButton
                  variant="solid"
                  onClick={() => handleRemoveWorkout(workout.id)}
                >
                  <HeartBrokenIcon color="danger" />
                  Remove from my workout
                </IconButton>
              )}
              {!saved && (
                <IconButton
                  variant="solid"
                  onClick={() => handleAddWorkout(workout)}
                >
                  <FavoriteBorderOutlinedIcon color="danger" />
                  Add to my workout
                </IconButton>
              )}
            </>
          ) : (
            <Button
              variant="solid"
              onClick={() => {
                window.location.assign("/login");
              }}
            >
              Login to save workouts
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
