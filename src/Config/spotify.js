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
  "BQDP4ikE_kEzIZ-0pASKdIHSttQ2rKpwwgR4tBt3ZFaAWGqjyLdOwUeJAfbp_Y8rWz5-LxKLfg0TnHv3BwiokG08oaiV8NGzhMXD7-9h0QXZ5JLtty7knMrOXETJrY45NYKMszZ0kh95GBN1DvZ-ybKx5VLWipSS-cEJlhzQ";
export { spotifyApi, spotifyApiToken, redirect_urls, clientId };
