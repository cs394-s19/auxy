import React, { Component } from "react";
import "../../Styles/NowPlaying.css"

// Might have to change to class based when we add admin buttons?

class NowPlaying extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currSong: {
        artistName: this.props.currSong.artistName,
        songName: this.props.currSong.songName,
        albumName: this.props.currSong.albumName,
      },
    };
  }

  render(){
    return(
      <div className="np-container">
        <div className="np-imagecontainer"></div>
        <div className="np-info">
          <div className="np-info-songname">{this.props.currSong.songName}</div>
          <div className="np-info-artist">{this.props.currSong.artistName}</div>
        </div>
      </div>
    )
  }
}


export default NowPlaying;


// import React from "react";

// // Might have to change to class based when we add admin buttons?
// const Playlist = ({ currSong }) => {
//   return (
//     <div>
//       <h2 style={{ textDecoration: "underline" }}>Now Playing</h2>
//       <h4>Song: {currSong.songName}</h4>
//       <h4>Artist: {currSong.artistName}</h4>
//       <h4>Album: {currSong.albumName}</h4>
//       <p> ____________________ </p>
//     </div>
//   );
// };

// export default Playlist;
