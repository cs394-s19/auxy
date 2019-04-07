import React, { Component } from "react";

import "./App.css";
import Song from "./Components/Song";
import SongForm from "./Components/SongForm";
import NowPlaying from "./Components/NowPlaying";

import { DB_CONFIG } from "./Config/config";
import firebase from "firebase/app";
import "firebase/database";
import confidential from "./confidential.json"
import Table from "./Components/Table";
var SpotifyWebApi = require('spotify-web-api-node');


class App extends Component {
  constructor(props) {
    super(props);

    // Get rids of a weird bug where it said '[DEFAULT]' already defined
    if (!firebase.apps.length) {
      this.app = firebase.initializeApp(DB_CONFIG);
    }

    // Be able to reference database easier
    this.database = this.app.database().ref();

    // Set up React state of our component -- list of songs (with songId, songName, songScore)
    this.state = {
      songs: [],
      currSong: {
        name: "TestSong",
        id: "1234"
      }
    };

    // binding to be able to refer to "this"
    this.addSong = this.addSong.bind(this);
    this.removeSong = this.removeSong.bind(this);
    this.likeSong = this.likeSong.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.reSort = this.reSort.bind(this);
  }

  authenticate() {

    //authenticate api
    var spotifyApi = new SpotifyWebApi({
      clientId : confidential.id,
      clientSecret : confidential.secret,
      redirectUri : 'http://www.example.com/callback'
    });

    //get Elvis's Albums
    spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
      .then(function(data) {
        console.log('Artist albums', data.body);
      }, function(err) {
        console.error(err);
      });
  }

  componentWillMount() {
    const previousSongs = this.state.songs;

    // Gets called when reading firebase database or new entry is added
    // TO MAKE CLEANER: perhaps try using .ref('songs').orderByChild('songScore')???
    this.database.child("songs").on("child_added", snap => {
      previousSongs.push({
        songId: snap.key,
        songName: snap.val().songName,
        songScore: snap.val().songScore
      });

      // Sort song rankings by score (need to refresh if multiple people on app)
      var sortedSongs = previousSongs;
      sortedSongs.sort((a, b) => b.songScore - a.songScore);

      this.setState({
        songs: sortedSongs,
        search: ""
      });
    });

    // Called everytime entry deleted from song branch in database
    this.database.child("songs").on("child_removed", snap => {
      for (var i = 0; i < previousSongs.length; i++) {
        if (previousSongs[i].songId === snap.key) {
          previousSongs.splice(i, 1);
        }
      }

      this.setState({
        songs: previousSongs
      });
    });

    this.database.child("songs").on("child_changed", snap => {
      for (var i = 0; i < previousSongs.length; i++) {
        if (previousSongs[i].songId === snap.key) {
          previousSongs[i].songScore++;
        }
      }

      var sortedSongs = previousSongs;
      sortedSongs.sort((a, b) => b.songScore - a.songScore);

      this.setState({
        songs: sortedSongs
      });
    });
  }

  updateSearch(e) {
    this.setState({ search: e.target.value });
  }

  // Add song and set first score to 0
  addSong(song) {
    this.database
      .child("songs")
      .push()
      .set({ songName: song, songScore: 0 });
  }

  // Remove song by ID (triggered by button in Song.js)
  removeSong(songId) {
    this.database
      .child("songs")
      .child(songId)
      .remove();
  }

  // Increment like counter in song by 1 -- currently no way of stopping 1000x likes
  // NOTE: this might be a janky solution with .once but I couldn't find another way
  likeSong(songId) {
    // Old version of songlist (pre-increment)
    const previousSongs = this.state.songs;

    // Find the current score of the song (might not match the one displayed if not refreshed)
    // Update the score to be the current score + 1
    this.database
      .child("songs")
      .child(songId)
      .once("value", snap => {
        var currScore = snap.val().songScore;
        this.database
          .child("songs")
          .child(songId)
          .update({ songScore: currScore + 1 });
      });

    // Trying a cleaner way to do the same as above without .child .child
    // this.database.ref("songs").orderByKey().equalTo(songId).once("value", snap => {
    //   var currScore = snap.val().songScore;
    // })

    // Resort if necessary and make the change above into set state

    previousSongs.sort((a, b) => b.songScore - a.songScore);

    this.setState({
      songs: previousSongs
    });
  }

  reSort() {
    const previousSongs = this.state.songs;
    previousSongs.sort((a, b) => b.songScore - a.songScore);

    this.setState({
      songs: previousSongs
    });
  }

  render() {
    // Current classNames dont do anything -- no styling
    let filteredSongs = this.state.songs.filter(song => {
      return (
        song.songName.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1
      );
    });

    return (
      <div className="songsWrapper">
        <div className="songsHeader">
          <div className="heading">Auxy Song List v1</div>
          <NowPlaying songName={this.state.currSong.name} />

          {/* <input
            type="text"
            value={this.state.search}
            onChange={this.updateSearch}
          /> */}
        </div>
        <div className="songsBody">
          {/* USE this.state.songs INSTEAD of filteredSongs to ignore filter */}
          {filteredSongs.map(song => {
            return (
              <Song
                songName={song.songName}
                songScore={song.songScore}
                songId={song.songId}
                key={song.songId}
                removeSong={this.removeSong}
                likeSong={this.likeSong}
                reSort={this.reSort}
              />
            );
          })}
        </div>
        {/* Optional Table formatting -- barely implemented */}
        {/* <Table songList={this.state.songs} handleLike /> */}
        <div className="songsFooter">
          <SongForm addSong={this.addSong} />
        </div>
      </div>
    );
  }
}

export default App;
