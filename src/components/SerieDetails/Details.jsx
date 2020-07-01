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
import Chip from "@material-ui/core/Chip";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import PlayCircleFilledRoundedIcon from "@material-ui/icons/PlayCircleFilledRounded";

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
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
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
  type,
  sub,
  chapter,
}) => {
  const classes = useStyles();
  return (
    <div style={{ paddingTop: 20 }}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          component="img"
          src={cover}
          title={name}
        />
      </Card>
      <Grid container spacing={3} style={{ paddingTop: 20 }}>
        <Grid item xs={3}>
          <Card className={classes.mediaCard}>
            <CardMedia
              className={classes.mediaThumbnail}
              component="img"
              src={img}
              title={name}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="h5">
                Información general
              </Typography>
              {[
                { item: type, id: "type", text: "Tipo : " },
                { item: date, id: "date", text: "Fecha de emisión:  " },
                { item: status, id: "status", text: "Estado: " },
              ].map((item) => (
                <Typography
                  gutterBottom
                  variant="subtitle2"
                  component="h5"
                  key={item.id}
                >
                  {item.text}
                  {item.item}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={width === "xs" || width === "sm" ? 12 : 9}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h5">
                {(width === "xs" || width === "sm") && (
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                  >
                    <Avatar className={classes.large} src={img} />
                  </IconButton>
                )}
                {name}
              </Typography>
              {(width === "xs" || width === "sm") && (
                <div>
                  <Divider style={{ marginBottom: 20 }} variant="middle" />
                  {[
                    { item: type, id: "type", text: "Tipo : " },
                    { item: date, id: "date", text: "Fecha de emisión:  " },
                    { item: status, id: "status", text: "Estado: " },
                  ].map((item) => (
                    <Chip
                      key={item.text}
                      color="primary"
                      label={item.item}
                      style={{ marginBottom: 10, marginRight: 10 }}
                    />
                  ))}
                </div>
              )}
              <Divider style={{ margin: 10 }} variant="middle" />
              {genres && (
                <div>
                  {genres.map((item) => (
                    <Chip
                      key={item}
                      color="secondary"
                      label={item}
                      style={{ marginBottom: 10, marginRight: 10 }}
                    />
                  ))}
                  <Divider style={{ marginBottom: 10 }} variant="middle" />
                </div>
              )}
              <Typography gutterBottom variant="h6" component="h5">
                Sinopsis
              </Typography>
              <Typography variant="body2" color="textSecondary" component="h6">
                {desc}
              </Typography>
              <Divider style={{ marginTop: 20 }} variant="middle" />
            </CardContent>
          </Card>
          <Card style={{ marginTop: 20 }}>
            <CardContent>
              <List className={classes.rootList}>
                {chapter &&
                  chapter.map((item) => (
                    <ListItem button key={item.number}>
                      <PlayCircleFilledRoundedIcon style={{ marginRight: 5 }} />
                      <ListItemText
                        primary={`${name} ${
                          item.number
                        } sub ${sub.toLowerCase()}`}
                      />
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
