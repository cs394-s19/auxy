import React, { Component } from "react";
import PlayList from "./Components/PlayList/PlayList";
import "./App.css";
import Homepage from "./Components/HomePage/Homepage";
import Host from "./Components/Host/Host";
import Join from "./Components/Join/Join";
import app from "./Config/db";
import "firebase/auth";

const db = app.database();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: [],
      key: 0,
      HomePage: true,
      PlayList: false,
      Host: false,
      Join: false,
      uid: null
    };

    this.handleClickHost = this.handleClickHost.bind(this);
    this.handleClickJoin = this.handleClickJoin.bind(this);

    this.handleHostClick = this.handleHostClick.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    // localStorage.getItem("key") &&
    //   this.setState({
    //     key: JSON.parse(localStorage.getItem("key")),
    //     HomePage: JSON.parse(localStorage.getItem("HomePage")),
    //     PlayList: JSON.parse(localStorage.getItem("PlayList")),
    //     CreatePlayList: JSON.parse(localStorage.getItem("CreatePlayList"))
    //   });

    app.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          var uid = user.uid;
          console.log(uid);
          this.setState({
            uid: uid
          });
        } else {
          app
            .auth()
            .signInAnonymously()
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // ...
            });
        }
      }.bind(this)
    );
  }

  componentDidMount() {
    var keys = [];

    db.ref("playlists").on("child_added", snap => {
      keys.push(snap.key);
      this.setState({
        keys: keys
      });
    });
  }

  handleClickHost() {
    this.setState({
      HomePage: false,
      Host: true
    });
  }

  handleClickJoin() {
    this.setState({
      HomePage: false,
      Join: true
    });
  }

  handleHostClick(key) {
    for (var i = 0; i < this.state.keys.length; i++) {
      if (this.state.keys[i] === key) {
        alert("Key Already Exists");
        return null;
      }
    }

    db.ref("playlists/" + key + "/host").set({
      hostUID: this.state.uid
    });

    this.setState({ key: key, HomePage: false, PlayList: true });

    // this.setState({ key: key, HomePage: false, PlayList: true }, () => {
    //   localStorage.setItem("key", key);
    //   localStorage.setItem("HomePage", false);
    //   localStorage.setItem("PlayList", true);
    // });
  }

  handleUserClick(key) {
    for (var i = 0; i < this.state.keys.length; i++) {
      if (this.state.keys[i] === key) {
        this.setState({ key: key, HomePage: false, PlayList: true });
        // this.setState({ key: key, HomePage: false, PlayList: true }, () => {
        //   localStorage.setItem("key", key);
        //   localStorage.setItem("HomePage", false);
        //   localStorage.setItem("PlayList", true);
        // });
        return;
      }
    }
    alert("Invalied Key");
  }

  handleLogout() {
    this.setState({ key: 0, HomePage: true, PlayList: false });
    // this.setState({ key: 0, HomePage: true, PlayList: false }, () => {
    //   localStorage.setItem("key", 0);
    //   localStorage.setItem("HomePage", true);
    //   localStorage.setItem("PlayList", false);
    // });
  }

  render() {
    if (this.state.HomePage)
      return (
        <Homepage
          onClickHost={this.handleClickHost}
          onClickJoin={this.handleClickJoin}
        />
      );

    else if (this.state.Host)
      return (
        <Host 
        />
      );

    else if (this.state.Join)
      return (
        <Join 
        />
      );

    else if (this.state.PlayList)
      return (
        <PlayList
          playlistKey={this.state.key}
          onLogout={this.handleLogout}
          uid={this.state.uid}
        />
      );
    else return;
  }
}

export default App;
