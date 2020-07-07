import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

import ImageUploadThumbnail from "./ImageUploadThumbnail";

function LeftInformation({
  type,
  addType,
  date,
  addDate,
  status,
  addStatus,
  sub,
  addSub,
  lang,
  addLang,
  thumbnail,
  addThumbnail,
}) {
  return (
    <Card>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} sm={4} md={12}>
          <ImageUploadThumbnail
            thumbnail={thumbnail}
            addThumbnail={addThumbnail}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={12}>
          <CardContent>
            <Typography gutterBottom variant="h6" component="h5">
              Información general
            </Typography>
            <FormControl style={{ width: "100%", paddingBottom: 10 }}>
              <Select
                value={type}
                onChange={(event) => {
                  addType(event.target.value);
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={"Anime"}>Anime</MenuItem>
                <MenuItem value={"Película"}>Película</MenuItem>
                <MenuItem value={"Ova"}>Ova</MenuItem>
                <MenuItem value={"Especial"}>Especial</MenuItem>
                <MenuItem value={"Corto"}>Corto</MenuItem>
              </Select>
              <FormHelperText>Tipo</FormHelperText>
            </FormControl>

            <TextField
              // value={date}
              defaultValue={date}
              onChange={(event) => {
                addDate(event.target.value);
              }}
              label="Fecha de emisión dd-mm-yyyy"
              variant="outlined"
              color="secondary"
              style={{ width: "100%", paddingBottom: 10 }}
              type="date"
            />
            <FormControl style={{ width: "100%", paddingBottom: 10 }}>
              <Select
                value={status}
                onChange={(event) => {
                  addStatus(event.target.value);
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={false}>En emisión</MenuItem>
                <MenuItem value={true}>Finalizado</MenuItem>
              </Select>
              <FormHelperText>Estado</FormHelperText>
            </FormControl>

            <FormControl style={{ width: "100%", paddingBottom: 10 }}>
              <Select
                value={sub}
                onChange={(event) => {
                  addSub(event.target.value);
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={"español"}>Sub español</MenuItem>
                <MenuItem value={"sin subtitulos"}>Sin subtitulos</MenuItem>
              </Select>
              <FormHelperText>Estado</FormHelperText>
            </FormControl>
            <FormControl style={{ width: "100%", paddingBottom: 10 }}>
              <Select
                value={lang}
                onChange={(event) => {
                  addLang(event.target.value);
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={"Japones"}>Japones</MenuItem>
                <MenuItem value={"Español"}>Español</MenuItem>
                <MenuItem value={"Inglés"}>Inglés</MenuItem>
                <MenuItem value={"Chino"}>Chino</MenuItem>
                <MenuItem value={"Otro"}>Otro</MenuItem>
              </Select>
              <FormHelperText>Idioma</FormHelperText>
            </FormControl>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}

export default LeftInformation;
