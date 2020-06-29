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
import LinkButton from "./Navbar/LinkButton";
import Search from "./Navbar/Search";
import Avatar from "./Navbar/Avatar";
import Drawer from "./Navbar/DrawerNavbar";
// End import

//Style Navbar
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));
// End Style

function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Container maxWidth="lg">
          <Toolbar>
            <Drawer />
            <LinkButton name="Kooga" route="/" strong={true} />
            <LinkButton name="Inicio" route="/" />
            <LinkButton name="Series" route="/series" />
            <LinkButton name="Películas" route="/peliculas" class="end" />
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
