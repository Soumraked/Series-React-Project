import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "90%",
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelect({ addGenres, genres }) {
  const classes = useStyles();

  const [genresOption, setGenresOption] = useState([]);
  const [pushGenre, setPushGenre] = useState("");

  const handleChange = (event) => {
    addGenres(event.target.value);
  };

  useEffect(() => {
    const setGenresInfo = () => {
      //Carga de géneros desde la api
      setGenresOption(["genero1", "genero2", "genero3", "etc"]);
    };
    setGenresInfo();
  }, [setGenresOption]);

  const addGenreName = () => {
    if (pushGenre.length > 0) {
      if (genresOption.indexOf(pushGenre) === -1) {
        setGenresOption([...genresOption, pushGenre]);
      }
      if (genres.indexOf(pushGenre) === -1) {
        addGenres([...genres, pushGenre]);
      }
      setPushGenre("");
    }
  };

  const pushGenreChange = (event) => {
    setPushGenre(event.target.value);
  };

  const [chipsBool, setChipsBool] = useState(false);

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} sm={8}>
          <FormControl
            className={classes.formControl}
            onBlur={() => {
              genres.length === 0 ? setChipsBool(true) : setChipsBool(false);
            }}
          >
            <InputLabel id="genres" color="secondary">
              Géneros
            </InputLabel>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="genres"
              multiple
              value={genres}
              onChange={handleChange}
              input={<Input />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
              error={chipsBool}
            >
              {genresOption.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={genres.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
            {chipsBool && (
              <FormHelperText>
                Se requiere un mínimo de un género
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={8} sm={3}>
          <TextField
            label="Añadir género"
            variant="outlined"
            color="secondary"
            value={pushGenre}
            onChange={pushGenreChange}
          />
        </Grid>
        <Grid item xs={4} sm={1}>
          <IconButton
            aria-label="delete"
            onClick={() => {
              addGenreName();
            }}
          >
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
}
