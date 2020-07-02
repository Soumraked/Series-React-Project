import React from "react";
import { PlyrComponent } from "plyr-react";

function Video(props) {
  var sources = {
    type: "video",
    sources: [
      {
        src: props.link,
      },
    ],
  };
  return (
    <div>
      <PlyrComponent sources={sources} />
    </div>
  );
}

export default Video;
