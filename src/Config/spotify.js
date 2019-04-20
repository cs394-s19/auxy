var Spotify = require("spotify-web-api-js");

var clientId = "c6c554d53a714986b9f3141786a18bd3",
  clientSecret = "3fe07453c2474370a5a5c54ba30738b7";

var spotifyApi = new Spotify({
  clientId: clientId,
  clientSecret: clientSecret
});

var spotifyApiToken =
  "BQCndQigne14QfZ4kL9OQHN61Umb9OOdeEY5SorUCYgjEkq1VzySjTKX-PT-mlj1SMSi1WxjEsrftB19HJ-1DzaLYRnjBIl3uY4fHebvp-p0dumbwwgxlWBs_OIJOxHCB5hksZs3aHpTNr-anVCjRYPH3B7BQNniHLGSb40I";
export { spotifyApi, spotifyApiToken };
