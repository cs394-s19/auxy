import React, { Component } from "react";
import PropTypes from "prop-types";

class NowPlaying extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songName: props.songName,
      songId: props.songId,
      songImage: props.songImage,
      songArtist: props.songArtist,
    };
  }

  render(){
      return(
        <div>
          {this.state.songName}
        </div>
      )  
  }
}

NowPlaying.propTypes = {
  songName: PropTypes.string
};

export default NowPlaying;
