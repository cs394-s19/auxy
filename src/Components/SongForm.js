import React, { Component } from "react";
import "../Styles/SongForm.css"
import Search from "@material-ui/icons/Search";

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
          placeholder="* SEARCH FOR A BANGER * . . . !"
          value={this.state.newsongName}
          onChange={this.handleUserInput}
        />
        <button className="songButton" onClick={this.handleSubmit}>
          <Search />
        </button>
      </div>
    );
  }
}

export default SongForm;
