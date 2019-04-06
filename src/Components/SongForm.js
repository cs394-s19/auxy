import React, { Component } from "react";

class SongForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsongName: ""
    };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserInput(e) {
    this.setState({
      newsongName: e.target.value
    });
  }

  handleSubmit(e) {
    this.props.addSong(this.state.newsongName);
    this.setState({
      newsongName: ""
    });
  }
  render() {
    return (
      <div className="formWrapper">
        <input
          className="songInput"
          placeholder="Write a new song"
          value={this.state.newsongName}
          onChange={this.handleUserInput}
        />
        <button className="songButton" onClick={this.handleSubmit}>
          Add song
        </button>
      </div>
    );
  }
}

export default SongForm;
