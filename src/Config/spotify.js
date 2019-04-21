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
  "BQALs7VqxqlZ0uB7UPKTbsuDR8FurDL2bb1oIYMaxc1Zjttm4aEuwuGcERPo8sB4NWq0Mdnfk3JIs42gyZfdXl-ZY2AdLSR4MOiu5M9zsjPmFoNNtYJOZfZ2rZfa4qT-RqyFfKqHTKZg2U7CBInxuPp9vGRxX4dn2vXL4jZW";
export { spotifyApi, spotifyApiToken, redirect_urls, clientId };
