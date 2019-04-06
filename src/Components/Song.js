import React, { Component } from "react";
import PropTypes from "prop-types";

import Delete from "@material-ui/icons/DeleteForever";
import Upvote from "@material-ui/icons/ArrowUpward";

class Song extends Component {
  constructor(props) {
    super(props);
    this.handleremoveSong = this.handleremoveSong.bind(this);
    this.handleLike = this.handleLike.bind(this);

    this.state = {
      songName: props.songName,
      songId: props.songId,
      songScore: props.songScore
    };
  }

  handleremoveSong(id) {
    this.props.removeSong(id);
  }

  handleLike(id) {
    this.props.likeSong(id);
    this.setState({
      songScore: this.state.songScore + 1
    });
  }

  render(props) {
    return (
      <div className="song fade-in">
        <button onClick={() => this.handleremoveSong(this.state.songId)}>
          <Delete />
        </button>
        <p className="songName">
          {this.state.songName} ------- {this.state.songScore}
        </p>
        <button onClick={() => this.handleLike(this.state.songId)}>
          <Upvote />
        </button>
      </div>
    );
  }
}

Song.propTypes = {
  songName: PropTypes.string
};

export default Song;
