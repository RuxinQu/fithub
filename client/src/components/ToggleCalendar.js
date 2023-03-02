import React, { useState, Fragment } from "react";
import Calendar from "react-calendar";
import { Button, Modal, ModalClose, Sheet } from "@mui/joy";
import "react-calendar/dist/Calendar.css";

export const ToggleCalendar = () => {
  const [open, setOpen] = useState(false);
  const [value, onChange] = useState(new Date());
  return (
    <Fragment>
      <Button
        sx={{ marginTop: 2 }}
        variant="soft"
        color="neutral"
        onClick={() => setOpen(true)}
      >
        Calendar
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: "calc(-1/4 * var(--IconButton-size))",
              right: "calc(-1/4 * var(--IconButton-size))",
              boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
              borderRadius: "50%",
              bgcolor: "background.body",
            }}
          />
          <Calendar
            onChange={onChange}
            value={value}
            style={{ position: "absolute", top: 0 }}
          />
        </Sheet>
      </Modal>
    </Fragment>
  );
};
