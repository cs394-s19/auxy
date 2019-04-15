var Spotify = require("spotify-web-api-js");

var clientId = "c6c554d53a714986b9f3141786a18bd3",
  clientSecret = "3fe07453c2474370a5a5c54ba30738b7";

var spotifyApi = new Spotify({
  clientId: clientId,
  clientSecret: clientSecret
});

var spotifyApiToken =
  "BQALVBC7kDxWHek48co8q9i1FewlnQJcWGZ2rZLG5oZdVMmpPOYhoeKTDj3_S36KBoZYaIvFIGxTxY_19ZcS31kp7dH3p640fqkGKm6v91YUIX6tIx9VTpOfxyL6sMirRdnXWOD5-OzN_kme8PjzxtI5dOQki3swzN5j_xUwHA";
export { spotifyApi, spotifyApiToken };
