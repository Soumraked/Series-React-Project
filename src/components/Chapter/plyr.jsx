import React from "react";
import plyr from "plyr";
import "plyr/dist/plyr.css";

class PlyrComponent extends React.Component {
  componentDidMount() {
    this.player = new plyr(".js-plyr", this.props.options);
    this.player.source = this.props.sources;
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  render() {
    return <video className="js-plyr plyr"></video>;
  }
}

export default PlyrComponent;
