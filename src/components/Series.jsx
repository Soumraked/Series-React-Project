import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { getSeries } from "../redux/seriesDucks";

const Series = () => {
  const dispatch = useDispatch();

  const series = useSelector((store) => store.series.array);

  React.useEffect(() => {
    const obtenerInfo = () => {
      dispatch(getSeries());
    };
    obtenerInfo();
  }, [dispatch]);
  return (
    <div>
      <h1>Últimos capítulos agregados</h1>
      <ul>
        {series.map((item) => (
          <li key={item.data.serie}>{item.data.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Series;
