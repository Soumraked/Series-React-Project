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
}));

export default function UploadButtons({ cover, addCover }) {
  const classes = useStyles();

  const handleChange = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      addCover(reader.result);
    };
  };

  return (
    <div className={classes.root}>
      <CardMedia
        className={classes.media}
        component="img"
        src={cover}
        title={"cover"}
      />
      <input
        accept="image/*"
        className={classes.input}
        id="cover-file"
        type="file"
        onChange={(event) => {
          handleChange(event);
        }}
      />
      <Grid container direction="row" justify="center" alignItems="center">
        <label htmlFor="cover-file">
          Imagen de encabezado
          <IconButton aria-label="upload picture" component="span">
            <PhotoCamera />
          </IconButton>
        </label>
      </Grid>
    </div>
  );
}
