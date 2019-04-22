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
  "BQBx2-e8B4YUyolHCV0iOroKu-KJ3I30hkowdwL27qmD8XkFip606KvxY9wmAbwJElP0wPlh-REvShNOXe5jQ4BWyOSx-Et2PFdCmLVPoQ-PUraDbKovMrmPh8mrLE2iLHl7FWlPJYakQV69Fa1v7Zv1nOczUXFX7go0CIV3";
export { spotifyApi, spotifyApiToken, redirect_urls, clientId };
