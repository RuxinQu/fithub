import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, queryUser } from "../features/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
    dispatch(queryUser());
  }, [user]);

  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-center text-white">
      {user.username && (
        <h1
          style={{ fontSize: "4rem", fontWeight: 400 }}
          className="text-center"
        >
          Let's go {user.username}!
        </h1>
      )}
      <h1
        style={{ fontSize: "4rem", fontWeight: 400 }}
        className="mt-5 text-center"
      >
        What do you want to get done today?{" "}
      </h1>
    </div>
  );
};

export default Home;
