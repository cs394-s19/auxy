import React, { Component } from "react";

// Might have to change to class based when we add admin buttons?
const NowPlaying = ({ currSong, nextSong }) => {
  return (
    <div>
      <h2 style={{ textDecoration: "underline" }}>Now Playing</h2>
      <h4>Song: {currSong.songName}</h4>
      <h4>Artist: {currSong.songArtist}</h4>
      <h4>Album: {currSong.songAlbum}</h4>
      <button onClick={nextSong}>NEXT SONG</button>
      <p> ____________________ </p>
    </div>
  );
};

export default NowPlaying;
