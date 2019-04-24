import React, { Component } from "react";
// import { Link,withRouter, Route } from "react-router-dom";


class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hostKey: 0,
      userKey: 0
    };
    this.handleHostInput = this.handleHostInput.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleHostClick = this.handleHostClick.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this);
  }

  handleHostInput(e) {
    this.setState({ hostKey: e.target.value });
  }

  handleUserInput(e) {
    this.setState({ userKey: e.target.value });
  }

  handleHostClick() {
    this.props.onHostClick(this.state.hostKey);
  }

  handleUserClick() {
    this.props.onUserClick(this.state.userKey);
  }

  render() {
    return (
      <div>
        <div>
          <input onChange={e => {this.handleHostInput(e);}}/>
          <button onClick={this.handleHostClick}>Host</button>
        </div>
        <div>
          <input onChange={e => {this.handleUserInput(e);}}/>
          <button onClick={this.handleUserClick}>Join</button>
        </div>
      </div>
    );
  }
}

// export default withRouter(Homepage);
export default Join;