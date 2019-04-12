import React, { Component } from "react";
import ResultSong from "./ResultSong";
import spotifyApi from "../../Config/spotify";

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };

    this.renderResults = this.renderResults.bind(this);
    this.renderSearchBox = this.renderSearchBox.bind(this);
  }

  handleUserInput(e) {
    var songList = [];
    if (e.target.value !== "") {
      songList = this.getTracks(e.target.value);
      sleep(300).then(() => {
        this.setState({
          results: songList
        });
      });
    } else {
      this.setState({
        results: songList
      });
    }
  }

  getTracks(input) {
    spotifyApi.setAccessToken(
      "BQDID3YAusev__fcUibbJi8GIFP8KdRAspWUCVQnZFT2L4hLv8UjQJJ7cehpbEPiSPoxOU8fzm5XssNPHb_t1FmD1OGrO7J6VQfDkWexWSNtIA-Bogp95y6Y88FF5rcgVRKBs2JBjrzb82lISgRx7IaSoyTEicJIgXP1_YCW_A"
    );
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

  renderResults(results) {
    return (
      <div>
        {results.map((result, index) => {
          return <ResultSong key={index} result={result} />;
        })}
      </div>
    );
  }

  render() {
    var header;
    if (this.state.results.length > 0) {
      header = <h3>Search Results</h3>;
    }
    return (
      <div>
        <div>{this.renderSearchBox()}</div>
        <div>
          {header}
          {this.renderResults(this.state.results)}
        </div>
      </div>
    );
  }
}

export default SearchForm;
