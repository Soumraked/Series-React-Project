import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CloseIcon from "@material-ui/icons/Close";
import AssignmentIcon from "@material-ui/icons/Assignment";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  rootList: {
    width: 250,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function RecipeReviewCard({
  avatar,
  handleClickOpenLogin,
  handleClickOpenSignUp,
  handleClose,
}) {
  const classes = useStyles();

  const handleCloseSession = () => {
    localStorage.token = "";
    localStorage.name = "";
  };

  return (
    <Card className={classes.root} style={{ marginTop: 10 }}>
      <CardHeader
        avatar={<Avatar aria-label="recipe" src={avatar} />}
        title={
          localStorage.token && localStorage.name
            ? localStorage.name
            : "Desconocido"
        }
        subheader="Kooga"
      />

      <CardContent>
        <div className={classes.rootList}>
          {localStorage.token && localStorage.name ? (
            <List component="nav" aria-label="main mailbox folders">
              {localStorage.rol === "admin|admin3" && (
                <ListItem
                  button
                  onClick={() => {
                    handleClose();
                  }}
                >
                  <ListItemIcon>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <ListItemText primary="Administrar" />
                </ListItem>
              )}
              <ListItem
                button
                onClick={() => {
                  handleClose();
                  handleCloseSession();
                }}
              >
                <ListItemIcon>
                  <CloseIcon />
                </ListItemIcon>
                <ListItemText primary="Cerrar sesión" />
              </ListItem>
            </List>
          ) : (
            <List component="nav" aria-label="main mailbox folders">
              <ListItem
                button
                onClick={() => {
                  handleClose();
                  handleClickOpenLogin();
                }}
              >
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Iniciar sesión" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  handleClose();
                  handleClickOpenSignUp();
                }}
              >
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="Crear cuenta" />
              </ListItem>
            </List>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
