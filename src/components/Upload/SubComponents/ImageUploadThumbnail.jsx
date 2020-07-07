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
}));

export default function UploadButtons({ thumbnail, addThumbnail }) {
  const classes = useStyles();

  const handleChange = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      addThumbnail(reader.result);
    };
  };

  return (
    <div className={classes.root}>
      <CardMedia
        className={classes.mediaThumbnail}
        component="img"
        src={thumbnail}
        title={"thumbnail"}
      />
      <input
        accept="image/*"
        className={classes.input}
        id="thumbnail-file"
        type="file"
        onChange={(event) => {
          handleChange(event);
        }}
      />
      <Grid container direction="row" justify="center" alignItems="center">
        <label htmlFor="thumbnail-file" style={{}}>
          Imagen principal
          <IconButton aria-label="upload picture" component="span">
            <PhotoCamera />
          </IconButton>
        </label>
      </Grid>
    </div>
  );
}
