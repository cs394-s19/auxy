import React from "react";

// Might have to change to class based when we add admin buttons?
const Playlist = ({ currSong }) => {
  return (
    <div>
      <h2 style={{ textDecoration: "underline" }}>Now Playing</h2>
      <h4>Song: {currSong.songName}</h4>
      <h4>Artist: {currSong.artistName}</h4>
      <h4>Album: {currSong.albumName}</h4>
      <p> ____________________ </p>
    </div>
  );
};

export default Playlist;
