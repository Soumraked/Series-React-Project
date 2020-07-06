import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import withWidth from "@material-ui/core/withWidth";
import Grid from "@material-ui/core/Grid";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import PlayCircleFilledRoundedIcon from "@material-ui/icons/PlayCircleFilledRounded";

import { Link } from "react-router-dom";

import LeftInformation from "./SubComponents/LeftInformation";
import CenterInformation from "./SubComponents/CenterInformation";

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
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "40%",
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

function Upload({
  width,
  cover,
  img,
  name,
  desc,
  date,
  status,
  type,
  sub,
  chapter,
  id,
}) {
  const classes = useStyles();

  const [genres, setGenres] = useState([]);

  const addGenres = (genresList) => {
    setGenres(genresList);
  };
  console.log(genres);

  return (
    <div>
      <h1>Upload</h1>
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
          <Grid item xs={12} md={3}>
            <LeftInformation />
          </Grid>
          <Grid item xs={12} md={9}>
            <CenterInformation addGenres={addGenres} genres={genres} />
            <Card style={{ marginTop: 20 }}>
              <CardContent>
                <List className={classes.rootList}>
                  {chapter &&
                    chapter.map((item) => (
                      <ListItem
                        button
                        key={item.number}
                        component={Link}
                        to={`/series/${id}/${item.number}`}
                      >
                        <PlayCircleFilledRoundedIcon
                          style={{ marginRight: 5 }}
                        />
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
    </div>
  );
}

export default withWidth()(Upload);
