import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ChipInput from "material-ui-chip-input";
import { useMutation } from "@apollo/client";
import { CREATE_SCOREBOARD } from "../gql/mutations/scoreboard.mutations";
import { useSnackbar } from "notistack";

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default function AddNewScoreboardDialog({ open, setOpen }) {
  const [emails, setEmails] = useState([]);
  const [title, setTitle] = useState("");
  const [loginMutation, { data, loading, error }] =
    useMutation(CREATE_SCOREBOARD);
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    setEmails([]);
    setTitle("");
    setOpen(false);
  };

  const handleAddEmail = (email) => {
    if (!validateEmail(email)) {
      enqueueSnackbar("Email format is invalid", {
        variant: "error",
      });
    } else if (emails.length > 19) {
      enqueueSnackbar("a single scoreboard support up too 20 emails", {
        variant: "error",
      });
    } else if (!emails.includes(email)) setEmails([email, ...emails]);
  };

  const createScoreboard = async () => {
    try {
      await loginMutation({ variables: { title, emails } });
    } catch (e) {
      if (error) {
        enqueueSnackbar(error.message, {
          variant: "error",
        });
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">New Scoreboard</DialogTitle>
      <DialogContent style={{ height: "300px" }}>
        <DialogContentText>
          In the new scoreboard you will be able to upload new scores and see
          them in a informative layout
        </DialogContentText>
        <Grid container direction={"column"} spacing={3} justify={"center"}>
          <Grid item>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Scoreboard Title"
              type="text"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item>
            <ChipInput
              fullWidth
              value={emails}
              onAdd={handleAddEmail}
              helperText={<div>Emails to be added for this scoreboard"</div>}
              onDelete={(email) =>
                setEmails(
                  emails.filter((existingEmail) => existingEmail !== email)
                )
              }
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={createScoreboard}
          color="primary"
          disabled={emails.length === 0 || !title}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
