import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  mediaThumbnail: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    height: "aut0",
    width: 300,
    [theme.breakpoints.down("md")]: {
      width: 220,
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "40%",
    },
  },
}));

function LeftInformation() {
  const classes = useStyles();
  return (
    <Card>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} sm={4} md={12}>
          <CardMedia
            className={classes.mediaThumbnail}
            component="img"
            src={
              "https://firebasestorage.googleapis.com/v0/b/monosotakos.appspot.com/o/classroom-of-the-elite%2Fthumbnail.jpg?alt=media"
            }
            title={"name"}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={12}>
          <CardContent>
            <Typography gutterBottom variant="h6" component="h5">
              Información general
            </Typography>
            <TextField
              label="Tipo"
              variant="outlined"
              color="secondary"
              style={{ width: "100%", paddingBottom: 10 }}
            />
            <TextField
              label="Fecha de emisión"
              variant="outlined"
              color="secondary"
              style={{ width: "100%", paddingBottom: 10 }}
            />
            <TextField
              label="Estado"
              variant="outlined"
              color="secondary"
              style={{ width: "100%", paddingBottom: 10 }}
            />
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}

export default LeftInformation;
