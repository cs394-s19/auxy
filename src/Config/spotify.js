var Spotify = require("spotify-web-api-js");

var clientId = "21132691864e495baeae18c21df7f579",
  clientSecret = "2388108510ef4b1b92bc2b701635b972";

var spotifyApi = new Spotify({
  clientId: clientId,
  clientSecret: clientSecret
});

var redirect_urls = {
  development_url: "http://localhost:3000/",
  pruduction_url: "https://auxy-8d8d5.firebaseapp.com/"
}

var spotifyApiToken =
  "BQBngwUwoq0EylY1Z8vGpV3SqUS-DOvUISzeaFtMzBuLLHlptJbHIOKfsXZ8PyBdw_dFw4GQK7gBK_A3QX0McpVlenzJhHihbkIqJXtvQLFLfQYrDVxQl-0pCv5_L1W_dvAitaBz8CFCSIMtLIz_zpEEoWXpganp3fUhmVOlW7gIOhYsza9p4jnDG8r2M4sAOPgB340T8tuUxVOkqbN9E5mnA4c8l6h6zyUuhJIp2MwvAqyyGW7_ugURw025z7IIgwAchlTgPuCOPQ";
export { spotifyApi, spotifyApiToken, redirect_urls, clientId };
