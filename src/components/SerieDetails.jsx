import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../redux/seriesDucks";

import Details from "./SerieDetails/Details";

const SerieDetails = () => {
  const id = useParams().id;

  const dispatch = useDispatch();

  const details = useSelector((store) => store.series.details);

  React.useEffect(() => {
    const obtenerInfo = () => {
      dispatch(getDetails(id));
    };
    obtenerInfo();
  }, [dispatch, id]);
  return (
    <Details
      cover={details.cover}
      img={details.thumbnail}
      name={details.name}
      desc={details.description}
      genres={details.genres}
      date={details.date}
      status={details.status}
      sub={details.subtitles}
      type={details.type}
      chapter={details.chapter}
    />
  );
};

export default SerieDetails;
