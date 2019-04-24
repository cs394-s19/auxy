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
<<<<<<< HEAD
  "BQAHW1t9WG0qQ7sLzVYApTiBjg6rYmhDY6QCpULQr0WbKoF2P7-mAeO35X9l43evBPviS223AOhGNFXoegqha5bBzgT9awRiJNGCzaMkfdXWFkKH0GIc6v-n-a97LGrRhCpuE7txpYbDPa-ssnyp4tSrpQLfkqBT67OYhZCa48jBFxK6qptj9NAt";
=======
  "BQD0wahjVBRBp_PLnGqS-yJOul5rWPHzbGIe-g1mKpGM6CvVKxcKfOq5eybVFJixKOHeGP66Fxmk-q5PeoHNHnaM0ZK4Trt8v6bBOxoXfrAPOaMQ48TVsmG2xZyXTgNghubu4UdFUqkrKpJGnbst6ss71tcVm3FUdUUxzuJmnamkRaOrtcvK89QD";
>>>>>>> 92fc1437a666703c84ef20913bbe7aa17b94606c
export { spotifyApi, spotifyApiToken, redirect_urls, clientId };
