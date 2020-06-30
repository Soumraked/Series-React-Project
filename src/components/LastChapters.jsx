import React, { Fragment } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getSeries } from "../redux/seriesDucks";
import Grid from "@material-ui/core/Grid";
import withWidth from "@material-ui/core/withWidth";

import Card from "./LastChapters/CardChapter";

const Series = (props) => {
  const dispatch = useDispatch();

  const series = useSelector((store) => store.series.array);

  React.useEffect(() => {
    const obtenerInfo = () => {
      dispatch(getSeries());
    };
    obtenerInfo();
  }, [dispatch]);
  return (
    <Fragment>
      <h1>Últimos capítulos agregados</h1>
      <Grid container spacing={3}>
        {series.map((item) => (
          <Grid
            item
            xs={["xs", "sm"].indexOf(props.width) !== -1 ? 6 : 3}
            key={item.data.serie}
          >
            <Card
              name={item.data.name}
              img={item.data.image}
              num={item.data.number}
              type={item.data.type}
              id={item.data.serie}
            />
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
};

export default withWidth()(Series);
