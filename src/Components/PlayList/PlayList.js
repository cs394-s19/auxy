import React, { Component } from "react";
import NowPlaying from "./NowPlaying";
import SongList from "./SongList";
import SearchForm from "./SearchForm";
import db from "../../Config/db";

class Playlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currSong: {
        artistName: "Jonas Brothers",
        songName: "Sucker",
        albumName: "Single"
      },
      songList: []
    };
  }

  // Sets up events to listen for changes to songlist
  componentWillMount() {
    const previousSongs = this.state.songList;

    // Gets called when reading firebase database or new entry is added
    db.child("songs").on("child_added", snap => {
      previousSongs.push({
        songId: snap.key,
        songName: snap.val().songName,
        songArtist: snap.val().songArtist,
        songScore: snap.val().songScore
      });

      // Sort song rankings by score (need to refresh if multiple people on app)
      var sortedSongs = previousSongs;
      sortedSongs.sort((a, b) => b.songScore - a.songScore);

      this.setState({
        songList: sortedSongs,
        search: ""
      });
    });

    // Called everytime entry deleted from song branch in database
    db.child("songs").on("child_removed", snap => {
      for (var i = 0; i < previousSongs.length; i++) {
        if (previousSongs[i].songId === snap.key) {
          previousSongs.splice(i, 1);
        }
      }
      this.setState({
        songList: previousSongs
      });
    });

    db.child("songs").on("child_changed", snap => {
      for (var i = 0; i < previousSongs.length; i++) {
        if (previousSongs[i].songId === snap.key) {
          previousSongs[i].songScore++;
        }
      }
      var sortedSongs = previousSongs;
      sortedSongs.sort((a, b) => b.songScore - a.songScore);

      this.setState({
        songList: sortedSongs
      });
    });
  }

  render() {
    return (
      <div>
        <NowPlaying currSong={this.state.currSong} />
        <SongList songList={this.state.songList} />
        <SearchForm />
      </div>
    );
  }
}

export default Playlist;
