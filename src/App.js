import React, { Component } from "react";
import Playlist from "./Components/PlayList/PlayList";
import "./App.css";
import Homepage from "./Components/PlayList/Homepage";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      activeKey: null
    };

    this.joinPlaylist = this.joinPlaylist.bind(this);
  }

  joinPlaylist(key) {
    this.setState({ active: true, activeKey: key });
  }
  render() {
    var toRender = this.state.active ? (
      <Playlist playlistKey={this.state.activeKey} />
    ) : (
      <Homepage joinPlaylist={this.joinPlaylist} />
    );
    return <div>{toRender}</div>;
  }
}

export default App;
