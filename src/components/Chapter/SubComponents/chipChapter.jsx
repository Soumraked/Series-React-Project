import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Chip from "@material-ui/core/Chip";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ListIcon from "@material-ui/icons/List";

import withWidth from "@material-ui/core/withWidth";

import { Link } from "react-router-dom";

import Pagination from "./Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function SpacingGrid({ width, id, next, prev, chapters, num }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={3}>
          {[
            {
              icon: <ArrowBackIcon />,
              text: "Anterior",
              textXs: "Ant.",
              route: `/series/${id}/${prev}`,
              arrow: 1,
            },
            {
              icon: <ListIcon />,
              text: "Episodios",
              textXs: "Eps.",
              route: `/series/${id}`,
              arrow: 2,
            },
            {
              icon: <ArrowForwardIcon />,
              text: "Siguiente",
              textXs: "Sig.",
              route: `/series/${id}/${next}`,
              arrow: 3,
            },
          ].map((value) => (
            <Grid key={value.text} item>
              <Chip
                disabled={
                  (prev === "disabled" && value.arrow === 1) ||
                  (next === "disabled" && value.arrow === 3)
                }
                component={Link}
                to={value.route}
                label={width !== "xs" ? value.text : value.textXs}
                clickable
                variant="outlined"
                avatar={value.icon}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ marginTop: 10 }}>
        <Grid container justify="center" spacing={3}>
          <Pagination chapters={chapters} id={id} num={num} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withWidth()(SpacingGrid);
