var Spotify = require("spotify-web-api-js");

var clientId = "c6c554d53a714986b9f3141786a18bd3",
  clientSecret = "3fe07453c2474370a5a5c54ba30738b7";

var spotifyApi = new Spotify({
  clientId: clientId,
  clientSecret: clientSecret
});

var redirect_urls = {
  development_url: "localhost:3000/",
  pruduction_url: "https://auxy-8d8d5.firebaseapp.com/"
}

var spotifyApiToken =
  "BQBOaUJXhHbwPmKYRXf7BgMXkikZlWBxAnuuEa8iBAVhuqFK-10NaaSXwzYs0y_goaRnyM6Kq7utNC0Hh8dQ-Su0-GiMJt4USMpZU6n2282BN7yLmdUtCPwBUWshA1Kt4STgWm4CG9MvmGMIV5Oo6nXQDWaTLyQ7--stzk9I";
export { spotifyApi, spotifyApiToken, redirect_urls };
