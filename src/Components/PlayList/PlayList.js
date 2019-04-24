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
        // evaluate newSongScore to {0 if likedBy is undefined => happens when no uids in likedBy}
        // or {likedBy.length if uids are present}
        var newSongScore =
          typeof snap.val().likedBy === "undefined"
            ? 0
            : Object.values(snap.val().likedBy).length;

        previousSongs.push({
          songId: snap.key,
          songName: snap.val().songName,
          songArtist: snap.val().songArtist,
          songScore: newSongScore,
          songAlbum: snap.val().songAlbum,
          spotifyId: snap.val().spotifyId,
          spotifyURI: snap.val().spotifyURI,
          likedBy: snap.val().likedBy
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

    // If there is a change to one of the fields in songs => should only be triggered by a change in likedBy array
    db.ref("playlists/" + this.props.playlistKey)
      .child("songs")
      .on("child_changed", snap => {
        for (var i = 0; i < previousSongs.length; i++) {
          // Find the song that was changed by comparing it's songId to snap.key
          if (previousSongs[i].songId === snap.key) {
            // Calculate new song score {0 if likedBy is undefined or 0 elements} {otherwise length of likedSongs}
            var newSongScore =
              typeof snap.val().likedBy === "undefined"
                ? 0
                : Object.values(snap.val().likedBy).length;
            // Update previous songs with new score
            previousSongs[i].songScore = newSongScore;
          }
        }

        // Re-sort songs and push to state
        var sortedSongs = previousSongs;
        sortedSongs.sort((a, b) => b.songScore - a.songScore);

        this.setState({
          songList: sortedSongs
        });
      });

    // THERE HAS TO BE A BETTER WAY TO GET THE CHILD OBJECT
    // MY NESTED DB.REFS IS PROBABLY NOT THE WAY TO GO
    // When currSong is changed in database, changes the state to follow change
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

    //Similar to child_added of songlists, basically just fetches currSong from db
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

    // On component mount -- check if userid matches hostid and change admin state depending on that result
    this.checkAdmin();
  }

  checkAdmin() {
    db.ref("playlists/" + this.props.playlistKey)
      .orderByChild("hostUID")
      .equalTo(this.props.uid)
      .once("value", snapshot => {
        // Snapshot exists if hostUID is equalTo current user uid
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

          // SHIT CODE ALERT [2am and I cant think]:
          // likedBy was being passed as undefined (issue changing state on update) causing an error in firebase
          // so I made it not be undefined (anyways score doesnt matter in nowplaying)
          if (typeof nextsong.likedBy === "undefined") {
            nextsong.likedBy = "EMPTY";
          }
          this.popSongQueue();
        } else {
          nextsong = {
            songArtist: "N/A",
            songName: "N/A",
            songAlbum: "N/A"
          };
        }
        // console.log(nextsong);
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
        <div className="songlist-container">
          <div className="np-info">
            <div className="np-info-songname">{this.state.currSong.songName}</div>
            <div className="np-info-artist">{this.state.currSong.songArtist}</div>
          </div>
          <SongList
          playlistKey={this.props.playlistKey}
          songList={this.state.songList}
          uid={this.props.uid}
        />
        <SearchForm playlistKey={this.props.playlistKey} />
      </div>
      </div>
    );
  }
}

export default PlayList;
