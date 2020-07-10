import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import Table from "./TableChapter";

const useStyles = makeStyles((theme) => ({
  large: {
    width: "75%",
    marginBottom: 10,
    marginTop: 10,
    marginRight: 30,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  short: {
    marginBottom: 10,
    marginTop: 10,
    width: "20%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

function AddChapter() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);

  const [init, setInit] = useState("");
  const [last, setLast] = useState("");

  const [initFor, setInitFor] = useState("");
  const [lastFor, setLastFor] = useState("");

  const handleClick = () => {
    var linkList = [];
    const baseUrl1 = init.slice(0, init.indexOf(initFor));
    let iterative1 = init.slice(
      init.indexOf(initFor),
      init.indexOf(initFor) + initFor.length
    );
    const ext1 = init.slice(init.indexOf(initFor) + initFor.length);
    const baseUrl2 = last.slice(0, last.indexOf(lastFor));
    let iterative2 = last.slice(
      last.indexOf(lastFor),
      last.indexOf(lastFor) + lastFor.length
    );
    const ext2 = last.slice(last.indexOf(lastFor) + lastFor.length);

    if (
      baseUrl1 === baseUrl2 &&
      ext1 === ext2 &&
      init.length === last.length &&
      initFor.length === lastFor.length &&
      iterative1 === initFor &&
      iterative2 === lastFor &&
      init.length > 0 &&
      initFor.length > 0 &&
      last.length > 0 &&
      lastFor.length > 0
    ) {
      let num = "";
      for (
        let i = parseInt(iterative1, 10);
        i <= parseInt(iterative2, 10);
        i++
      ) {
        if (i.toString().length < initFor.length) {
          num = "00000".slice(0, initFor.length - i.toString().length);
        } else {
          num = "";
        }
        linkList.push({
          num: `${num + i}`,
          url: `${baseUrl1}${num + i}${ext1}`,
        });
      }
    } else {
      setError(true);
    }
    setRows(linkList);
  };

  const [error, setError] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  return (
    <Card style={{ marginTop: 20 }}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <CardContent style={{ width: "80%" }}>
          <h1>Ingreso de capítulos de forma iterativa</h1>
          <h2>Ejemplo</h2>
          <TextField
            value={
              "https://storage.googleapis.com/proven-reality-256313.appspot.com/OP - 001.mp4"
            }
            label="Primer url del capítulo"
            color="secondary"
            className={classes.large}
            disabled
          />
          <TextField
            value={"001"}
            label="Parte iterable"
            color="secondary"
            className={classes.short}
            disabled
          />
          <TextField
            value={
              "https://storage.googleapis.com/proven-reality-256313.appspot.com/OP - 900.mp4"
            }
            onChange={(event) => setLast(event.target.value)}
            label="Último url del capítulo"
            color="secondary"
            className={classes.large}
            disabled
          />
          <TextField
            value={"900"}
            label="Parte iterable"
            color="secondary"
            className={classes.short}
            disabled
          />

          {/* Fin ejemplo */}

          <TextField
            value={init}
            onChange={(event) => setInit(event.target.value)}
            label="Primer url del capítulo"
            color="secondary"
            className={classes.large}
          />
          <TextField
            value={initFor}
            onChange={(event) => setInitFor(event.target.value)}
            label="Parte iterable"
            color="secondary"
            className={classes.short}
          />
          <TextField
            value={last}
            onChange={(event) => setLast(event.target.value)}
            label="Último url del capítulo"
            color="secondary"
            className={classes.large}
          />
          <TextField
            value={lastFor}
            onChange={(event) => setLastFor(event.target.value)}
            label="Parte iterable"
            color="secondary"
            className={classes.short}
          />
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
              Generar episodios
            </Button>
          </Grid>
          <Table rows={rows} />
        </CardContent>
      </Grid>
      <Snackbar open={error} autoHideDuration={10000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Los datos ingresados no cumplen con las exigencias del sistema,
          verifique los datos nuevamente y vuelva a intentar.
        </Alert>
      </Snackbar>
    </Card>
  );
}

export default AddChapter;
