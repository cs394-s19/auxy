import React, { Component } from "react";
// import { Link,withRouter, Route } from "react-router-dom";


class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 0,
    };
    this.handleHostInput = this.handleHostInput.bind(this);
    this.handleUserInput = this.handleHostInput.bind(this);
    this.handleHostClick = this.handleHostClick.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this);
  }

  handleHostInput(e) {
    this.setState({ key: e.target.value });
  }

  handleUserInput(e) {
    this.setState({ key: e.target.value });
  }

  handleHostClick() {
    this.props.onHostClick(this.state.key);
  }

  handleUserClick() {
    this.props.onUserClick(this.state.key);
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
export default Homepage;