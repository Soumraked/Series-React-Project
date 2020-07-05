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
import Pagination from "./SubComponents/chipChapter";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

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
    },
  },
}));

function Chapter(props) {
  const classes = useStyles();

  const id = useParams().id;
  const num = useParams().num;

  const dispatch = useDispatch();

  const chapter = useSelector((store) => store.series.chapter);

  const [disqus, setDisqus] = useState(false);
  const [disqusBtn, setDisqusBtn] = useState("block");

  React.useEffect(() => {
    const obtenerInfo = () => {
      dispatch(cleanChapter());
      dispatch(getChapter(id, num));
      setDisqus(false);
      setDisqusBtn("block");
    };
    obtenerInfo();
  }, [dispatch, id, num, setDisqusBtn, setDisqus]);

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

  const disqusFunction = () => {
    var d = document,
      s = d.createElement("script");
    s.src = "https://https-kooga-tk.disqus.com/embed.js";
    s.setAttribute("data-timestamp", +new Date());
    (d.head || d.body).appendChild(s);
  };

  const seeComments = () => {
    disqusFunction();
    setDisqus(true);
    setDisqusBtn("none");
  };

  // var disqus_config = function () {
  //   this.page.url = `https://kooga.tk/series/${id}/${num}`;
  //   this.page.identifier = `/${id}/${num}`;
  // };

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
          <CardMedia className={classes.video} component="div">
            {chapter.link ? (
              <Video link={chapter.link} />
            ) : (
              <img
                style={{ width: "100%", heigth: "100%" }}
                src="https://firebasestorage.googleapis.com/v0/b/monosotakos.appspot.com/o/video%2FvideoPlayNew.JPG?alt=media"
                alt=""
              />
            )}
          </CardMedia>

          <CardContent>
            {chapter.chapterNP ? (
              <Pagination
                id={id}
                next={chapter.chapterNP.next}
                prev={chapter.chapterNP.prev}
                chapters={chapter.keys}
                num={num}
              />
            ) : (
              <Skeleton
                align="center"
                style={{ margin: 0, marginLeft: "auto", marginRight: "auto" }}
                width="50%"
                height={50}
              />
            )}
          </CardContent>
        </Card>
      )}

      <Card style={{ marginTop: 20, marginBottom: 20 }}>
        <CardContent>
          {disqus ? (
            <div id="disqus_thread"></div>
          ) : (
            <Grid item xs={12} style={{ marginTop: 10 }}>
              <Grid container justify="center" spacing={3}>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  style={{ display: disqusBtn }}
                  onClick={(event) => {
                    seeComments();
                  }}
                >
                  Ver comentarios
                </Button>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default withWidth()(Chapter);
