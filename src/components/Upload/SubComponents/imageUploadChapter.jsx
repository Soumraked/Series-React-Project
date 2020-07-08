import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import DescriptionIcon from "@material-ui/icons/Description";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  media: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    height: "auto",
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
  mediaText: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    height: "auto",
    width: 210,
    [theme.breakpoints.down("md")]: {
      width: 150,
    },
    [theme.breakpoints.down("sm")]: {
      width: "70%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "30%",
    },
  },
}));

export default function UploadButtons({
  chapter,
  addChapter,
  textFile,
  addTextFile,
}) {
  const classes = useStyles();

  const handleChange = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      addChapter(reader.result);
    };
  };

  const handleChangeText = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      addTextFile(reader.result);
    };
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Grid container direction="row" justify="center" alignItems="center">
            <CardMedia
              className={classes.media}
              component="img"
              src={chapter}
              title={"chapter"}
            />

            <input
              accept="image/*"
              className={classes.input}
              id="chapter-file"
              type="file"
              onChange={(event) => {
                handleChange(event);
              }}
            />
            <label htmlFor="chapter-file">
              Imagen capítulo
              <IconButton aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container direction="row" justify="center" alignItems="center">
            <CardMedia
              className={classes.mediaText}
              component="img"
              src={
                textFile.length > 0
                  ? "https://firebasestorage.googleapis.com/v0/b/monosotakos.appspot.com/o/imageUpload%2FTextFileCheck.jpg?alt=media"
                  : "https://firebasestorage.googleapis.com/v0/b/monosotakos.appspot.com/o/imageUpload%2FTextFile.png?alt=media"
              }
              title={"TextFile"}
            />
            <input
              accept=".txt"
              className={classes.input}
              id="text-file"
              type="file"
              onChange={(event) => {
                handleChangeText(event);
              }}
            />
            <label htmlFor="text-file">
              Archivo de texto (capítulos)
              <IconButton aria-label="upload picture" component="span">
                <DescriptionIcon />
              </IconButton>
            </label>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
