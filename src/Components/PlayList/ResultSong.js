import React, { Component } from "react";
import app from "../../Config/db";
import { ListGroupItem, CardColumns, Card } from "react-bootstrap";
import "../../Styles/PlayList.css";
const db = app.database();

class ResultSong extends Component {
  constructor(props) {
    super(props);

    this.addSong = this.addSong.bind(this);
  }

  addSong() {
    var exists = false;
    this.props.onClickSong();
    db.ref("playlists/" + this.props.playlistKey)
      .child("songs")
      .orderByChild("spotifyId")
      .equalTo(this.props.result.id)
      .once("value", snapshot => {
        if (snapshot.val() !== null) {
          exists = true;
        }
      });

    if (exists) {
      alert(
        this.props.result.name +
          " by " +
          this.props.result.artists[0].name +
          " already exists in this queue"
      );
      return;
    }

    db.ref("playlists/" + this.props.playlistKey)
      .child("songs")
      .push()
      .set({
        songName: this.props.result.name,
        songArtist: this.props.result.artists[0].name,
        songAlbum: this.props.result.album.images[0].url,
        spotifyId: this.props.result.id,
        spotifyURI: this.props.result.uri,
        likedBy: []
      });
  }

  render() {
    return (
      <div className="sb-container1" onClick={() => this.addSong()}>
        <div className="paneName">{this.props.result.name} </div>
        <div className="paneArtist">
          {this.props.result.artists[0].name}
        </div>
      </div>
    );
  }
}

export default ResultSong;
