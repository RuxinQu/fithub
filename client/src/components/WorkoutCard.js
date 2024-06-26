import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  AspectRatio,
  Box,
  Button,
  Card,
  IconButton,
  Typography,
} from "@mui/joy";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

export const WorkoutCard = ({
  workout,
  loggedIn,
  saved,
  handleAddWorkout,
  handleRemoveWorkout,
}) => {
  return (
    <Card
      variant="outlined"
      className="col-12 col-md-4 col-lg-3"
      style={{ margin: "1rem" }}
    >
      <Typography level="h2" fontSize="lg" sx={{ mb: 1 }}>
        {workout.name}
      </Typography>
      <Typography level="body2">
        <Button variant="soft">{workout.target}</Button>
      </Typography>
      {loggedIn && (
        <IconButton
          // if the card is selected, saved is true, click event will trigger handleRemoveWorkout function
          onClick={() => {
            if (saved) {
              handleRemoveWorkout(workout.id);
            } else {
              handleAddWorkout(workout);
            }
          }}
          variant="plain"
          sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
        >
          {saved ? (
            <FavoriteOutlinedIcon color="danger" />
          ) : (
            <FavoriteBorderOutlinedIcon color="danger" />
          )}
        </IconButton>
      )}

      <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
        <LazyLoadImage alt={workout.name} src={workout.gifUrl} />
      </AspectRatio>

      <Box sx={{ display: "flex" }}>
        <Link
          sx={{ ml: "auto", fontWeight: 600 }}
          // // link to the detail page
          to={`/workout/detail/${workout.id}`}
          style={{ textDecoration: "none" }}
        >
          View Detail
        </Link>
      </Box>
    </Card>
  );
};
