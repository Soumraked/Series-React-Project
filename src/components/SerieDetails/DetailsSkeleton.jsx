import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import withWidth from "@material-ui/core/withWidth";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import PlayCircleFilledRoundedIcon from "@material-ui/icons/PlayCircleFilledRounded";

import Skeleton from "@material-ui/lab/Skeleton";
import CardHeader from "@material-ui/core/CardHeader";

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
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    height: 450,
    width: 300,
    [theme.breakpoints.down("md")]: {
      width: 220,
      height: 350,
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  mediaCard: {
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
  rootList: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
  },
}));

const Details = ({ width }) => {
  const classes = useStyles();
  return (
    <div style={{ paddingTop: 20 }}>
      <Card className={classes.root}>
        <Skeleton variant="rect" className={classes.media} />
      </Card>
      <Grid container spacing={3} style={{ paddingTop: 20 }}>
        <Grid item xs={3}>
          <Card className={classes.mediaCard}>
            <Skeleton variant="rect" className={classes.mediaThumbnail} />

            <CardContent>
              <Typography gutterBottom variant="h6" component="h5">
                <Skeleton
                  variant="text"
                  animation="wave"
                  height={35}
                  width="70%"
                />
              </Typography>
              {[0, 1, 2].map((item) => (
                <Typography
                  gutterBottom
                  variant="subtitle2"
                  component="h5"
                  key={item}
                >
                  <Skeleton variant="text" />
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={width === "xs" || width === "sm" ? 12 : 9}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {width === "xs" || width === "sm" ? (
                  <CardHeader
                    avatar={
                      <Skeleton
                        animation="wave"
                        variant="circle"
                        width={56}
                        height={56}
                      />
                    }
                    title={
                      <Skeleton animation="wave" height={35} width="80%" />
                    }
                  />
                ) : (
                  <Skeleton animation="wave" height={35} width="50%" />
                )}
              </Typography>
              {(width === "xs" || width === "sm") && (
                <div>
                  <Divider style={{ marginBottom: 20 }} variant="middle" />
                  {[0, 1].map((item) => (
                    <Skeleton variant="text" key={item} />
                  ))}
                </div>
              )}
              <Divider style={{ margin: 10 }} variant="middle" />
              {
                <div>
                  {[0, 1].map((item) => (
                    <Skeleton variant="text" key={item} />
                  ))}
                  <Divider style={{ marginBottom: 10 }} variant="middle" />
                </div>
              }
              <Typography gutterBottom variant="h6" component="h5">
                <Skeleton
                  variant="text"
                  animation="wave"
                  height={35}
                  width="50%"
                />
              </Typography>
              <Typography variant="body2" color="textSecondary" component="h6">
                {[0, 1, 2, 3, 4, 5, 6].map((item) => (
                  <Skeleton variant="text" key={item} />
                ))}
              </Typography>
              <Divider style={{ marginTop: 20 }} variant="middle" />
            </CardContent>
          </Card>
          <Card style={{ marginTop: 20 }}>
            <CardContent>
              <List className={classes.rootList}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item) => (
                  <ListItem button key={item}>
                    <PlayCircleFilledRoundedIcon style={{ marginRight: 5 }} />
                    <ListItemText>
                      <Skeleton variant="text" key={item} />
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default withWidth()(Details);
