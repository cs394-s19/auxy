import React, { Component } from "react";
import SongBlock from "./SongBlock";

import "../../Styles/SongList.css";

class SongList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songList: this.props.songList
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.songlist !== this.state.songList;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.songList !== this.state.songList) {
      this.setState({ songList: nextProps.songList });
    }
  }

  render() {
    if (this.state.songList.length < 1) {
      return (
        <div style={{marginTop: "20px"}}>
          No songs in queue <br />
          <br />
        </div>
      );
    } else {
      return this.state.songList.map((song, id) => {
        return (
          <div className="sl-container">
            <SongBlock
              key={id}
              songName={song.songName}
              songArtist={song.songArtist}
              songScore={song.songScore}
              songId={song.songId}
              playlistKey={this.props.playlistKey}
              uid={this.props.uid}
              admin={this.props.admin}
            />
          </div>
        );
      });
    }
  }
}

export default SongList;
