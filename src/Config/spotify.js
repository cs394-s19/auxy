var Spotify = require("spotify-web-api-js");

var clientId = "c6c554d53a714986b9f3141786a18bd3",
  clientSecret = "3fe07453c2474370a5a5c54ba30738b7";

var spotifyApi = new Spotify({
  clientId: clientId,
  clientSecret: clientSecret
});

var spotifyApiToken =
  "BQBTw714PaSXSv-iKyKXY5_lEzSMJ8Kw-45HVBSmRKd_rsJRgPe8cUSgLGM-fQkryuWPGd40aDwYQTRux0ddHo7nYiqbWGD05jv3tqwznPO_HWpzJL9e9E6BkIpN4chELHeGAopd5Gbh726O-taEPshP80jYXPhSQ1RpGIdw";
export { spotifyApi, spotifyApiToken };
