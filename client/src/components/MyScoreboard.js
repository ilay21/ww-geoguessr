import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_SCORES } from "../gql/queries/score.queries";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CreateNewScore from "./CreateNewScore";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function MyScoreboard() {
  const { loading, error, data } = useQuery(GET_ALL_SCORES, {
    variables: { allScoresCategory: "world" },
  });
  const classes = useStyles();

  if (loading) return "Loading...";
  if (error) return `Error! ${error}`;
  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        justifyContent={"space-around"}
        style={{ height: "100vh" }}
      >
        <Grid item xs={12} justifyContent={"center"} alignContent={"center"}>
          <CreateNewScore />
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default MyScoreboard;