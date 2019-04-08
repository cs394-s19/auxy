import React, { Component } from "react";
import PropTypes from "prop-types";
import starboycover from "../Images/starboy-cover.jpg";

import "../Styles/NowPlaying.css";

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
        <div className="container">
          <div className="song-info">
            <div className="song-name">{this.state.songName}</div>
            <div className="song-artist">{this.state.songArtist}</div>
          </div>
            <div className="song-cover-container">
              <img className="song-cover" src={starboycover} alt="starboycover" />
            </div>
          <div>
          </div>
        </div>
      )  
  }
}

NowPlaying.propTypes = {
  songName: PropTypes.string
};

export default NowPlaying;
