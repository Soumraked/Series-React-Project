import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import withWidth from "@material-ui/core/withWidth";
import Grid from "@material-ui/core/Grid";

import LeftInformation from "./SubComponents/LeftInformation";
import CenterInformation from "./SubComponents/CenterInformation";
import ImageUploadCover from "./SubComponents/imageUploadCover";
import ImageUploadChapter from "./SubComponents/imageUploadChapter";
import AddChapter from "./SubComponents/AddChapter";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
  },
}));

function Upload({ width }) {
  const classes = useStyles();

  let newDate = new Date();
  let day = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let dateNow = `${year}-${month < 10 ? `0${month}` : `${month}`}-${
    day < 10 ? `0${day}` : `${day}`
  }`;

  const [genres, setGenres] = useState([]);
  const [name, setName] = useState("");
  const [nameAlternative, setNameAlternative] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("Anime");
  const [date, setDate] = useState(dateNow);
  const [status, setStatus] = useState(true);
  const [sub, setSub] = useState("español");
  const [lang, setLang] = useState("Japones");
  const [thumbnail, setThumbnail] = useState(
    "https://firebasestorage.googleapis.com/v0/b/monosotakos.appspot.com/o/imageUpload%2Fthumbnail.png?alt=media"
  );
  const [cover, setCover] = useState(
    "https://firebasestorage.googleapis.com/v0/b/monosotakos.appspot.com/o/imageUpload%2Fcover.png?alt=media"
  );
  const [chapter, setChapter] = useState(
    "https://firebasestorage.googleapis.com/v0/b/monosotakos.appspot.com/o/imageUpload%2Fchapter.png?alt=media"
  );
  const [textFile, setTextFile] = useState("");

  const addGenres = (genresList) => {
    setGenres(genresList);
  };

  const addName = (value) => {
    setName(value);
  };

  const addNameAlternative = (value) => {
    setNameAlternative(value);
  };

  const addDesc = (value) => {
    setDesc(value);
  };

  const addType = (value) => {
    setType(value);
  };

  const addDate = (value) => {
    setDate(value);
  };

  const addStatus = (value) => {
    setStatus(value);
  };

  const addSub = (value) => {
    setSub(value);
  };

  const addLang = (value) => {
    setLang(value);
  };

  const addThumbnail = (value) => {
    setThumbnail(value);
  };

  const addCover = (value) => {
    setCover(value);
  };

  const addChapter = (value) => {
    setChapter(value);
  };

  const addTextFile = (value) => {
    setTextFile(value);
  };

  return (
    <div>
      <h1>Upload serie</h1>
      <div style={{ paddingTop: 20 }}>
        <Card className={classes.root}>
          <ImageUploadCover cover={cover} addCover={addCover} />
        </Card>
        <Grid container spacing={3} style={{ paddingTop: 20 }}>
          <Grid item xs={12} md={3}>
            <LeftInformation
              type={type}
              addType={addType}
              date={date}
              addDate={addDate}
              status={status}
              addStatus={addStatus}
              sub={sub}
              addSub={addSub}
              lang={lang}
              addLang={addLang}
              thumbnail={thumbnail}
              addThumbnail={addThumbnail}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <CenterInformation
              name={name}
              addName={addName}
              nameAlternative={nameAlternative}
              addNameAlternative={addNameAlternative}
              desc={desc}
              addDesc={addDesc}
              genres={genres}
              addGenres={addGenres}
            />
            <Card style={{ marginTop: 20 }}>
              <CardContent>
                <ImageUploadChapter
                  chapter={chapter}
                  addChapter={addChapter}
                  textFile={textFile}
                  addTextFile={addTextFile}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <AddChapter />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default withWidth()(Upload);
