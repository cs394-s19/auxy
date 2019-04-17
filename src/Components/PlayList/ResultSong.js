import React, { Component } from "react";
import db from "../../Config/db";

class ResultSong extends Component {
  constructor(props) {
    super(props);

    this.addSong = this.addSong.bind(this);
  }

  addSong() {
    var exists = false;
    this.props.onClickSong();
    db.ref(this.props.playlistKey)
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

    db.ref(this.props.playlistKey)
      .child("songs")
      .push()
      .set({
        songName: this.props.result.name,
        songScore: 0,
        songArtist: this.props.result.artists[0].name,
        songAlbum: this.props.result.album.images[0].url,
        spotifyId: this.props.result.id,
        spotifyURI: this.props.result.uri
      });
  }

  render() {
    return (
      <div onClick={() => this.addSong()}>
        Song: {this.props.result.name} <br />
        Artists: {this.props.result.artists[0].name}
        <br />
        <br />
      </div>
    );
  }
}

export default ResultSong;
