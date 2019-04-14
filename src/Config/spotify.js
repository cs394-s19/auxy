var Spotify = require("spotify-web-api-js");

var clientId = "c6c554d53a714986b9f3141786a18bd3",
  clientSecret = "3fe07453c2474370a5a5c54ba30738b7";

var spotifyApi = new Spotify({
  clientId: clientId,
  clientSecret: clientSecret
});

var spotifyApiToken =
  "BQBo6vwoI1OC8mJMZrVrJoKVkJrdqnLyr206AQxFNWSZx421huU4rlDW4rxamEk532Fm6IrWlImEudBK4bCEbX-NmKWtVhnp20KzzMffQHYPEfR_LMXU7INrQJMRYIqDZSP-mEIWqyRUWi7HROO7JJqk97sekESiJh-fTqOYnw";

export { spotifyApi, spotifyApiToken };
