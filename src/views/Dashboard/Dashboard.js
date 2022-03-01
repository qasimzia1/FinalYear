import React from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import { useHistory } from "react-router-dom";

// @material-ui/icons\

import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { SymptomChecker, SymptomsDropdown } from "../../components";
import getSymptoms from "api/getSymptoms";
import getDisease from "api/getDisease";
const useStyles = makeStyles(styles);

const useStyles2 = makeStyles((theme) => ({
  dropdownContainer: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  bodyMapContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  genderButtons: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    paddingLeft: "20px",
  },
  button: {
    transition: "all 0.5s",
    "&:hover": {
      backgroundColor: "#00ACC1",
      color: "white",
      transform: "scale(1.05)",
    },
  },
  heading: {
    textAlign: "center",
    borderRight: "1px solid #80808075",
    margin: "10px 5px",
  },
  match: {
    textAlign: "center",
    fontWeight: "bolder",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  resultsContainer: {
    padding: "20px 0",
  },
}));

const results = [
  { name: "Diabetic Ketoacidosis", match: "Good" },
  { name: "Endogenous Depression", match: "Fair" },
  { name: "Postconcussive Syndrome", match: "Fair" },
  { name: "Concussion", match: "Poor" },
  { name: "Dementia Associated With Alcoholism", match: "Poor" },
];

const matchToColor = {
  Good: "green",
  Fair: "orange",
  Poor: "red",
};

const Dashboard = () => {
  const classes = useStyles();
  const classes2 = useStyles2();
  const [showResult, setShowResult] = React.useState(false);
  const [symptomToShow, setSymptomToShow] = React.useState([]);
  const [partSelected, setPartSelected] = React.useState();
  const [symptomsSelected, setSymptomsSelected] = React.useState([]);
  const [diseasePredicted, setDiseasePredicted] = React.useState(null);
  const [gender, setGender] = React.useState(true);

  const [symptomsList, setSymptomsList] = React.useState([]);
  let history = useHistory();
  React.useEffect(() => {
    const session = localStorage.getItem("user");

    const getSymptomsAsync = async () => {
      const response = await getSymptoms();
      console.log("response :", response);
      if(response?.data){
        setSymptomsList(response.data.result);
      }
    };
    getSymptomsAsync();
    // console.log("session :", JSON.parse(session)?.email);
    // if (!session) {
    //   history.push("./signIn");
    // }
  }, []);
  return (
    <div>
      {/* <DenseTable /> */}
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={8}>
            <Paper className={classes2.bodyMapContainer}>
              <FormGroup className={classes2.genderButtons}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={gender}
                      onChange={(event) => setGender(event.target.checked)}
                      color={"primary"}
                    />
                  }
                  label="Male"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={!gender}
                      onChange={(event) => setGender(!event.target.checked)}
                    />
                  }
                  label="Female"
                />
              </FormGroup>
              <SymptomChecker
                setSymptomToShow={(list) => setSymptomToShow(list)}
                setPartSelected={(part) => setPartSelected(part)}
                gender={gender}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8} lg={4}>
            <Grid item xs={12} md={8} lg={12}>
              <Paper className={classes2.dropdownContainer}>
                <Typography>Body Part</Typography>
                <Typography
                  style={{
                    textTransform: "capitalize",
                    color: "#00ACC1",
                    fontWeight: "bold",
                  }}
                >
                  {partSelected ?? "None"}
                </Typography>
                <SymptomsDropdown
                  setSymptomsSelected={(value) => setSymptomsSelected(value)}
                  names={symptomsList}
                  selected={symptomsSelected}
                />
              </Paper>
            </Grid>
            <Grid item xs={6} md={4} lg={12}>
              <Paper
                className={classes2.dropdownContainer}
                style={{ margin: "10px 0", padding: "0" }}
              >
                <Button
                  className={classes2.button}
                  style={{ width: "100%", height: "100%" }}
                  onClick={() => {
                    const getPrediction = async () => {
                      const response = await getDisease(
                        symptomsSelected,
                        JSON.parse(localStorage.getItem("user"))?.email
                      );
                      console.log("response :", response);
                      setDiseasePredicted(response.data.result);
                      setShowResult(true);
                    };
                    if (symptomsSelected.length > 0) {
                      getPrediction();
                    }
                  }}
                >
                  Get Match
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={6} md={4} lg={12}>
              <Paper
                className={classes2.dropdownContainer}
                style={{ margin: "10px 0", padding: "0" }}
              >
                <Button
                  className={classes2.button}
                  style={{ width: "100%", height: "100%" }}
                  onClick={() => {
                    setSymptomsSelected([]);
                  }}
                >
                  Reset
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={6} md={4} lg={12}>
              <Paper
                className={classes2.dropdownContainer}
                style={{ margin: "10px 0", padding: "0" }}
              >
                <Button
                  className={classes2.button}
                  style={{ width: "100%", height: "100%" }}
                  href={"https://www.google.com/maps/search/hospitals"}
                  target={"_blank"}
                >
                  Find Hospitals
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={12}>
              {showResult && (
                <Paper
                  className={classes2.resultsContainer}
                  style={{ margin: "10px 0" }}
                >
                  <Typography
                    variant={"subtitle1"}
                    style={{ textAlign: "center" }}
                  >
                    Results
                  </Typography>
                  <Grid container>
                    <Grid item xs={9} className={classes2.heading}>
                      {diseasePredicted}
                    </Grid>
                    {/* {results.map((result) => {
                      return (
                        <>
                          <Grid item xs={9} className={classes2.heading}>
                            {{result.name}}
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            className={classes2.match}
                            style={{ color: matchToColor[result.match] }}
                          >
                            {result.match}
                          </Grid>
                        </>
                      );
                    })} */}
                  </Grid>
                </Paper>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;
