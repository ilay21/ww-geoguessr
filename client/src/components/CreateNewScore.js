import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  Paper,
  Tooltip,
  IconButton,
  Divider,
  InputBase,
  CircularProgress,
  Popover,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import PublishIcon from "@mui/icons-material/Publish";
import GgCredentialsForm from "./GgCredentialsForm";
import { UserContext } from "../stores";
import { CREATE_SCORE } from "../gql/mutations/score.mutations";
import { GET_SCOREBOARD_BY_TITLE } from "../gql/queries/scoreboard.queries";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { green } from "@mui/material/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  fabProgress: {
    color: green[100],
    position: "absolute",
  },
}));

function CreateNewScore() {
  const classes = useStyles();
  const [{ user }] = useContext(UserContext);
  const [url, setUrl] = useState("");
  let { scoreboardTitle } = useParams();
  const {
    loading: getScoreboardsLoading,
    error: getScoreboardsError,
    data: { getScoreboardByTitle: scoreboard } = {},
  } = useQuery(GET_SCOREBOARD_BY_TITLE, { variables: { scoreboardTitle } });

  const [createScoreMutation, { data, loading, error }] =
    useMutation(CREATE_SCORE);

  const { enqueueSnackbar } = useSnackbar();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const createNewScoreHandler = async (e) => {
    try {
      //todo - update score via api mutation to a new endpoint which runs puppeteer and all that- this endpoint need to support 2 use cases:
      // 1. no email and password provided - when the user has the ggCredentials stored in db
      // 2. email & password - for users that don't want to provide this details - and want us not to store this info.
      if (user?.gotGgCredentials) {
        await createScoreMutation({
          variables: { url, scoreboardId: scoreboard._id, scoreboardTitle },
        });
      } else {
        setAnchorEl(e.currentTarget);
      }
    } catch (e) {
      enqueueSnackbar(e.message, {
        variant: "error",
      });
    }
  };

  const popoverOpen = Boolean(anchorEl);
  const id = popoverOpen ? "simple-popover" : undefined;
  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Paste here GeoGuessr game result url..."
        inputProps={{ "aria-label": "game result updater input" }}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <Tooltip title={"Upload new game results"}>
        <IconButton
          color="primary"
          className={classes.iconButton}
          aria-label="directions"
          onClick={async (e) => {
            await createNewScoreHandler(e);
          }}
        >
          {loading && (
            <CircularProgress size={45} className={classes.fabProgress} />
          )}
          <PublishIcon />
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div>
          <GgCredentialsForm />
        </div>
      </Popover>
    </Paper>
  );
}

export default CreateNewScore;
