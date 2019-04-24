import React, { Component } from "react";

class Host extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hostKey: 0,
    };
    this.handleHostInput = this.handleHostInput.bind(this);
    this.handleHostClick = this.handleHostClick.bind(this);
  }

  handleHostInput(e) {
    this.setState({ hostKey: e.target.value });
  }

  handleHostClick() {
    this.props.onHostKey(this.state.hostKey);
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
          <input onChange={e => {this.handleHostInput(e);}}/>
          <button onClick={this.handleHostClick}>Host</button>
        </div>
      </div>
    );
  }
}

export default Host;