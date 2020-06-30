import React, { Fragment } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllSeries } from "../redux/seriesDucks";
import Grid from "@material-ui/core/Grid";
import withWidth from "@material-ui/core/withWidth";

import Card from "./Series/CardSerie";

function Series(props) {
  const dispatch = useDispatch();

  const series = useSelector((store) => store.series.seriesData);

  React.useEffect(() => {
    const obtenerInfo = () => {
      dispatch(getAllSeries());
    };
    obtenerInfo();
  }, [dispatch]);
  return (
    <div style={{ paddingTop: 20 }}>
      <Fragment>
        <Grid container spacing={3}>
          {series.map((item) => (
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
      </Fragment>
    </div>
  );
}

export default withWidth()(Series);
