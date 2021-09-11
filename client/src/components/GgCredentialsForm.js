import React, { useEffect } from "react";
// Modules
import { useForm } from "react-hook-form";
// MUI Core
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { ErrorMessage } from "@hookform/error-message";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));
function GgCredentialsForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // const errorKeys = Object.keys(errors);
  // if (errorKeys?.length) {
  //   const fieldName = errorKeys[0];
  //   const errorMsg = errors[fieldName].message;
  //   enqueueSnackbar(`${fieldName} - ${errorMsg}`, { variant: "error" });
  // }
  const errorMsgRender = ({ message }) => {
    return <Typography variant={"caption"}>{message}</Typography>;
  };
  return (
    <Container className={classes.container} maxWidth="xs">
      <Typography style={{ paddingBottom: 10 }} variant={"body2"}>
        😩 Sorry, we don't have your credentials to GeoGuessr
      </Typography>
      <Typography style={{ paddingBottom: 10 }} variant={"body2"}>
        🙏🏻 Please insert your email and password to GeoGuessr
      </Typography>
      <Typography style={{ paddingBottom: 10 }} variant={"body2"}>
        🤞🏻 don't worry, we won't store it anywhere
      </Typography>
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...register("email", {
                    required: "Email is required",
                    validate: validateEmail,
                  })}
                  fullWidth
                  label="Geoguessr Email"
                  size="small"
                  variant="outlined"
                />
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={errorMsgRender}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("password", {
                    required: "Password is required",
                  })}
                  fullWidth
                  label="Geoguessr Password"
                  size="small"
                  type="password"
                  variant="outlined"
                />
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={errorMsgRender}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button
              color="secondary"
              fullWidth
              type="submit"
              variant="contained"
            >
              Update Score
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default GgCredentialsForm;
