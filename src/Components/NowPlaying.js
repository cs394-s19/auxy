import React, { Component } from "react";
import PropTypes from "prop-types";
import starboycover from "../Images/starboy-cover.jpg";

import "../Styles/NowPlaying.css";

class NowPlaying extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songName: props.songName,
      songId: props.songId,
      songImage: props.songImage,
      songArtist: props.songArtist,
      deviceId: "",
      token: "BQAeC37uYFS3_CsX2Xd5RBjc0gkRPVuX-8nQrn9tFXDdTHFJSkVzzCXavgRZSopBEkshScgscnFJ36rEyeGMeqGfFtV1DgakJUxYuu089NAzDV0fCX6uyWXSVX-vLzFfh8ntDqDC5O3u3bU1H_pybeRWsGrsi3NjX7DwMegn",
      loggedIn: false,
      playing: false,
      position: 0,
      duration: 0,
    };
    this.playerCheckInterval = null;
  }

  //this checks that the Spotify Player is Loaded. Notice in Public/index.html we load the Spotify Web Player.
  // Once it loads in the window, we can initialize an instance with a current Host token. 
  checkForPlayer() {
    const { token } = 'token_here';
  
    if (window.Spotify !== null) {
      // clearInterval(this.playerCheckInterval);
      this.player = new window.Spotify.Player({
        name: "Auxy Spotify Player",
        getOAuthToken: cb => { cb('BQAeC37uYFS3_CsX2Xd5RBjc0gkRPVuX-8nQrn9tFXDdTHFJSkVzzCXavgRZSopBEkshScgscnFJ36rEyeGMeqGfFtV1DgakJUxYuu089NAzDV0fCX6uyWXSVX-vLzFfh8ntDqDC5O3u3bU1H_pybeRWsGrsi3NjX7DwMegn'); },
      });
      this.createEventHandlers();
  
      // finally, connect!
      this.player.connect();
    }
  }

  handleLogin() {
    if (this.state.token !== "") {
      this.setState({ loggedIn: true });
      // check every second for the player.
      this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
    }
  }

  createEventHandlers() {
    this.player.on('initialization_error', e => { console.error(e); });
    this.player.on('authentication_error', e => {
      console.error(e);
      this.setState({ loggedIn: false });
    });
    this.player.on('account_error', e => { console.error(e); });
    this.player.on('playback_error', e => { console.error(e); });
  
    // Playback status updates
    this.player.on('player_state_changed', state => this.onStateChanged(state));
  
    // Ready
    this.player.on('ready', data => {
      let { device_id } = data;
      console.log("Let the music play on!");
      this.setState({ deviceId: device_id });
    });
  }

  playsong(uri) {
    const play = ({
      spotify_uri,
      playerInstance: {
        _options: {
          getOAuthToken,
          id
        }
      }
    }) => {
      getOAuthToken(access_token => {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
          method: 'PUT',
          body: JSON.stringify({ uris: [spotify_uri] }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
          },
        });
      });
    };

    play({
      playerInstance: this.player,
      spotify_uri: uri,
    });
  }

  onStateChanged(state) {
    // if we're no longer listening to music, we'll get a null state.
    if (state !== null) {
      const {
        current_track: currentTrack,
        position,
      } = state.track_window;
      const trackName = currentTrack.name;
      const albumName = currentTrack.album.name;
      const artistName = currentTrack.artists
        .map(artist => artist.name)
        .join(", ");
      const duration = currentTrack.duration_ms;
      const playing = !state.paused;
      console.log(position, currentTrack)
      console.log(duration);
      //This line below will print when a state change causes the music to stop playing, aka when the song finishes.
      //This can hopefully be used in the future to trigger the nnext song.
      if(!playing) {
        console.log("Stopped playing!")
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

  render(){
    
      return(
        <div className="now-playing-container">
          <div className="song-info">
            <div className="song-name">{this.state.songName}</div>
            <div className="song-artist">{this.state.songArtist}</div>
          </div>
            <div className="song-cover-container">
              <img className="song-cover" src={starboycover} alt="starboycover" />
            </div>
          <div>
          <button onClick={() => this.checkForPlayer()}>Connect</button>
          <button onClick={() => this.playsong('spotify:track:7xGfFoTpQ2E7fRF5lN10tr')}>Play!</button>
          </div>
        </div>
      )  
  }
}

NowPlaying.propTypes = {
  songName: PropTypes.string
};

export default NowPlaying;
