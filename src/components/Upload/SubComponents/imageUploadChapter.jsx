import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
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
      width: "50%",
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

export default function UploadButtons({ chapter, addChapter }) {
  const classes = useStyles();

  const handleChange = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      addChapter(reader.result);
    };
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <CardMedia
            className={classes.media}
            component="img"
            src={chapter}
            title={"chapter"}
          />
        </Grid>
        <Grid
          item
          xs={12}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
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
    </div>
  );
}
