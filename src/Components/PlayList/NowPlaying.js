import React, { Component } from "react";
import "../../Styles/NowPlaying.css";
import { spotifyApiToken } from "../../Config/spotify";
import PropTypes from "prop-types";
import * as SpotifyFunctions from "./spotifyFunctions";
// import "../Styles/NowPlaying.css";
import app from "../../Config/db";
import Fab from '@material-ui/core/Fab';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import Skip from '@material-ui/icons/SkipNext';


import Logout from "../Buttons/Logout";
const db = app.database();

class NowPlaying extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songName: props.currSong.songName,
      songId: props.currSong.songId,
      uri: props.currSong.spotifyURI,
      songImage: props.songImage,
      songArtist: props.currSong.songArtist,
      songAlbum: props.currSong.songAlbum,
      deviceId: "",
      token: spotifyApiToken,
      loggedIn: false,
      playing: false,
      position: -1,
      duration: 0,
      connected: false,
      player_Track: null,
      newTokenRefresh: false,
    };
    this.playerCheckInterval = null;
  }

  componentDidMount() {
    //will check URL for accessToken hash. If it's not there, it will show the connect-spotify-button as a link
    //which will then redirect back to your site with the hash. If there is a hash, then we will jump right into the player

    const accessToken = SpotifyFunctions.checkUrlForSpotifyAccessToken();
    if (accessToken) {
      this.setState({ token: accessToken });
      db.ref("playlists/" + this.props.playlistKey + "/spotifyToken").set({
        token: accessToken
      });
    } else {
      this.lookForToken();
    }
  }

  lookForToken() {
    db.ref("playlists/" + this.props.playlistKey + "/spotifyToken").once(
      "value",
      snapshot => {
        if (snapshot.exists()) {
          const foundToken = Object.values(snapshot.val())[0];
          this.setState({ token: foundToken });
        }
      }
    );
  }
  //this checks that the Spotify Player is Loaded. Notice in Public/index.html we load the Spotify Web Player.
  // Once it loads in the window, we can initialize an instance with a current Host token.
  checkForPlayer() {

    if (window.Spotify !== null) {
      // clearInterval(this.playerCheckInterval);
      this.player = new window.Spotify.Player({
        name: "Auxy Spotify Player",
        getOAuthToken: cb => {
          cb(this.state.token);
        }
      });
      this.createEventHandlers();

      // finally, connect!
      this.player.connect();
      this.setState({ connected: true });
    }
    console.log(`uri is ${this.props.currSong.spotifyURI}`);
  }

  handleLogin() {
    if (this.state.token !== "") {
      this.setState({ loggedIn: true });
      // check every second for the player.
      this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
    }
  }

  createEventHandlers() {
    this.player.on("initialization_error", e => {
      console.error(e);
    });
    this.player.on("authentication_error", e => {
      console.error(e);
      console.log("this fucking triggered")
      this.setState({ loggedIn: false, connected: false });
      window.location = SpotifyFunctions.redirectUrlToSpotifyForLogin()
    });
    this.player.on("account_error", e => {
      console.error(e);
    });
    this.player.on("playback_error", e => {
      console.error(e);
    });

    // Playback status updates
    this.player.on("player_state_changed", state => this.onStateChanged(state));

    // Ready
    this.player.on("ready", data => {
      let { device_id } = data;
      console.log("Let the music play on!");
      this.setState({ deviceId: device_id });
      this.playsong(this.props.currSong.spotifyURI)
    });
  }

  playsong(uri) {
    if (this.state.connected === false) {
      this.checkForPlayer();
      if(this.props.currSong.songName === "N/A") {
        this.props.nextSong();
      }
    }



    //Triggers if the first track in a queue is being played or the first time the site is loaded - aka the Spotify Player doesn't have a track set, but the state / props do.
    if(this.state.player_Track === null) {
      console.log('first if statement triggered')
      const play = ({
        spotify_uri,
        playerInstance: {
          _options: { getOAuthToken, id }
        }
      }) => {
        getOAuthToken(access_token => {
          fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
            method: "PUT",
            body: JSON.stringify({ uris: [spotify_uri] }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`
            }
          });
        });
      };
  
      play({
        playerInstance: this.player,
        spotify_uri: uri
      });
    }

    //Regular Pause
    else if(this.state.playing) {
      this.player.pause().then(() => {
        console.log('Paused!');
      });
    }

    //Regular Resume
    else{
      this.player.resume().then(() => {
        console.log('Resumed!');
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.currSong.spotifyURI !== this.state.uri) {
      this.setState({ uri: nextProps.currSong.spotifyURI });
      if (this.state.connected) {
        const play = ({
          spotify_uri,
          playerInstance: {
            _options: { getOAuthToken, id }
          }
        }) => {
          getOAuthToken(access_token => {
            fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
              method: "PUT",
              body: JSON.stringify({ uris: [spotify_uri] }),
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
              }
            });
          });
        };
    
        play({
          playerInstance: this.player,
          spotify_uri: nextProps.currSong.spotifyURI
        });
      }
    }
  }

  onStateChanged(state) {
    // if we're no longer listening to music, we'll get a null state.
    if (state !== null) {
      const { current_track: player_Track } = state.track_window;
      const trackName = player_Track.name;
      const albumName = player_Track.album.name;
      const artistName = player_Track.artists
        .map(artist => artist.name)
        .join(", ");
      const duration = player_Track.duration_ms;
      const position = state.position;
      const playing = !state.paused;
      //This handles when a next song should be played.
      if (!playing && (this.state.position !== 0 && state.position === 0)) {
        this.props.nextSong();
      }
      console.log(player_Track);
      this.setState({
        position,
        duration,
        trackName,
        albumName,
        artistName,
        playing,
        player_Track
      });
    }
  }

  render() {
    return (
      <div className="np-container" style={{ zIndex: "0" }}>
        <div className="np-header">
          <div className="np-logout">
            <Logout handleLogout={this.props.onLogout} />
          </div>

          <div className="np-key"> JOIN: {this.props.playlistKey}</div>
        </div>

        <div style={{position: "relative"}}>
          <div style={{display: "inline-block"}}>
            <div className="np-imagecontainer" style={{display: "inline-Block"}}>
              {this.props.currSong.songAlbum !== "N/A" ? (
                <img
                  className="np-image"
                  src={this.props.currSong.songAlbum}
                  width="100%"
                  aref="Song Album"
                />
              ) : (
                ""
              )}
            </div>
                {this.props.admin ? (
              <div className="np-addons">
                <div className="np-button-container">
                  {/* <button className="np-button" onClick={() => this.checkForPlayer()}>Connect</button> */}
                  {this.state.playing ? 
                    <Fab size="small" className="playPause" onClick={() => this.playsong(this.props.currSong.spotifyURI)}>
                      <Pause />
                      
                    </Fab> :
                  <Fab size="small" className="playPause" onClick={() => this.playsong(this.props.currSong.spotifyURI)}>
                    <PlayArrow />
                    
                  </Fab>
                }
                  <Fab size="small" className="playPause" onClick={this.props.nextSong}>
                    <Skip />
                    
                  </Fab>
                </div>
              </div>
            ) : null}
          </div>
          <div style={{verticalAlign: "top", paddingTop: "200px", marginLeft: "20px", textAlign: "left"}} className="currSongDisplay">
            <div>
              <div className="np-info-songname" style={{width: "250px"}}>{this.props.currSong.songName}</div>
              <div className="np-info-songartist" style={{color: "white"}}>{this.props.currSong.songArtist}</div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

NowPlaying.propTypes = {
  songName: PropTypes.string
};

export default NowPlaying;
