import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, queryUser } from "../features/userSlice";

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
    dispatch(queryUser());
  }, [user]);

  return (
    <div className="home container d-flex flex-column align-items-center justify-content-center">
      {user.username && (
        <h1 className="text-center text-shadow">Let's go {user.username}!</h1>
      )}
      <h1 className="mt-5 text-center text-shadow">
        What do you want to get done today?
      </h1>
    </div>
  );
}
