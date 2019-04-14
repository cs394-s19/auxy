import React, { Component } from "react";
import Playlist from "./Components/PlayList/PlayList";
import "./App.css";
import Homepage from "./Components/PlayList/Homepage";

class App extends Component {
  constructor(props) {
    super(props); 
  }


  render() {
    return <Homepage/>;
  }
}

export default App;
