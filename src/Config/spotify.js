var Spotify = require("spotify-web-api-js");

var clientId = "c6c554d53a714986b9f3141786a18bd3",
  clientSecret = "3fe07453c2474370a5a5c54ba30738b7";

var spotifyApi = new Spotify({
  clientId: clientId,
  clientSecret: clientSecret
});

var spotifyApiToken = "BQD2y9oOAgwTgs7cHctUw2irEZY2_OGEpMwfvy8eOO-U56HvvU4LHNcg8isDPLenEbDK7rFdXGvVkbgRuYiGPOl-2jtoKMb2ZoXk0As38Hu7oDo_5I5OvI0HVSyuew6hS3XLUHAe0TaxZpJp6tA-bmR25UUYk_-_";

export {spotifyApi, spotifyApiToken};
