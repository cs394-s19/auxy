import React, { Component } from "react";
import db from "../../Config/db";

class SongBlock extends Component {
  constructor(props) {
    super(props);
  }

  handleLike(songId) {
    db.ref(this.props.playlistKey)
      .child("songs")
      .child(songId)
      .once("value", snap => {
        var currScore = snap.val().songScore;
        db.ref(this.props.playlistKey)
          .child("songs")
          .child(songId)
          .update({ songScore: currScore + 1 });
      });
  }

  handleDelete(songId) {
    db.ref(this.props.playlistKey)
      .child("songs")
      .child(songId)
      .remove();
  }

  render() {
    return (
      <div>
        Song: {this.props.songName} <br />
        Artist: {this.props.songArtist} <br />
        Score: {this.props.songScore} <br />
        <button onClick={() => this.handleDelete(this.props.songId)}>
          Delete
        </button>
        <button onClick={() => this.handleLike(this.props.songId)}>Like</button>
        <br />
        <br />
      </div>
    );
  }
}

export default SongBlock;
