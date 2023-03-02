import React from "react";
import { Select, Option, Button } from "@mui/joy";

export const SearchInput = ({ handleSearch, setBodypart, bodypart }) => {
  return (
    <div
      className="container-fluid d-flex justify-content-center"
      style={{ marginTop: "2rem" }}
    >
      <Select
        placeholder="Select a body part…"
        value={bodypart}
        onChange={(e, newValue) => setBodypart(newValue)}
        sx={{ minWidth: 160 }}
      >
        <Option value="back">Back</Option>
        <Option value="chest">Chest</Option>
        <Option value="shoulders">Shoulders</Option>
        <Option value="cardio">Cardio</Option>
      </Select>
      <Button onClick={() => handleSearch(bodypart)}>Search</Button>
    </div>
  );
};
