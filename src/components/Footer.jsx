import React from "react";

import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: 30,
    position: "static",
    bottom: 0,
  },
  typo: {
    textAlign: "center",
    flexGrow: 1,
  },
}));

function WithTheme() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Container maxWidth="lg" disableGutters>
          <Toolbar>
            <Typography className={classes.typo} variant="subtitle1">
              Kooga - Ningún vídeo se encuentra alojado en nuestros servidores.
              © 2020
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default WithTheme;
