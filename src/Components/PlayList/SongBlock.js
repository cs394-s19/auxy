import React, { Component } from "react";
import "../../Styles/SongBlock.css";
import app from "../../Config/db";
import upvotestencil from "../../Images/upvotestencil.svg";
import ThumbUp from "@material-ui/icons/KeyboardArrowUp";
import DeleteIcon from "@material-ui/icons/Delete";
import SongButton from "../Buttons/SongButton";
import IconButton from '@material-ui/core/IconButton';

const db = app.database();

class SongBlock extends Component {
  // Like button is clicked -> will either remove current uid from likedBy or add current uid to likedBy
  // this will trigger the on_changed event in App.js
  constructor(props) {
    super(props);

    this.handleLike = this.handleLike.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleLike() {
    const songId = this.props.songId;
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

  handleDelete() {
    const songId = this.props.songId;

    db.ref("playlists/" + this.props.playlistKey)
      .child("songs")
      .child(songId)
      .remove();
  }

  render() {
    return (
      <div className="sb-container">
        {this.props.admin ? (
          <SongButton
            icon={
              <DeleteIcon
                style={{
                  margin: "none !important"
                }}
              />
            }
            handleFunction={this.handleDelete}
          />
        ) : null}
        <div className="sb-info">
          <div className="sb-info-songname">{this.props.songName}</div>
          <div className="sb-info-songartist">{this.props.songArtist}</div>
        </div>
        <div className="sb-score">{this.props.songScore}</div>
        <SongButton
          icon={
            <ThumbUp/>
          }
          variant="outlined"
          handleFunction={this.handleLike}
        />
      </div>
    );
  }
}

export default SongBlock;
