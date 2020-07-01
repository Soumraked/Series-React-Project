import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import withWidth from "@material-ui/core/withWidth";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 150,
    [theme.breakpoints.down("md")]: {
      height: 100,
    },
    [theme.breakpoints.down("sm")]: {
      height: 75,
    },
    [theme.breakpoints.down("xs")]: {
      height: 50,
    },
  },
  mediaThumbnail: {
    height: "aut0",
    width: 300,
    [theme.breakpoints.down("md")]: {
      width: 220,
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Details = ({
  width,
  cover,
  img,
  name,
  desc,
  genres,
  date,
  status,
  sub,
}) => {
  const classes = useStyles();
  return (
    <div style={{ paddingTop: 20 }}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          component="img"
          src={cover}
          title="Contemplative Reptile"
        />
      </Card>
      <Grid container spacing={3} style={{ paddingTop: 20 }}>
        <Grid item xs={3}>
          <CardMedia
            className={classes.mediaThumbnail}
            component="img"
            src={img}
            title="Contemplative Reptile"
          />
        </Grid>
        <Grid item xs={width === "xs" || width === "sm" ? 12 : 9}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h5">
                {(width === "xs" || width === "sm") && (
                  <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                  >
                    <Avatar className={classes.large} src={img} />
                  </IconButton>
                )}
                {name}
              </Typography>
              <Divider style={{ margin: 20 }} variant="middle" />
              <Typography variant="body2" color="textSecondary" component="p">
                {desc}
              </Typography>
              <Divider style={{ margin: 20 }} variant="middle" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default withWidth()(Details);
