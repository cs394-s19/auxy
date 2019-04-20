import React, { Component } from "react";
import "../../Styles/NowPlaying.css";
import { spotifyApiToken } from "../../Config/spotify";
import PropTypes from "prop-types";

// import "../Styles/NowPlaying.css";

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
      position: 0,
      duration: 0
    };
    this.playerCheckInterval = null;
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
          cb(spotifyApiToken);
        }
      });
      this.createEventHandlers();

      // finally, connect!
      this.player.connect();
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

  onStateChanged(state) {
    // if we're no longer listening to music, we'll get a null state.
    if (state !== null) {
      const { current_track: currentTrack, position } = state.track_window;
      const trackName = currentTrack.name;
      const albumName = currentTrack.album.name;
      const artistName = currentTrack.artists
        .map(artist => artist.name)
        .join(", ");
      const duration = currentTrack.duration_ms;
      const playing = !state.paused;
      console.log(position, currentTrack);
      console.log(duration);
      //This line below will print when a state change causes the music to stop playing, aka when the song finishes.
      //This can hopefully be used in the future to trigger the nnext song.
      if (!playing) {
        console.log("Stopped playing!");
      }
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
      <div className="np-container">
        <div className="np-imagecontainer">
          {" "}
          {this.props.currSong.songAlbum !== "N/A" ? (
            <img
              src={this.props.currSong.songAlbum}
              width="100%"
              aref="Song Album"
            />
          ) : (
            ""
          )}
        </div>
        
        <div className="np-addons">
          <div className="np-info">
            <div className="np-info-songname">{this.props.currSong.songName}</div>
            <div className="np-info-artist">{this.props.currSong.songArtist}</div>
          </div>
          <div className="np-button-container">
              <button className="np-button" onClick={() => this.checkForPlayer()}>Connect</button>
              <button className="np-button" onClick={() => this.playsong(this.props.currSong.spotifyURI)}>Play</button>
              <button className="np-button" onClick={this.props.nextSong}> Next
            </button>
          </div>
        </div>
        {/* <div className="song-info">
            <div className="song-name">{this.state.songName}</div>
            <div className="song-artist">{this.state.songArtist}</div>
          </div>
            <div className="song-cover-container">
              <img className="song-cover" src={starboycover} alt="starboycover" />
            </div> */}
        
      </div>
    );
  }
}

NowPlaying.propTypes = {
  songName: PropTypes.string
};

export default NowPlaying;
