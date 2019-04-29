import React, { Component } from "react";
import "../../Styles/NowPlaying.css";
import { spotifyApiToken } from "../../Config/spotify";
import PropTypes from "prop-types";
import * as SpotifyFunctions from "./spotifyFunctions";
// import "../Styles/NowPlaying.css";
import app from "../../Config/db";
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
    const { token } = "token_here";

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
      this.setState({ loggedIn: false });
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
    });
  }

  playsong(uri) {
    if(this.state.connected === false){
      this.checkForPlayer();
      this.props.nextSong();
    }
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

  // shouldComponentUpdate(nextProps, nextState){
  //   if (nextProps.currSong.songName !== this.state.songName){
  //     console.log("UPDATE PLEASE");
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.currSong.spotifyURI !== this.state.uri) {
      this.setState({ uri: nextProps.currSong.spotifyURI });
      if (this.state.connected) {
        this.playsong(nextProps.currSong.spotifyURI);
      }
    }
  }

  onStateChanged(state) {
    // if we're no longer listening to music, we'll get a null state.
    if (state !== null) {
      const { current_track: currentTrack } = state.track_window;
      const trackName = currentTrack.name;
      const albumName = currentTrack.album.name;
      const artistName = currentTrack.artists
        .map(artist => artist.name)
        .join(", ");
      const duration = currentTrack.duration_ms;
      const position = state.position;
      const playing = !state.paused;
      //This handles when a next song should be played.
      if (!playing && (this.state.position !== 0 && state.position === 0)) {
        this.props.nextSong();
      }
      console.log(currentTrack);
      this.setState({
        position,
        duration,
        trackName,
        albumName,
        artistName,
        playing
      });
    }
  }

  render() {
    return (
      <div className="np-container" style={{ zIndex: "0" }}>
        <div className="np-header">
          <button className="np-logout" onClick={this.props.onLogout}>
            &lt;
          </button>
          <div className="np-key"> JOIN: {this.props.playlistKey}</div>
        </div>

        <div className="np-imagecontainer">
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
              <button className="np-button" onClick={() => this.playsong(this.props.currSong.spotifyURI)}>
                Play
              </button>
              <button className="np-button" onClick={this.props.nextSong}>
                {" "}
                Next
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

NowPlaying.propTypes = {
  songName: PropTypes.string
};

export default NowPlaying;
