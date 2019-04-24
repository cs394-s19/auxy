import React, { Component } from "react";

class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hostKey: 0,
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this);
  }

  handleUserInput(e) {
    this.setState({ userKey: e.target.value });
  }

  handleUserClick() {
    this.props.onJoinKey(this.state.userKey);
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this.props.onBack}>
            back
          </button>
        </div>
        <div>
          <input onChange={e => {this.handleUserInput(e);}}/>
          <button onClick={this.handleUserClick}>Join</button>
        </div>
      </div>
    );
  }
}

export default Join;