import React from "react";

import AvatarUI from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function Avatar(props) {
  const classes = useStyles();

  return (
    <IconButton
      edge="end"
      className={classes.menuButton}
      color="inherit"
      aria-label="open drawer"
    >
      <AvatarUI alt={props.alt} src={props.src} />
    </IconButton>
  );
}

export default Avatar;
