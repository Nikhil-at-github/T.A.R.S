import React from "react";
import { useHistory } from "react-router-dom";
import { Container, Box, Grid, Button } from "@material-ui/core";

function ResultPage(props) {
  console.log("RESULT PAGE DATA====", props.location && props.location.state);
  let history = useHistory();
  const backToHome = () => {
    history.push({
      pathname: "/",
    });
  };
  return (
    <>
      <Box>
        <h1 align="center">Plant Details</h1>
        <br />
      </Box>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" color="secondary" onClick={backToHome}>
          Check Another
        </Button>
        <br />
      </Box>
      <Container>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={6}
            align="center"
            style={{ border: "1px solid black", borderRadius: "25%" }}
          >
            <h2>Scientific Name</h2>
            {props.location &&
              props.location.state &&
              props.location.state.data.results &&
              props.location.state.data.results.map((item, i) => (
                <div>
                  <p>{item.species.scientificName}</p>
                </div>
              ))}
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            align="center"
            style={{ border: "1px solid black", borderRadius: "25%" }}
          >
            <h2>Common Names</h2>
            {props.location &&
              props.location.state &&
              props.location.state.data.results &&
              props.location.state.data.results.map((item, i) =>
                item.species.commonNames.map((x) => <p>{x}</p>)
              )}
          </Grid>
          <br />
          <Grid
            item
            xs={12}
            sm={6}
            align="center"
            style={{ border: "1px solid black", borderRadius: "25%" }}
          >
            <h2>Genus</h2>
            {props.location &&
              props.location.state &&
              props.location.state.data.results &&
              props.location.state.data.results.map((item, i) => (
                <p>{item.species.genus.scientificName}</p>
              ))}
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            align="center"
            style={{ border: "1px solid black", borderRadius: "25%" }}
          >
            <h2>Family</h2>
            {props.location &&
              props.location.state &&
              props.location.state.data.results &&
              props.location.state.data.results.map((item, i) => (
                <p>{item.species.family.scientificName}</p>
              ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ResultPage;
