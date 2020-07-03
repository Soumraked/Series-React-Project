import React, { useState } from "react";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getChapter, cleanChapter } from "../../redux/seriesDucks";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import withWidth from "@material-ui/core/withWidth";

import Skeleton from "@material-ui/lab/Skeleton";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import Video from "./SubComponents/Video";
import Error from "../../Views/Error";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
  },
  video: {
    marginLeft: "auto",
    marginRight: "auto",
    // height: "auto",
    padding: 30,
    width: 920,
    [theme.breakpoints.down("md")]: {
      width: 770,
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: 690,
      width: "auto",
      marginLeft: 0,
      marginRight: 0,
    },
  },
}));

function Chapter(props) {
  const classes = useStyles();

  const id = useParams().id;
  const num = useParams().num;

  const dispatch = useDispatch();

  const chapter = useSelector((store) => store.series.chapter);

  React.useEffect(() => {
    const obtenerInfo = () => {
      dispatch(cleanChapter());
      dispatch(getChapter(id, num));
    };
    obtenerInfo();
  }, [dispatch, id, num]);

  const [error, setError] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  window.onerror = function (error) {
    setError(true);
  };

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  return (
    <div style={{ paddingTop: 20 }}>
      <Snackbar open={error} autoHideDuration={10000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          El episodio seleccionado no se encuentra disponible, deja un reporte
          para solucionar este problema a la brevedad.
        </Alert>
      </Snackbar>
      {chapter.error ? (
        <Error />
      ) : (
        <Card className={classes.root}>
          <CardContent style={{ padding: 0, marginTop: 20 }}>
            <Typography
              gutterBottom
              variant={
                props.width === "sm"
                  ? "h6"
                  : props.width === "xs"
                  ? "body1"
                  : "h4"
              }
              component="h4"
              align="center"
              style={{ margin: 0 }}
            >
              {chapter.name ? (
                <strong>{chapter.name + " " + num}</strong>
              ) : (
                <Skeleton
                  align="center"
                  style={{ margin: 0, marginLeft: "auto", marginRight: "auto" }}
                  width="50%"
                />
              )}
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
      )}
    </div>
  );
}

export default withWidth()(Chapter);
