import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();

  const {
    hasAccount,
    setHasAccount,
    email,
    setEmail,
    password,
    setPassword,
    user,
    setUser,
    emailError,
    setEmailError,
    passwordError,
    setPasswordError,
    handleSubmit,
    clearErrors,
    clearInputs,
  } = props;

  function switchOptions() {
    clearErrors();
    clearInputs();
    setHasAccount(!hasAccount);
  }

  return (
    <div className="signinContainer">
      <div className="wrapperContainer">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {hasAccount ? "Sign In" : "Sign Up"}
            </Typography>
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <TextField
                error={emailError ? true : false}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                helperText={emailError}
              />
              <TextField
                error={passwordError ? true : false}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={passwordError}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {hasAccount ? "Sign In" : "Sign Up"}
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    href="#"
                    onClick={() => switchOptions()}
                    variant="body2"
                  >
                    {hasAccount
                      ? "Don't have an account? Sign Up"
                      : "Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
}
