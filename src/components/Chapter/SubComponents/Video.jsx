import React, { useState } from "react";
// import { PlyrComponent } from "plyr-react";
import Plyr from "./plyr";
import withWidth from "@material-ui/core/withWidth";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

function Video({ link, width }) {
  var data = {
    options: {
      controls: [
        "rewind",
        "play",
        "fast-forward",
        "progress",
        "current-time",
        "duration",
        "mute",
        "volume",
        "settings",
        "fullscreen",
      ],
      i18n: {
        restart: "Restart",
        rewind: "Rewind {seektime}s",
        play: "Play",
        pause: "Pause",
        fastForward: "Forward {seektime}s",
        seek: "Seek",
        seekLabel: "{currentTime} of {duration}",
        played: "Played",
        buffered: "Buffered",
        currentTime: "Current time",
        duration: "Duration",
        volume: "Volume",
        mute: "Mute",
        unmute: "Unmute",
        enableCaptions: "Enable captions",
        disableCaptions: "Disable captions",
        download: "Download",
        enterFullscreen: "Enter fullscreen",
        exitFullscreen: "Exit fullscreen",
        frameTitle: "Player for {title}",
        captions: "Captions",
        settings: "Settings",
        menuBack: "Go back to previous menu",
        speed: "Speed",
        normal: "Normal",
        quality: "Quality",
        loop: "Loop",
      },
    },
    sources: {
      type: "video",
      sources: [
        {
          src: link,
          type: "video/mp4",
          size: 720,
        },
      ],
    },
  };

  var optionsResponsive = {
    controls: [
      "play",
      "progress",
      "current-time",
      "mute",
      "volume",
      "settings",
      "fullscreen",
    ],
    i18n: {
      restart: "Restart",
      rewind: "Rewind {seektime}s",
      play: "Play",
      pause: "Pause",
      fastForward: "Forward {seektime}s",
      seek: "Seek",
      seekLabel: "{currentTime} of {duration}",
      played: "Played",
      buffered: "Buffered",
      currentTime: "Current time",
      duration: "Duration",
      volume: "Volume",
      mute: "Mute",
      unmute: "Unmute",
      enableCaptions: "Enable captions",
      disableCaptions: "Disable captions",
      download: "Download",
      enterFullscreen: "Enter fullscreen",
      exitFullscreen: "Exit fullscreen",
      frameTitle: "Player for {title}",
      captions: "Captions",
      settings: "Settings",
      menuBack: "Go back to previous menu",
      speed: "Speed",
      normal: "Normal",
      quality: "Quality",
      loop: "Loop",
    },
  };

  // var sources = {
  //   type: "video",
  //   sources: [
  //     {
  //       src: props.link,
  //     },
  //   ],
  // };

  const [error, setError] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  window.onerror = (event) => {
    setError(true);
  };

  return (
    <div>
      <Plyr
        options={width === "xs" ? optionsResponsive : data.options}
        sources={data.sources}
      />
      {/* <PlyrComponent style={{ width: "auto" }} sources={sources} /> */}
      <Snackbar open={error} autoHideDuration={10000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          El episodio seleccionado no se encuentra disponible, deja un reporte
          para solucionar este problema a la brevedad.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default withWidth()(Video);
