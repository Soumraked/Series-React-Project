import React from "react";

//Import App bar Material UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import makeStyles from "@material-ui/core/styles/makeStyles";
// End import

//Import container
import Container from "@material-ui/core/Container";
// End import

//Components
import LinkButton from "./SubComponents/LinkButton";
import Search from "./SubComponents/Search";
import Avatar from "./SubComponents/Avatar";
import Drawer from "./SubComponents/DrawerNavbar";
// End import

import Switch from "@material-ui/core/Switch";
import Moon from "@material-ui/icons/Brightness3";
import Sun from "@material-ui/icons/Brightness7";

//Style Navbar
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  theme: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));
// End Style

function Navbar({ themeState, handleThemeChange }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Container maxWidth="lg" disableGutters>
          <Toolbar>
            <Drawer
              themeState={themeState}
              handleThemeChange={handleThemeChange}
            />
            <LinkButton name="Kooga" route="/" strong={true} />
            <LinkButton name="Inicio" route="/" />
            <LinkButton name="Series" route="/series" />
            <LinkButton name="Películas" route="/peliculas" />
            <LinkButton class="end" />

            <Sun className={classes.theme} />
            <Switch
              checked={themeState}
              onClick={handleThemeChange}
              className={classes.theme}
            />
            <Moon className={classes.theme} />

            <Search />
            <Avatar
              src="https://firebasestorage.googleapis.com/v0/b/monosotakos.appspot.com/o/nekoAvatar.jpg?alt=media"
              alt="Kooga"
            />
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Navbar;
