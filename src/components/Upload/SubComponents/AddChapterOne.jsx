import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  large: {
    width: "80%",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 30,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  short: {
    marginBottom: 10,
    marginTop: 10,
    width: "10%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

function AddChapter({ rows, addRows }) {
  const classes = useStyles();
  //const [rows, setRows] = useState([]);

  const [init, setInit] = useState("");

  const [initFor, setInitFor] = useState("");

  const [message, setMessage] = useState("");

  const handleClick = () => {
    if (init.length > 0 && initFor.length > 0) {
      let not = [];
      for (let i = 0; i < rows.length; i++) {
        not.push(rows[i].num);
      }
      if (not.indexOf(initFor) === -1) {
        //setRows([...rows, { num: initFor, url: init }]);
        addRows([...rows, { num: initFor, url: init }]);
      } else {
        setError(false);
        setMessage(
          "El valor ingresado ya se encuentra en los registros, verifique los datos y vuelva a intentar."
        );
        setError(true);
      }
    } else {
      setError(false);
      setMessage("Los campos no pueden estar vacios.");
      setError(true);
    }
  };

  const [error, setError] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  return (
    <Card>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <CardContent style={{ width: "80%" }}>
          <h1>Ingreso de capítulos de forma manual</h1>
          <h2>Ejemplo</h2>
          <Grid item xs={12}>
            <TextField
              value={"001"}
              label="Número"
              color="secondary"
              className={classes.short}
              disabled
            />
            <TextField
              value={
                "https://storage.googleapis.com/proven-reality-256313.appspot.com/OP - 001.mp4"
              }
              label="Url del capítulo"
              color="secondary"
              className={classes.large}
              disabled
            />
          </Grid>

          {/* Fin ejemplo */}
          <h2>Ingreso</h2>
          <Grid item xs={12}>
            <TextField
              value={initFor}
              onChange={(event) => setInitFor(event.target.value)}
              label="Número"
              color="secondary"
              className={classes.short}
            />
            <TextField
              value={init}
              onChange={(event) => setInit(event.target.value)}
              label="Url del capítulo"
              color="secondary"
              className={classes.large}
            />
          </Grid>

          <Grid container direction="row" justify="center" alignItems="center">
            <Button
              style={{
                margin: 20,
              }}
              variant="outlined"
              onClick={(event) => {
                handleClick();
              }}
            >
              Añadir episodio
            </Button>
          </Grid>
        </CardContent>
      </Grid>
      <Snackbar open={error} autoHideDuration={10000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {/* Los datos ingresados no cumplen con las exigencias del sistema,
          verifique los datos nuevamente y vuelva a intentar. */}
          {message}
        </Alert>
      </Snackbar>
    </Card>
  );
}

export default AddChapter;
