import React, { useState, useEffect, useRef } from "react";
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

import Popper from "@material-ui/core/Popper";
import SearchIcon from "@material-ui/icons/Search";
//import { useHistory } from "react-router-dom";

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
    [theme.breakpoints.up("md")]: {
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
    marginTop: 10,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
    [theme.breakpoints.down("md")]: {
      marginLeft: theme.spacing(7),
      width: "75%",
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing(7),
      width: "17%",
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: 7,
  },
  rootSearch: {
    [theme.breakpoints.down("sm")]: {
      flexGrow: 1,
    },
  },
}));

function SearchNames() {
  //let history = useHistory();
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
  const [empty, setEmpty] = useState(false);
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

    setEmpty(options.length === 0 && name.length > 0 ? false : true);
    setOptions(options);
  };

  const handleListItemClick = (value) => {
    //console.log(history.location.pathname);
    //history.push(history.location.pathname);
    setSearch("");
    setOptions([]);
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    if (event.target.value.length > 0) {
      setAnchorEl(event.currentTarget);
    }
  };

  function useOutside(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          handleListItemClick();
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutside(wrapperRef);

  return (
    <div>
      <div className={classes.rootSearch}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            aria-describedby={id}
            value={search}
            onClick={handleClick}
            onChange={handleChange}
            placeholder="Buscar"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>

        <Popper
          id={id}
          open={open}
          className={classes.root}
          anchorEl={anchorEl}
          ref={wrapperRef}
        >
          <List>
            {empty ? (
              options.map((item) => (
                <ListItem
                  button
                  key={item}
                  component={Link}
                  to={`/series/${item}`}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={names[item].image}
                      alt={names[item].name}
                      className={classes.large}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    style={{ width: "100%" }}
                    primary={names[item].name}
                    secondary={names[item].type}
                  />
                </ListItem>
              ))
            ) : (
              <ListItem button>
                <ListItemText
                  style={{ width: "100%" }}
                  primary="No se ha encontrado resultado para la búsqueda"
                />
              </ListItem>
            )}
          </List>
        </Popper>
      </div>
    </div>
  );
}

export default SearchNames;
