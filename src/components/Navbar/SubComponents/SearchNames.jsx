import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import InputBase from "@material-ui/core/InputBase";

import { getSearch } from "../../../redux/seriesDucks";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;
  const handleClose = () => {
    onClose(selectedValue);
  };
  const handleListItemClick = (value) => {
    setSearch("");
    setOptions([]);
    onClose(value);
  };

  //Call api
  const dispatch = useDispatch();
  const names = useSelector((store) => store.series.names);
  React.useEffect(() => {
    const obtenerInfo = () => {
      dispatch(getSearch());
    };
    obtenerInfo();
  }, [dispatch]);
  // End call api

  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);

  const handleChange = (event) => {
    setSearch(event.target.value);
    searchName(event.target.value);
  };

  const searchName = (name) => {
    if (name.length >= 2) {
      let options = [];
      for (let i in names) {
        if (names[i].names.includes(name.toLowerCase())) {
          options.push(names[i].id);
        }
      }
      setOptions(options);
    } else {
      setOptions([]);
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Ingresa tu búsqueda</DialogTitle>
      <InputBase
        value={search}
        onChange={handleChange}
        placeholder="Buscar"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
      />
      <List>
        {options.map((item) => (
          <ListItem
            button
            onClick={() => handleListItemClick(item)}
            key={item}
            component={Link}
            to={`/series/${item}`}
          >
            <ListItemAvatar>
              <Avatar src={names[item].image} alt={names[item].name} />
            </ListItemAvatar>
            <ListItemText primary={names[item].name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

function SearchNames({ open, setOpen }) {
  const handleClose = (value) => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <SimpleDialog selectedValue="" open={open} onClose={handleClose} />
    </React.Fragment>
  );
}

export default SearchNames;
