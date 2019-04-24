import React, { Component } from "react";
import "../../Styles/SongBlock.css";
import app from "../../Config/db";

import upvotestencil from "../../Images/upvotestencil.svg"

const db = app.database();

class SongBlock extends Component {
  // Like button is clicked -> will either remove current uid from likedBy or add current uid to likedBy
  // this will trigger the on_changed event in App.js
  handleLike(songId) {
    db.ref("playlists/" + this.props.playlistKey + "/songs/" + songId)
      .child("likedBy")
      .orderByValue()
      .equalTo(this.props.uid)
      .once("value", snapshot => {
        console.log(snapshot.exists());
        // Snapshot will exist if user has already liked the song before
        if (!snapshot.exists()) {
          // Add user to likedBy (like song)
          db.ref("playlists/" + this.props.playlistKey + "/songs/" + songId)
            .child("likedBy")
            .push(this.props.uid);
        } else { 
          // Remove user from likedBy (dislike song)
          var keyToRemove = Object.keys(snapshot.val())[0];
          db.ref(
            "playlists/" +
              this.props.playlistKey +
              "/songs/" +
              songId +
              "/likedBy/"
          )
            .child(keyToRemove)
            .remove();
        }
      });
  }

  // handleLike(songId) {
  //   db.ref("playlists/" + this.props.playlistKey + "/songs/" + songId)
  //     .child("likedBy")
  //     .orderByChild("uid")
  //     .equalTo(this.props.uid)
  //     .once("value", snapshot => {
  //       if (!snapshot.exists()) {
  //         db.ref("playlists/" + this.props.playlistKey + "/songs/" + songId + "/likedBy")
  //           .push()
  //           .set({
  //             uid: this.props.uid
  //           });
  //       } else {
  //         alert('You already voted');
  //       }
  //     });
  // }

  handleDelete(songId) {
    db.ref("playlists/" + this.props.playlistKey)
      .child("songs")
      .child(songId)
      .remove();
  }

  render() {
    return (
      <div className="sb-container">
        {this.props.admin ? (
          <button className="sb-delete" onClick={() => this.handleDelete(this.props.songId)}>
            x
          </button>
        ) : null}
        <div className="sb-info">
          <div className="sb-info-songname">{this.props.songName}</div>
          <div className="sb-info-songartist">{this.props.songArtist}</div>
        </div>
        <div className="sb-score">{this.props.songScore}</div>

        <button className="sb-upvote" onClick={() => this.handleLike(this.props.songId)}>
          <img className="sb-upvote-stencil" src={upvotestencil} alt="+" />
        </button>
      </div>
    );
  }
}

export default SongBlock;
