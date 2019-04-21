import React, { Component } from "react";
import NowPlaying from "./NowPlaying";
import SongList from "./SongList";
import SearchForm from "./SearchForm";
import "../../Styles/PlayList.css";
import app from "../../Config/db";

const db = app.database();

class PlayList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currSong: {
        songName: "N/A",
        songArtist: "N/A",
        songAlbum: "N/A",
        songID: "N/A"
      },
      songList: [],
      admin: false
    };

    this.nextSong = this.nextSong.bind(this);
  }

  // Sets up events to listen for changes to songlist
  componentWillMount() {
    const previousSongs = this.state.songList;

    // Gets called when reading firebase database or new entry is added
    db.ref("playlists/" + this.props.playlistKey)
      .child("songs")
      .on("child_added", snap => {
        previousSongs.push({
          songId: snap.key,
          songName: snap.val().songName,
          songArtist: snap.val().songArtist,
          songScore: snap.val().songScore,
          songAlbum: snap.val().songAlbum,
          spotifyId: snap.val().spotifyId,
          spotifyURI: snap.val().spotifyURI
        });

        // Sort song rankings by score (need to refresh if multiple people on app)
        var sortedSongs = previousSongs;
        sortedSongs.sort((a, b) => b.songScore - a.songScore);

        this.setState({
          songList: sortedSongs
        });
      });

    // Called everytime entry deleted from song branch in database
    db.ref("playlists/" + this.props.playlistKey)
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

    db.ref("playlists/" + this.props.playlistKey)
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
    db.ref("playlists/" + this.props.playlistKey)
      .child("currSong")
      .on("child_changed", snap => {
        db.ref("playlists/" + this.props.playlistKey)
          .child("currSong")
          .once("value")
          .then(snap => {
            this.setState({ currSong: snap.val() });
          });
      });

    db.ref("playlists/" + this.props.playlistKey)
      .child("currSong")
      .on("child_added", snap => {
        db.ref("playlists/" + this.props.playlistKey)
          .child("currSong")
          .once("value")
          .then(snap => {
            this.setState({ currSong: snap.val() });
          });
      });

    // On component mount -- check if userid matches hostid and change admin state depending on that
    this.checkAdmin();
  }

  checkAdmin() {
    db.ref("playlists/" + this.props.playlistKey)
      .orderByChild("hostUID")
      .equalTo(this.props.uid)
      .once("value", snapshot => {
        if (snapshot.exists()) {
          this.setState({ admin: true });
        } else {
          this.setState({ admin: false });
        }
      });
  }

  // Makes current song the first item in song queue and pops song queue
  // OR if no song left in queue makes current song an N/A
  nextSong() {
    db.ref("playlists/" + this.props.playlistKey)
      .child("currSong")
      .once("value", snapshot => {
        var nextsong;
        if (this.state.songList.length > 0) {
          nextsong = this.state.songList[0];
          this.popSongQueue();
        } else {
          nextsong = {
            songArtist: "N/A",
            songName: "N/A",
            songAlbum: "N/A"
          };
        }
        db.ref("playlists/" + this.props.playlistKey).update({
          currSong: nextsong
        });
      });
  }

  popSongQueue() {
    var songToPopId = this.state.songList[0].songId;
    db.ref("playlists/" + this.props.playlistKey)
      .child("songs")
      .child(songToPopId)
      .remove();
  }

  render() {
    var adminHa = this.state.admin ? (
      <div>Admin: True</div>
    ) : (
      <div>Admin: False</div>
    );
    return (
      <div className="pl-container">
        {/* <div className="pl-header">
          <button className="pl-logout" onClick={this.props.onLogout}>
            logout
          </button>
          <div className="pl-key"> {this.props.playlistKey}</div>
          {adminHa}
        </div> */}
      
        <NowPlaying
          onLogout={this.props.onLogout}
          playlistKey={this.props.playlistKey}
          playlistKey={this.props.playlistKey}
          currSong={this.state.currSong}
          nextSong={this.nextSong}
          admin={this.state.admin}
        />
        <div style={{zIndex: '1000'}} className="songlist-container">
          <div className="np-info">
            <div className="np-info-songname">{this.state.currSong.songName}</div>
            <div className="np-info-artist">{this.state.currSong.songArtist}</div>
          </div>
          <SongList
          playlistKey={this.props.playlistKey}
          songList={this.state.songList}
          currSong={this.state.currSong}
          />
        </div>
        <SearchForm playlistKey={this.props.playlistKey} />

        
        
      </div>
    );
  }
}

export default PlayList;
