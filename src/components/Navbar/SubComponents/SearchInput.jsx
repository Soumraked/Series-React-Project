import React, { useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

import InputBase from "@material-ui/core/InputBase";

import { getSearch } from "../../../redux/seriesDucks";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
  },
}));

function SearchNames() {
  const classes = useStyles();

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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleChange = (event) => {
    setSearch(event.target.value);
    searchName(event.target.value);
    if (event.target.value.length > 0) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };

  const searchName = (name) => {
    let options = [];
    for (let i in names) {
      if (names[i].names.includes(name.toLowerCase())) {
        options.push(names[i].id);
      }
    }
    setOptions(options);
  };

  const handleListItemClick = (value) => {
    setSearch("");
    setOptions([]);
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          aria-describedby={id}
          value={search}
          onChange={handleChange}
          placeholder="Buscar"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>

      <Popper id={id} open={open} className={classes.root} anchorEl={anchorEl}>
        <Paper>
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
        </Paper>
      </Popper>
    </React.Fragment>
  );
}

export default SearchNames;
