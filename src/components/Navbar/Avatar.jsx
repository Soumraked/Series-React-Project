import React from "react";

import AvatarUI from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function Avatar() {
  const classes = useStyles();

  return (
    <IconButton
      edge="end"
      className={classes.menuButton}
      color="inherit"
      aria-label="open drawer"
    >
      <AvatarUI
        alt="Kooga"
        src="https://firebasestorage.googleapis.com/v0/b/monosotakos.appspot.com/o/nekoAvatar.jpg?alt=media"
      />
    </IconButton>
  );
}

export default Avatar;
