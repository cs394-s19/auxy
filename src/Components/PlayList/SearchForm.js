import React, { Component } from 'react';
import "./Styles/SearchForm.css"

import "./"


var Spotify = require("spotify-web-api-js");
var clientId = "c6c554d53a714986b9f3141786a18bd3",
  clientSecret = "3fe07453c2474370a5a5c54ba30738b7";

var spotifyApi = new Spotify({
  clientId: clientId,
  clientSecret: clientSecret
});
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

class SearchForm extends Component {
  constructor(props){
    super(props)
    this.state={
      results:[1,2,3],
      load:0, 
      numberofBox:0 
 
  }

  this.handleUserClick=this.handleUserClick.bind(this)
  this.renderResults=this.renderResults.bind(this)
  this.handle=this.handleUserClick.bind(this)
  this.renderSearchBox=this.renderSearchBox.bind(this)
  
  }


  handleUserInput(e){
    var songList=[]
    songList=this.getTracks(e.target.value)
    sleep(300).then(()=>{
      this.setState({
      results:songList
      
    })

    })


  }

  handleUserClick(e){
      // related to play music or sth, when you choose a song...
  }

  getTracks(input) {
    spotifyApi.setAccessToken(
      "BQA7ipfvHnHbDDz59NEdtvgNGyMJFf2fTSPhigkizSRYBBuxDpZnCya59RbqO-3n5Mo3aOaaBZQUc7WbfGLZHsgh5tWhvMSZC7e-lRxY550wNP278b-ELHdi2tJIbjLniGLacxfO2i_ytZJ-CJQnPmEmejLawxko1lHYywb5NiSOTJfjiapRlHI3"
    );
    var input1 = input;
    // console.log(input1)
    var artists = [];
    var names = [];
    spotifyApi.searchTracks(input1, { market: ["US"] }).then(
      function(data) {
        // console.log('Search by what u type', data.tracks.items);
        if (data.tracks.items.length != 0) {
          for (let i = 0; i < data.tracks.items.length; i++) {
            artists[i] = data.tracks.items[i].artists;
            names[i] = data.tracks.items[i].name;
          }
        }
      },
      function(err) {
        console.error(err);
      }
    );
    // console.log(names);
    return names;
  }



  renderSearchBox(){
    return(
      <div ><input className='myInput' onChange={(e)=>{this.handleUserInput(e)}}/></div>
    )
  }


  renderResults(results){

    return (
    <div>
      {results.map((result, index) => (
        <div>
          <button className='songResult' onClick={(e)=>{this.handleUserClick(e)}}>{result}</button>
        </div>

      ))
    }
    </div>
    );

  }

  render(){
    return (
      <div>
      <div>{this.renderSearchBox()}</div>
      <div>{this.renderResults(this.state.results)}</div>
      </div>
    )
  }
 
}



export default App




