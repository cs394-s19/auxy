var Spotify = require("spotify-web-api-js");

var clientId = "21132691864e495baeae18c21df7f579",
  clientSecret = "2388108510ef4b1b92bc2b701635b972";

var spotifyApi = new Spotify({
  clientId: clientId,
  clientSecret: clientSecret
});

var redirect_urls = {
  development_url: "http://localhost:3000/",
  pruduction_url: "https://auxy-8d8d5.firebaseapp.com/"
}

var spotifyApiToken =
  "BQD0wahjVBRBp_PLnGqS-yJOul5rWPHzbGIe-g1mKpGM6CvVKxcKfOq5eybVFJixKOHeGP66Fxmk-q5PeoHNHnaM0ZK4Trt8v6bBOxoXfrAPOaMQ48TVsmG2xZyXTgNghubu4UdFUqkrKpJGnbst6ss71tcVm3FUdUUxzuJmnamkRaOrtcvK89QD";
export { spotifyApi, spotifyApiToken, redirect_urls, clientId };
