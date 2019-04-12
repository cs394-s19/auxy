import React, { Component } from "react";
import Playlist from "./Components/PlayList/PlayList";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Playlist key={1234} />
      </div>
    );
  }
}

export default App;
