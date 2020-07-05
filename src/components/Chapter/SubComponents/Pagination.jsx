import React, { useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { useHistory } from "react-router-dom";
import withWidth from "@material-ui/core/withWidth";

function PaginationLink({ chapters, id, num, width }) {
  let history = useHistory();

  const [page, setPage] = useState(chapters.indexOf(num) + 1);
  const handleClick = (event, value) => {
    setPage(value);
    history.push(`/series/${id}/${chapters[value - 1]}`);
  };
  return (
    <Pagination
      count={chapters.length}
      siblingCount={0}
      boundaryCount={
        width === "xs" ? 1 : width === "sm" ? 3 : width === "md" ? 7 : 9
      }
      variant="outlined"
      page={page}
      onChange={handleClick}
    />
  );
}

export default withWidth()(PaginationLink);
