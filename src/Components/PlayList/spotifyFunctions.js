import Spotify from 'spotify-web-api-js';
import uniq from 'lodash.uniq';
import flatten from 'lodash.flatten';
import chunk from 'lodash.chunk';
import { redirect_urls, clientId } from '../../Config/spotify.js'

export function redirectUrlToSpotifyForLogin(){
    const CLIENT_ID = clientId;
    const REDIRECT_URI = redirect_urls.development_url
    const scopes = [
    "user-modify-playback-state",
    "user-read-playback-state",
    "user-read-private",
    "user-read-currently-playing",
    "playlist-read-private",
    "playlist-modify-public",
    "streaming",
    "app-remote-control",];
    return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
      '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
      '&scope=' + encodeURIComponent(scopes.join(' ')) +
      '&response_type=token';
}

export function checkUrlForSpotifyAccessToken(){
    const params = getHashParams();
    const accessToken = params.access_token
    if (!accessToken) {
        return false
    }
    else {
        return accessToken
    }
}

function getHashParams() {
  //helper function to parse the query string that spotify sends back when you log in
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
      // eslint-disable-next-line
  while ( e = r.exec(q)) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}