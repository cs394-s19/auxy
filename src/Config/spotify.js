var Spotify = require("spotify-web-api-js");

var clientId = "c6c554d53a714986b9f3141786a18bd3",
  clientSecret = "3fe07453c2474370a5a5c54ba30738b7";

var spotifyApi = new Spotify({
  clientId: clientId,
  clientSecret: clientSecret
});

var spotifyApiToken =
  "BQC9cE2Yv19MIIAEuQSky8fGnB9Q573vCx7YpBtN999v0hHpdV8tyhEaf0ns1xir08l18ZlZjRBM976cPTJXXemAXvjsQe6k-FTG5zmBZPL28f-QDDli88URvEdXaGjEykh7v971zuhLTKb2tyx53CBE7Tsu-wveGuNevnaOvg";
export { spotifyApi, spotifyApiToken };
