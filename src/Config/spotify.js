var Spotify = require("spotify-web-api-js");

var clientId = "c6c554d53a714986b9f3141786a18bd3",
  clientSecret = "3fe07453c2474370a5a5c54ba30738b7";

var spotifyApi = new Spotify({
  clientId: clientId,
  clientSecret: clientSecret
});

var spotifyApiToken =
  "BQBe1OyR2a8wY10dZ3GlvPWbXb_rTloqPP9Vk4PwxN1rr3PVwH3SCHZBltcayaWgzjcqFIZwf67hwnG9eZqvIsBK59Fc8cAkQslDKte1ZB3oV7tKhz4Eqfw4J2N9_jkSznaDYyKzZrIASjzy3pvYlMVh-NomdXBw7ZsstP3J0g";
export { spotifyApi, spotifyApiToken };
