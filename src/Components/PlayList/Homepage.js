import React, { Component } from "react";
import PlayList from "./PlayList";
import { Link,withRouter, Route } from "react-router-dom";
import db from "../../Config/db";


class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keys: [],
      key: 0,
      visible: "block", //visible is used to control whether the host and user button show or not
      showPlayList:false
    };
    this.handleHostClick = this.handleHostClick.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this);
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

  handleUserInput(e) {
    this.setState({ key: e.target.value });
  }

  handleHostInput(e) {
    this.setState({ key: e.target.value });
  }

  handleUserClick(e) {
    for (var i = 0; i < this.state.keys.length; i++) {
      if (this.state.keys[i] === this.state.key) {
        this.setState({ visible: "none",showPlayList:true });
        return;
      }
    }

    alert("Invalied key");
  }

  handleHostClick(e) {
    for (var i = 0; i < this.state.keys.length; i++) {
      if (this.state.keys[i] === this.state.key) {
        alert("Key Already Exists");
        return null;
      }
    }
    this.setState({ visible: "none",showPlayList:true });

  }
  handleLogout(){
    this.setState({visible:'block',showPlayList:false})
  }
  generatePlayList(){
    if(this.state.showPlayList==true){
      return(<div>
        <button onClick={()=>this.handleLogout()}>logOut</button>
        <PlayList playlistKey={this.state.key} />
              
            </div>                                            )
    }

  }
  render() {
    return (
      <div>
        <div style={{ display: this.state.visible }}>
          <div>
            <input onChange={e => {
                this.handleHostInput(e);
              }}/>
            <button onClick={e => {
                this.handleHostClick(e);
              }}>Host</button>
          </div>
          <div>
            <input
              onChange={e => {
                this.handleUserInput(e);
              }}
            />
            <button
              onClick={e => {
                this.handleUserClick(e);
              }}
            >
              Join
            </button>
            
          </div>

        </div>

        <div>{this.generatePlayList()}</div>
      </div>
    );
  }
}

export default withRouter(Homepage);
