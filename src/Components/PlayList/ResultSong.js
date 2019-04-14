import React, { Component } from "react";
import db from "../../Config/db";

class ResultSong extends Component {
  constructor(props) {
    super(props);

    this.addSong = this.addSong.bind(this);
  }

  addSong() {
    console.log(this.props.result);
    db.ref(this.props.playlistKey)
      .child("songs")
      .push()
      .set({
        songName: this.props.result.name,
        songScore: 0,
        songArtist: this.props.result.artists[0].name,
        songAlbum: this.props.result.album.images[0].url
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
