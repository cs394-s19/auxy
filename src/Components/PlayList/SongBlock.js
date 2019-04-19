import React, { Component } from "react";
import "../../Styles/SongBlock.css";
import app from "../../Config/db";

const db = app.database();

class SongBlock extends Component {
  handleLike(songId) {
    db.ref("playlists/" + this.props.playlistKey)
      .child("songs")
      .child(songId)
      .once("value", snap => {
        var currScore = snap.val().songScore;
        db.ref("playlists/" + this.props.playlistKey)
          .child("songs")
          .child(songId)
          .update({ songScore: currScore + 1 });
      });
  }

  handleDelete(songId) {
    db.ref("playlists/" + this.props.playlistKey)
      .child("songs")
      .child(songId)
      .remove();
  }

  render() {
    return (
      <div className="sb-container">
        <button onClick={() => this.handleDelete(this.props.songId)}>
          Delete
        </button>
        <div className="sb-info">
          <div className="sb-info-songname">{this.props.songName}</div>
          <div className="sb-info-songartist">{this.props.songArtist}</div>
        </div>
        <div className="sb-score">{this.props.songScore}</div>

        <button onClick={() => this.handleLike(this.props.songId)}>Like</button>
      </div>
    );
  }
}

export default SongBlock;
