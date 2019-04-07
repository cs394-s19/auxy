
function SearchSongs(){
document.getElementById("myUL").innerHTML=''
var clientId = 'c6c554d53a714986b9f3141786a18bd3',
    clientSecret = '3fe07453c2474370a5a5c54ba30738b7';

// Create the api object with the credentials
var spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// //Retrieve an access token.
// spotifyApi.clientCredentialsGrant().then(function(data) {
//     console.log('The access token expires in ' + data.body['expires_in']);
//     console.log('The access token is ' + data.body['access_token']);

//     // Save the access token so that it's used in future calls
//     spotifyApi.setAccessToken(data.body['access_token']);
//   }, function(err) {
//         console.log('Something went wrong when retrieving an access token', err);
//   });

// // Get tracks in a playlist
spotifyApi.setAccessToken("BQDOIXhJwjeJOHmDIbDWkw05RTRtjIJpXicjOfI7iuVxBYQnjAE1FMyXjpg-b5_dBuNRYBCQ-0hHZ6qXN4Zj9TN3ZCRyk6o9OkHDBJmTMuyPoPTmk0cAdgC6G9I594QsFetYyvgmLzG7UOTqzt19pNjuUKIWdhK5DDsZEarq56zhkXSUfVl1e1xL");
var input1 = document.getElementById('myInput')
spotifyApi.searchTracks(input1.value)
  .then(function(data) {
    console.log('Search by what u type', data.tracks.items);
    if(data.tracks.items.length!=0){
    for(i=0;i<data.tracks.items.length;i++){
      document.getElementById("myUL").innerHTML+="<li><a href='#'></a></li>"   
    }
    li = document.getElementsByTagName("a");
    for(i=0;i<data.tracks.items.length;i++){
      li[i].innerHTML=data.tracks.items[i].name+='&nbsp&nbsp&nbsp Related Artists:'
      artists=data.tracks.items[i].artists

      for (j=0;j<artists.length;j++){
        li[i].innerHTML+=artists[j].name+='&nbsp&nbsp'
        
      }
    }
  }
  }, function(err) {
    console.error(err);
  });

}