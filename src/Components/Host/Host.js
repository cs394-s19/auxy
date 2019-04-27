import React, { Component } from "react";

class Host extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hostKey: null,
    };
    this.handleHostInput = this.handleHostInput.bind(this);
    this.handleHostClick = this.handleHostClick.bind(this);
    this.enterPressed = this.enterPressed.bind(this);
  }

  handleHostInput(e) {
    this.setState({ hostKey: e.target.value });
  }

  handleHostClick() {
    if (this.state.hostKey === null || this.state.hostKey === '') {
      alert("No Key Detected");
    }
    else {
      this.props.onHostKey(this.state.hostKey);
    }
  }

  enterPressed(e) {
    if (e.key === 'Enter') {
      this.handleHostClick();
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
            onChange={e => {this.handleHostInput(e);}}
            onKeyPress={this.enterPressed}
          />
          <button onClick={this.handleHostClick}>HOST</button>
        </div>
      </div>
    );
  }
}

export default Host;