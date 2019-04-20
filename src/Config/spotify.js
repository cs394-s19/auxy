var Spotify = require("spotify-web-api-js");

var clientId = "c6c554d53a714986b9f3141786a18bd3",
  clientSecret = "3fe07453c2474370a5a5c54ba30738b7";

var spotifyApi = new Spotify({
  clientId: clientId,
  clientSecret: clientSecret
});

var spotifyApiToken =
  "BQA3nqmlKm62IF8Ny4mrIw0-R6DU1y0zZ6Cor_71tVLK-g42goQ0tO_YG1bTjo6kBgqGgTSLHiTpKHWUW_jCa7UaJuRkO5_RNgKTMjGwV6h_3JLey0G3uPnnDOVl1hhdcJe5LWb3xFqUnYkxxXhkZp9oV3bLbkeQAA-kH4TH";
export { spotifyApi, spotifyApiToken };
