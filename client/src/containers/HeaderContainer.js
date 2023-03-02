import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, queryUser } from "../features/userSlice";
import { useColorScheme } from "@mui/joy/styles";
import Auth from "../utils/auth";
import { Header } from "../components/Header";

export default function HeaderContainer() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
    dispatch(queryUser());
  }, [user]);

  const { mode, setMode } = useColorScheme("light");
  const loggedIn = Auth.loggedIn();
  const logout = () => Auth.logout();
  return (
    <Header
      user={user}
      mode={mode}
      setMode={setMode}
      loggedIn={loggedIn}
      logout={logout}
    />
  );
}
