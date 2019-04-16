import React, { Component } from "react";
import PlayList from "./Components/PlayList/PlayList";
import "./App.css";
import Homepage from "./Components/HomePage/Homepage";
import db from "./Config/db";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: [],
      key: 0,
      HomePage: true,
      PlayList: false,
      CreatePlayList: false,
      JoinPlayList: false
    };
    this.handleHostClick = this.handleHostClick.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    var keys = [];

    db.ref().on("child_added", snap => {
      keys.push(snap.key);
      this.setState({
        keys: keys
      });
    });
  }

  handleHostClick(key) {
    for (var i = 0; i < this.state.keys.length; i++) {
      if (this.state.keys[i] === key) {
        alert("Key Already Exists");
        return null;
      }
    }
    this.setState({ key: key, HomePage: false, PlayList: true });
  }

  handleUserClick(key) {
    for (var i = 0; i < this.state.keys.length; i++) {
      if (this.state.keys[i] === key) {
        this.setState({ key: key, HomePage: false, PlayList: true});
        return;
      }
    }
    alert("Invalied Key");
  }

  handleLogout() {
    this.setState({ key: 0, HomePage: true, PlayList: false })
  }

  render() {
    if (this.state.HomePage)
      return <Homepage onUserClick={this.handleUserClick} onHostClick={this.handleHostClick} />;
    else if (this.state.PlayList)
      return <PlayList playlistKey={this.state.key} onLogout={this.handleLogout} />;
    else
      return;
    // else if (this.state.JoinPlayList)
    //   return <JoinPlayList />;
    // else if (this.state.CreatePlayList)
    //   return <CreatePlayList />;
  }
}

export default App;
