var Spotify = require("spotify-web-api-js");

var clientId = "c6c554d53a714986b9f3141786a18bd3",
  clientSecret = "3fe07453c2474370a5a5c54ba30738b7";

var spotifyApi = new Spotify({
  clientId: clientId,
  clientSecret: clientSecret
});

var spotifyApiToken =
  "BQA-fUjqlc0sn3wyYA4qpcfYbaMETZcbOtk_kIRe9EbGUlrmAFL9SIDZBW0aj5kv5thlJ169qqBOamLZ-y2_cNaGeHFHiBkZyULfanQKqtHjDOSVlysAupanFpBZJH0B3_HOxTIdgArKGjHRE4Sdg3gPDfLVGvFOdz_2oYIy";
export { spotifyApi, spotifyApiToken };
