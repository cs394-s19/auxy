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
  "BQAHW1t9WG0qQ7sLzVYApTiBjg6rYmhDY6QCpULQr0WbKoF2P7-mAeO35X9l43evBPviS223AOhGNFXoegqha5bBzgT9awRiJNGCzaMkfdXWFkKH0GIc6v-n-a97LGrRhCpuE7txpYbDPa-ssnyp4tSrpQLfkqBT67OYhZCa48jBFxK6qptj9NAt";
export { spotifyApi, spotifyApiToken, redirect_urls, clientId };
