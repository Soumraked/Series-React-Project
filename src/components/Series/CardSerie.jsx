import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 200,
    minWidth: 150,

    // [theme.breakpoints.down("sm")]: {
    //   display: "none",
    // },
  },
  media: {
    height: 0,
    paddingTop: "150%", // 16:9
  },
  content: {
    margin: 0,
    padding: 10,
  },
  number: {
    position: "absolute",
    right: "3%",
    top: "3%",
    color: "white",
  },
  type: {
    position: "absolute",
    left: "3%",
    top: "3%",
    color: "white",
  },
}));

function ImgMediaCard(props) {
  const classes = useStyles();
  const title = props.name + " - " + props.num;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={props.img} title={title} />
        <Chip
          className={classes.number}
          color="secondary"
          size="small"
          label={props.year}
        />
        <Chip
          className={classes.type}
          color="primary"
          size="small"
          label={props.type}
        />
        <CardContent className={classes.content}>
          <Typography noWrap align="center">
            <strong>{props.name}</strong>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ImgMediaCard;
