import React, { useRef, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import clsx from "clsx";

import { Link } from "react-router-dom";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import HomeIcon from "@material-ui/icons/Home";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import MovieIcon from "@material-ui/icons/Movie";
import SettingsIcon from "@material-ui/icons/Settings";

import Switch from "@material-ui/core/Switch";
import Moon from "@material-ui/icons/Brightness3";
import Sun from "@material-ui/icons/Brightness7";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  menuButton: {
    marginRight: theme.spacing(0),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function PersistentDrawerLeft({
  themeState,
  handleThemeChange,
}) {
  //Function hide drawer with click outside
  function useOutside(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          handleDrawerClose();
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
  // En function

  //Vars Function hide drawer
  const wrapperRef = useRef(null);
  useOutside(wrapperRef);
  // End vars

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root} ref={wrapperRef}>
      <CssBaseline />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        className={clsx(classes.menuButton)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        {/* Navigation */}
        <List>
          <ListItem onClick={handleDrawerClose} button component={Link} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItem>
          <ListItem
            onClick={handleDrawerClose}
            button
            component={Link}
            to="/series"
          >
            <ListItemIcon>
              <VideoLibraryIcon />
            </ListItemIcon>
            <ListItemText primary="Series" />
          </ListItem>
          <ListItem
            onClick={handleDrawerClose}
            button
            component={Link}
            to="/peliculas"
          >
            <ListItemIcon>
              <MovieIcon />
            </ListItemIcon>
            <ListItemText primary="Películas" />
          </ListItem>
        </List>
        {/*  End navegation */}
        <Divider />
        <List>
          <ListItem
            onClick={handleDrawerClose}
            button
            component={Link}
            to="/configuracion"
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Configuración" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <Sun />
            <Switch checked={themeState} onClick={handleThemeChange} />
            <Moon />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}
