import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, cleanDetails } from "../redux/seriesDucks";

import Details from "./SerieDetails/Details";
import Skeleton from "./SerieDetails/DetailsSkeleton";
import Error from "../Views/Error";

const SerieDetails = () => {
  const id = useParams().id;

  const dispatch = useDispatch();

  const details = useSelector((store) => store.series.details);

  React.useEffect(() => {
    const obtenerInfo = () => {
      dispatch(cleanDetails());
      dispatch(getDetails(id));
    };
    obtenerInfo();
  }, [dispatch, id]);
  return (
    <Fragment>
      {details.error ? (
        <Error />
      ) : details.name ? (
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
          id={id}
        />
      ) : (
        <Skeleton />
      )}
    </Fragment>
  );
};

export default SerieDetails;
