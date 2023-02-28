import React from "react";
import Button from "@mui/joy/Button";

export const ButtonToggle = ({ mode, setMode }) => {
  return (
    <Button
      variant="outlined"
      onClick={() => {
        setMode(mode === "light" ? "dark" : "light");
      }}
    >
      {mode === "light" ? "Turn dark" : "Turn light"}
    </Button>
  );
};
