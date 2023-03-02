import React from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import { Button, IconButton } from "@mui/joy";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";

const style = {
  textShadow: "10px 10px 10px #000",
  color: "#fff",
};

export const WorkoutDetail = ({
  workout,
  handleAddWorkout,
  handleRemoveWorkout,
  saved,
}) => {
  const navigate = useNavigate();
  return (
    <div>
      <Button style={{ marginTop: "1rem" }} onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </Button>
      <div className="row mt-2 d-flex align-items-center justify-content-center ">
        <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
          <img
            alt={workout.name}
            src={workout.gifUrl}
            style={{ width: "80%", borderRadius: 15 }}
          />
        </div>
        <div
          className="col-12 col-md-6 text-white "
          style={{ fontSize: "1.5rem" }}
        >
          <h1
            style={{
              fontWeight: 600,
              textShadow: "10px 10px 10px #000",
              color: "#fff",
            }}
          >
            {workout.name}
          </h1>
          <p style={style}>Equipment: {workout.equipment}</p>
          <p style={style}>Body part: {workout.bodyPart}</p>
          <p style={style}>Target: {workout.target}</p>
          {Auth.loggedIn() ? (
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
