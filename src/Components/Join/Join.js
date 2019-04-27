import React, { Component } from "react";

class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hostKey: null,
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this);
    this.enterPressed = this.enterPressed.bind(this);
  }

  handleUserInput(e) {
    this.setState({ userKey: e.target.value });
  }

  handleUserClick() {
    this.props.onJoinKey(this.state.userKey);
  }

  enterPressed(e) {
    if (e.key === 'Enter') {
      this.handleUserClick();
    }
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
          <input
            onChange={e => {this.handleUserInput(e);}}
            onKeyPress={this.enterPressed}
          />
          <button onClick={this.handleUserClick}>JOIN</button>
        </div>
      </div>
    );
  }
}

export default Join;