import React, { Component } from "react";
import NowPlaying from "./NowPlaying";
import SongList from "./SongList";
import SearchForm from "./SearchForm";
import db from "../../Config/db";

class Playlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currSong: {},
      songList: []
    };

    this.nextSong = this.nextSong.bind(this);
  }

  // Sets up events to listen for changes to songlist
  componentWillMount() {
    const previousSongs = this.state.songList;

    // Gets called when reading firebase database or new entry is added
    db.ref(this.props.playlistKey)
      .child("songs")
      .on("child_added", snap => {
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
          songList: sortedSongs
        });
      });

    // Called everytime entry deleted from song branch in database
    db.ref(this.props.playlistKey)
      .child("songs")
      .on("child_removed", snap => {
        for (var i = 0; i < previousSongs.length; i++) {
          if (previousSongs[i].songId === snap.key) {
            previousSongs.splice(i, 1);
          }
        }
        this.setState({
          songList: previousSongs
        });
      });

    db.ref(this.props.playlistKey)
      .child("songs")
      .on("child_changed", snap => {
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

    // THERE HAS TO BE A BETTER WAY TO GET THE CHILD OBJECT
    // MY NESTED DB.REFS IS PROBABLY NOT THE WAY TO GO
    db.ref(this.props.playlistKey)
      .child("currSong")
      .on("child_changed", snap => {
        db.ref(this.props.playlistKey)
          .child("currSong")
          .once("value")
          .then(snap => {
            this.setState({ currSong: snap.val() });
          });
      });

    db.ref(this.props.playlistKey)
      .child("currSong")
      .on("child_added", snap => {
        db.ref(this.props.playlistKey)
          .child("currSong")
          .once("value")
          .then(snap => {
            this.setState({ currSong: snap.val() });
          });
      });
  }

  // Makes current song the first item in song queue and pops song queue
  // OR if no song left in queue makes current song an N/A
  nextSong() {
    db.ref(this.props.playlistKey)
      .child("currSong")
      .once("value", snapshot => {
        if (this.state.songList.length > 0) {
          var nextsong = this.state.songList[0];
          this.popSongQueue();
        } else {
          var nextsong = {
            songArtist: "N/A",
            songName: "N/A",
            songAlbum: "N/A"
          };
        }
        db.ref(this.props.playlistKey).update({ currSong: nextsong });
      });
  }

  popSongQueue() {
    var songToPopId = this.state.songList[0].songId;
    db.ref(this.props.playlistKey)
      .child("songs")
      .child(songToPopId)
      .remove();
  }

  render() {
    return (
      <div>
        <NowPlaying
          playlistKey={this.props.playlistKey}
          currSong={this.state.currSong}
          nextSong={this.nextSong}
        />
        <SongList
          playlistKey={this.props.playlistKey}
          songList={this.state.songList}
        />
        <SearchForm playlistKey={this.props.playlistKey} />
      </div>
    );
  }
}

export default Playlist;
