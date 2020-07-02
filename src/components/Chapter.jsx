import React from "react";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getChapter, cleanChapter } from "../redux/seriesDucks";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import Video from "./Chapter/Video";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
  video: {
    height: "auto",
    padding: 30,
  },
});

function Chapter() {
  const classes = useStyles();

  const id = useParams().id;
  const num = useParams().num;

  const dispatch = useDispatch();

  const chapter = useSelector((store) => store.series.chapter);

  React.useEffect(() => {
    const obtenerInfo = () => {
      dispatch(getChapter(id, num));
      dispatch(cleanChapter());
    };
    obtenerInfo();
  }, [dispatch, id, num]);

  return (
    <div style={{ paddingTop: 20 }}>
      <Card className={classes.root}>
        <CardContent style={{ padding: 0, marginTop: 20 }}>
          <Typography
            gutterBottom
            variant="h4"
            component="h4"
            align="center"
            style={{ margin: 0 }}
          >
            <strong>{chapter.name + " " + num}</strong>
          </Typography>
        </CardContent>
        <CardMedia
          className={classes.video}
          title={chapter.name}
          component="div"
        >
          {chapter.link && <Video link={chapter.link} />}
        </CardMedia>

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Pagination, Comments, etc ...
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Chapter;