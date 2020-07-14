import React from "react";

import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import Popover from "@material-ui/core/Popover";

import Card from "../../MenuAvatar/SubComponents/Card";

import Login from "../../MenuAvatar/Login";
import SignUp from "../../MenuAvatar/SignUp";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(3),
  },
  typography: {
    padding: theme.spacing(2),
  },
}));

function Avatar(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [openLogin, setOpenLogin] = React.useState(false);

  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };
  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const [openSignUp, setOpenSignUp] = React.useState(false);

  const handleClickOpenSignUp = () => {
    setOpenSignUp(true);
  };
  const handleCloseSignUp = () => {
    setOpenSignUp(false);
  };

  return (
    <div>
      <Login open={openLogin} handleClose={handleCloseLogin} />
      <SignUp open={openSignUp} handleClose={handleCloseSignUp} />
      <IconButton
        edge="end"
        className={classes.menuButton}
        color="inherit"
        aria-label="open drawer"
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        <AccountCircleIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Card
          avatar={props.src}
          handleClickOpenLogin={handleClickOpenLogin}
          handleClickOpenSignUp={handleClickOpenSignUp}
          handleClose={handleClose}
        />
      </Popover>
    </div>
  );
}

export default Avatar;
