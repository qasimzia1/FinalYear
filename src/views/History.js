import React from "react";
import { Grid, Paper, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import getHistory from "api/getHistory";

const useStyles = makeStyles(() => ({
  instance: {
    background: "white",
    width: "70%",
    borderRadius: "10px",
    padding: "30px 10px",
    transition: "all 0.5s",
    "&:hover": {
      transform: "scale(1.04)",
    },
  },
  subContainer: {
    borderRight: "1px solid #80808075",
  },
  heading: {
    display: "flex",
    justifyContent: "center",
    fontWeight: "bolder",
    height: "50px",
  },
  values: {
    display: "flex",
    height: "50px",
    justifyContent: "center",
    textTransform: "capitalize",
  },
}));
// const historySymp = [
//   {
//     symptoms: ["headache", "nausea", "fever"],
//     diseasePredicted: ["Infection", "Covid"],
//     date: "22 June, 2021",
//   },
// ];

const History = () => {
  const classes = useStyles();
  let history = useHistory();
  const [historySymp, setHistorySymp] = React.useState([]);
  React.useEffect(() => {
    const getHistoryAsync = async () => {
      const historyList = await getHistory(
        JSON.parse(localStorage.getItem("user"))?.email
      );
      console.log("historyList :", historyList);
      const data = historyList.data.result;
      const finalObj = [];
      data.map((instan) => {
        console.log("instan :", instan);
        finalObj.push({
          date: instan.date,
          diseasePredicted: instan.disease,
          symptoms: instan.symptoms,
        });
      });
      setHistorySymp([...finalObj]);
    };
    const session = localStorage.getItem("user");
    console.log("session :", session);
    if (!session) {
      history.push("./signIn");
    } else {
      getHistoryAsync();
    }
  }, []);

  const getSymptoms = (symptoms) => {
    let toReturn = "";
    symptoms.forEach((symptom, index) => {
      toReturn =
        toReturn + symptom + (index === symptoms.length - 1 ? "" : " , ");
    });
    return toReturn;
  };
  const getInString = (values) => {
    console.log("values :", values);
    let toReturn = "";
    values.forEach((value, index) => {
      toReturn = toReturn + value + (index === values.length - 1 ? "" : " , ");
    });
    return toReturn;
  };
  return (
    <>
      {historySymp.map((historyInstance) => {
        return (
          <Grid container className={classes.instance}>
            <Grid item xs={6}>
              <Grid container className={classes.subContainer}>
                <Grid item xs={12} className={classes.heading}>
                  Date
                </Grid>
                <Grid item xs={12} className={classes.heading}>
                  Symptoms
                </Grid>{" "}
                <Grid item xs={12} className={classes.heading}>
                  Diseases
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={12} className={classes.values}>
                  {historyInstance.date}
                </Grid>
                <Grid item xs={12} className={classes.values}>
                  {historyInstance.symptoms}
                </Grid>{" "}
                <Grid item xs={12} className={classes.values}>
                  {historyInstance.diseasePredicted}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};

export default History;
