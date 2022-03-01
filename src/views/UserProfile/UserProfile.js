import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { Link, FormControl, Select, MenuItem } from "@material-ui/core";
import avatar from "assets/img/faces/marc.jpg";
import editUser from "api/editUser";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  let history = useHistory();
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );
  React.useEffect(() => {
    const session = localStorage.getItem("user");
    console.log("session :", session);
    if (!session) {
      history.push("./signIn");
    }
  }, []);

  const [age, setAge] = React.useState(
    +JSON.parse(localStorage.getItem("user"))?.age
  );

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              console.log("Submitted");

              const response = await editUser({
                name: event.target.elements["username"].value,
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
                let newUser = JSON.parse(localStorage.getItem("user"));
                newUser.name = event.target.elements["username"].value;
                newUser.gender = event.target.elements["gender"].value;
                newUser.age = event.target.elements["age"].value;
                newUser.dob = event.target.elements["dob"].value;
                newUser.address = event.target.elements["address"].value;
                localStorage.setItem("user", JSON.stringify(newUser));
                setUser(newUser);
                history.push("/dashboard");
              }
            }}
            noValidate
          >
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                <p className={classes.cardCategoryWhite}>
                  Complete your profile
                </p>
              </CardHeader>
              <CardBody>
                <div className={classes.mainContainer}>
                  <TextField
                    autoComplete="username"
                    name="username"
                    variant="outlined"
                    fullWidth
                    id="username"
                    label="Username"
                    autoFocus
                    defaultValue={user?.name}
                  />
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-label">
                      Gender
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={(value) => console.log(value)}
                      variant={"outlined"}
                      name="gender"
                      label="gender"
                      defaultValue={user?.gender}
                    >
                      <MenuItem value={"male"}>Male</MenuItem>
                      <MenuItem value={"female"}>Female</MenuItem>
                      <MenuItem value={"other"}>other</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    variant="outlined"
                    required
                    name="age"
                    label="Age"
                    type="number"
                    id="age"
                    onChange={(event) => {
                      setAge(event.target.value);
                    }}
                    value={age}
                  />
                  <TextField
                    variant="outlined"
                    required
                    name="dob"
                    label="Date of Birth"
                    type="date"
                    id="dob"
                    defaultValue={user?.dob}
                  />
                  <TextField
                    autoComplete="address"
                    variant="outlined"
                    required
                    name="address"
                    label="Address"
                    id="address"
                    defaultValue={user?.address}
                  />
                </div>
              </CardBody>
              <CardFooter>
                <Button color="primary" type="submit">
                  Update Profile
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>User Info</h6>
              <h4 className={classes.cardTitle}>{user?.name}</h4>
              <p className={classes.description}>"Being in control of your life and having realistic expectations about your day-to-day challenges are the keys to stress management, which is perhaps the most important ingredient to living a happy, healthy and rewarding life."</p>
              <p className={classes.description}>Marilu Henner</p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
