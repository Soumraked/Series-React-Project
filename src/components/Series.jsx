import React, { Fragment } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllSeries } from "../redux/seriesDucks";
import Grid from "@material-ui/core/Grid";
import withWidth from "@material-ui/core/withWidth";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";

import Card from "./Series/CardSerie";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
  pag: {
    position: "static",
  },
}));

function Series(props) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const series = useSelector((store) => store.series.seriesData);

  React.useEffect(() => {
    const obtenerInfo = () => {
      dispatch(getAllSeries());
    };
    obtenerInfo();
  }, [dispatch]);

  const max = 18;

  const [seriesSection, setSeriesSection] = React.useState([]);

  const section = (init) => {
    setSeriesSection(series.slice(init, max + init));
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    section((value - 1) * max);
  };

  React.useEffect(() => {
    const firstPagination = () => {
      setSeriesSection(series.slice(0, max));
    };
    firstPagination();
  }, [setSeriesSection, series]);

  return (
    <div style={{ paddingTop: 20 }}>
      <Fragment>
        <Grid container spacing={3}>
          {seriesSection.map((item) => (
            <Grid
              item
              xs={props.width === "xs" ? 6 : props.width === "sm" ? 3 : 2}
              key={item.id}
            >
              <Card
                name={item.name}
                id={item.id}
                type={item.type}
                year={item.year}
                img={item.image}
              />
            </Grid>
          ))}
        </Grid>
        <div className={classes.root} style={{ textAlign: "center" }}>
          <Pagination
            style={{ display: "inline-block" }}
            count={Math.ceil(series.length / max)}
            variant="outlined"
            color="secondary"
            page={page}
            onChange={handleChange}
            siblingCount={
              props.width === "xs"
                ? 0
                : props.width === "sm"
                ? 3
                : props.width === "md"
                ? 6
                : 12
            }
          />
        </div>
      </Fragment>
    </div>
  );
}

export default withWidth()(Series);
