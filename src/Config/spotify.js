var Spotify = require("spotify-web-api-js");

var clientId = "c6c554d53a714986b9f3141786a18bd3",
  clientSecret = "3fe07453c2474370a5a5c54ba30738b7";

var spotifyApi = new Spotify({
  clientId: clientId,
  clientSecret: clientSecret
});

var spotifyApiToken =
  "BQDfEJiHZe53ZnudcJ_MnMHRxQ9Xk8TyZnD29vpSXBhGdU_1ZGM3zVzG8zNvsZ_ASmpOeUERS5AFbiEFdXFVIvHA3la3frZ70jh7jsDuZk5zu-QT3v1RhxCpma4CdE-UTSzt96eNuPnkFEv_lXeWTKl-U75bidsrXvjk5mO9Fg";
export { spotifyApi, spotifyApiToken };
