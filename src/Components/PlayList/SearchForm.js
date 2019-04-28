import React, { Component } from "react";
import ResultSong from "./ResultSong";
import { spotifyApi, spotifyApiToken } from "../../Config/spotify";
import "../../Styles/SearchForm.css";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

import app from "../../Config/db";
const db = app.database();

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      isSearchOpen: false,
      token: "."
    };

    this.renderResults = this.renderResults.bind(this);
    this.renderSearchBox = this.renderSearchBox.bind(this);
  }

  componentDidMount() {
    // Load token when loading first time
    db.ref("playlists/" + this.props.playlistKey + "/spotifyToken").on(
      "child_added",
      snap => {
        this.setState({ token: snap.val() });
      }
    );

    // Load token when token changes
    db.ref("playlists/" + this.props.playlistKey + "/spotifyToken").on(
      "child_changed",
      snap => {
        this.setState({ token: snap.val() });
      }
    );
  }

  handleUserInput(e) {
    var songList = [];
    console.log("herewego ");
    if (e.target.value !== "") {
      songList = this.getTracks(e.target.value);
      sleep(800).then(() => {
        this.setState({
          results: songList
        });
      });
    } else {
      sleep(500).then(() => {
        this.setState({
          results: []
        });
      });
    }
  }

  getTracks(input) {
    if (!this.state.token) {
      console.log("No token found");
      return;
    }
    spotifyApi.setAccessToken(this.state.token);
    var input1 = input;
    // console.log(input1)
    var allSongInfo = [];
    spotifyApi.searchTracks(input1, { market: ["US"] }).then(
      function(data) {
        // console.log('Search by what u type', data.tracks.items);
        // Need better way of doing this. Tried splicing but scope was wrong and I'm too tired to think it through rn
        if (data.tracks.items.length !== 0) {
          for (let i = 0; i < data.tracks.items.length; i++) {
            allSongInfo[i] = data.tracks.items[i];
            if (i === 9) {
              break;
            }
          }
        }
      },
      function(err) {
        console.error(err);
      }
    );

    return allSongInfo;
  }

  renderSearchBox() {
    return (
      <div>
        <input
          className="myInput"
          onChange={e => {
            this.handleUserInput(e);
          }}
          placeholder="Search for a BANGER"
        />
      </div>
    );
  }
  handleSearchButton() {
    if (this.state.isSearchOpen == false) {
      this.setState({ isSearchOpen: true });
    } else {
      this.setState({ isSearchOpen: false });
    }
  }
  renderResults(results) {
    return (
      <div>
        {results.map((result, index) => {
          return (
            <ResultSong
              playlistKey={this.props.playlistKey}
              key={index}
              result={result}
              onClickSong={() => this.setState({ isSearchOpen: false })}
            />
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <div style={{ zIndex: "6" }} className="search-container">
        <SlidingPane
          style={{ backgroundcolor: "white" }}
          isOpen={this.state.isSearchOpen}
          title="Add a Banger"
          from="bottom"
          width="100%"
          onRequestClose={() => this.setState({ isSearchOpen: false })}
          ariaHideApp={false}
        >
          <div>
            {this.renderSearchBox()}
            {this.renderResults(this.state.results)}
          </div>
        </SlidingPane>
        <button
          className="search-button"
          onClick={() => this.handleSearchButton()}
        >
          ADD A BANGER
        </button>
      </div>
    );
  }
}

export default SearchForm;
