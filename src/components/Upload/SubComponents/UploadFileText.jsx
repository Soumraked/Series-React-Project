import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DescriptionIcon from "@material-ui/icons/Description";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  mediaText: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    height: "auto",
    width: "20%",
  },
}));

export default function UploadButtons({ textFile, addTextFile }) {
  const classes = useStyles();

  const handleChangeText = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      addTextFile(reader.result);
    };
  };

  return (
    <Card style={{ width: "100%" }}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <CardContent style={{ width: "80%" }}>
          <h1>Ingreso de archivo de texto</h1>
          <h2>Ejemplo</h2>
          <h4>
            001
            https://storage.googleapis.com/proven-reality-256313.appspot.com/OP
            - 001.mp4
          </h4>
          <h4>
            002
            https://storage.googleapis.com/proven-reality-256313.appspot.com/OP
            - 002.mp4
          </h4>
          <h4>
            003
            https://storage.googleapis.com/proven-reality-256313.appspot.com/OP
            - 003.mp4
          </h4>
          <h4>
            Nota: la separación entre el número y el link es de una tabulación
            del block de notas de windows (4 espacios)
          </h4>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid
              item
              xs={12}
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
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
        </CardContent>
      </Grid>
    </Card>
  );
}
