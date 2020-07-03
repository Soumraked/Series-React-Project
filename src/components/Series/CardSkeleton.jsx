import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 200,
    minWidth: 150,
  },
  media: {
    paddingTop: "150%", // 16:9
  },
}));

function ImgMediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Skeleton variant="rect" className={classes.media} />
      <Skeleton variant="text" />
    </Card>
  );
}

export default ImgMediaCard;
