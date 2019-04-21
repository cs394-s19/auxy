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
  "BQA9-PBhB8jTWEQDWF64ddbiJ1u_yOz31K6i9C9jTy9OfAZ3EXOcaeQT0RQ26kcQcRAyVQmhi4N60fdgiItuVcRWLvZKV1rA8HCdg9TEFMiWE0xQ3FBdnSjqjJwLaZeUh3eFoWLgaCu31O84ub0T_hWi7hHbacsp1-px2cCd";
export { spotifyApi, spotifyApiToken, redirect_urls, clientId };
