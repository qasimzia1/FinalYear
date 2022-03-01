import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {
  Link,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import signUp from "../api/signUp";
import { useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  let history = useHistory();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          onSubmit={async (event) => {
            event.preventDefault();

            const response = await signUp({
              name:
                event.target.elements["firstName"].value +
                " " +
                event.target.elements["lastName"].value,
              password: event.target.elements["password"].value,
              password_confirmation: event.target.elements["password"].value,
              email: event.target.elements["email"].value,
              gender: event.target.elements["gender"].value,
              age: event.target.elements["age"].value,
              dob: event.target.elements["dob"].value,
              address: event.target.elements["address"].value,
            });
            console.log("Response ::", response);

            if (response.data.errors) {
              console.log("in errors");
              alert(
                Object.keys(response.data.errors[0])[0] +
                  " " +
                  response.data.errors[0][
                    Object.keys(response.data.errors[0])[0]
                  ]
              );
            } else if (response.status === 200) {
              console.log("response ::", response);
              localStorage.setItem(
                "user",
                JSON.stringify(response.data.result)
              );
              history.push("/dashboard");
            }
          }}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                name="age"
                label="Age"
                type="number"
                id="age"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl style={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={(value) => console.log(value)}
                  variant={"outlined"}
                  name="gender"
                  label="gender"
                >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                  <MenuItem value={"other"}>other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                name="dob"
                label="Date of birth"
                type="date"
                id="dob"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                name="address"
                label="Address"
                type="text"
                id="address"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="./signIn" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
