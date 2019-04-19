var Spotify = require("spotify-web-api-js");

var clientId = "c6c554d53a714986b9f3141786a18bd3",
  clientSecret = "3fe07453c2474370a5a5c54ba30738b7";

var spotifyApi = new Spotify({
  clientId: clientId,
  clientSecret: clientSecret
});

var spotifyApiToken =
  "BQAyqc1qA9WEHUWQbB4LKambDWdmsJyQOf9fmhsOcofwwDxBW2qvPbsIC2omnq1aUlrP6HE8dFBlUZE9af-LNRhGhZXjacgnj3Cr_obxHfTS7h-Oxe1oP7WRYpRzUQ0OOPXeKCnpZQe4Im32zEEh4MHK7XJb6dCSO8SquUvbJg";
export { spotifyApi, spotifyApiToken };
