import React, { Component } from "react";
import PropTypes from "prop-types";

import Delete from "@material-ui/icons/DeleteForever";
import { ReactComponent as Logo } from '../Images/upvote_white.svg';

class Song extends Component {
  constructor(props) {
    super(props);
    this.handleremoveSong = this.handleremoveSong.bind(this);
    this.handleLike = this.handleLike.bind(this);

    this.songName = props.songName;
    this.songId = props.songId;
    this.songScore = props.songScore;
    this.songArtist = props.songArtist;

    this.state = {
      songName: props.songName,
      songId: props.songId,
      songScore: props.songScore,
      songArtist: props.songArtist
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.songScore !== prevProps.songScore) {
      this.setState({ songScore: this.props.songScore });
    }
    // this.props.reSort();
  }
  handleremoveSong(id) {
    this.props.removeSong(id);
  }

  handleLike(id) {
    this.props.likeSong(id);

  }

  render(props) {
    return (
      <div className="song fade-in">
      <div className="songMax">
        <p className="songName">
          {this.state.songName}
        </p>

        </div>
        <p className="score">
        {this.state.songScore}
        </p>
        <button className="upvote" onClick={() => this.handleLike(this.state.songId)}>
          <Logo />
        </button>
        <div className="squareTop"></div>
        <div className="squareBottom"></div>
        <div className="songArtist">
          {this.state.songArtist}
          ILLENIUM
        </div>
        <button className = "trash" onClick={() => this.handleremoveSong(this.state.songId)}>
          <Delete />
        </button>
      </div>
    );
  }
}

Song.propTypes = {
  songName: PropTypes.string
};

export default Song;
