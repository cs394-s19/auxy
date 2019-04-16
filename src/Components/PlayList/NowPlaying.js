import React, { Component } from "react";
import "../../Styles/NowPlaying.css";

// Might have to change to class based when we add admin buttons?
const NowPlaying = ({ currSong, nextSong }) => {
  return (
    <div className="np-container">
      <div className="np-imagecontainer">
        {" "}
        {currSong.songAlbum !== "N/A" ? (
          <img src={currSong.songAlbum} width="100%" aref="Song Album" />
        ) : (
          ""
        )}
      </div>
      <div className="np-info">
        <div className="np-info-songname">{currSong.songName}</div>
        <div className="np-info-artist">{currSong.songArtist}</div>
        <button style={{ marginBottom: "10px" }} onClick={nextSong}>
          Next Song
        </button>
      </div>
    </div>
  );
};

export default NowPlaying;
