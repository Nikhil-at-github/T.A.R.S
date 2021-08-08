import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Grid,
  Button,
  IconButton,
  makeStyles,
} from "@material-ui/core";

import PhotoCamera from "@material-ui/icons/PhotoCamera";
import "./style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

function Home() {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInput = useRef();

  let history = useHistory();

  // useEffect(() => {
  //   console.log("Change ki value ++",change);
  // }, [change]);

  const fileSelectedHandler = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  const fileUploadHandler = async () => {
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("filename", selectedFile.name);
    let result = await axios.post("http://localhost:5000/upload", data);
    if (result && result.status === 200) {
      console.log("Response ====>", result);
      const response = await axios.post(
        "http://localhost:5000/img",
        result.data
      );
      if (response && response.status === 200) {
        console.log("IMG RESPONSE===", response);
        // setRes(response.data);
        // setChange(true);
        history.push({
          pathname: "/result",
          state: { image: selectedFile,
            data:  response.data},
        })
      }
    }
  };


  return (
    <>
      <Container fixed>
        <h1 align="center">T.A.R.S </h1>
        <h6 align="center" style={{ marginTop: "-1rem" }}>
          {" "}
          Tree Association and Representaion System
        </h6>
      </Container>
      <Container fixed>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          style={{ margin: " 5rem 0rem" }}
        >
          <input
            style={{ display: "none" }}
            type="file"
            onChange={fileSelectedHandler}
            ref={fileInput}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={() => fileInput.current.click()}
          >
            {" "}
            Check It
          </Button>

          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <IconButton
              aria-label="upload picture"
              component="span"
              style={{
                color: "#3a9d2d",
                backgroundColor: "#faebd7",
                border: "solid 5px #c29e5b",
              }}
            >
              <PhotoCamera />
            </IconButton>
          </label>

          {/* <UploadButtons/> */}
          <Button variant="contained" color="secondary">
            {" "}
            Add to Database
          </Button>
        </Grid>
        <Grid
          container
          direction="col"
          justifyContent="space-evenly"
          alignItems="flex-start"
          style={{ margin: " 5rem 0rem" }}
        >
          {selectedFile && (
            <Button
              variant="contained"
              color="primary"
              onClick={fileUploadHandler}
            >
              Upload
            </Button>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default Home;
