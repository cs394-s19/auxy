import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "../Styles/modal.css"

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: props.searchResults,
    };
  }

  componentWillMount() {

  }

  render(){
    var resultList = this.state.searchResults.map((result, i) => {
      return <li key={i}>{result}</li>;
    });

    return (
      <div>
        <ul>{resultList}</ul>
      </div>
    );
  }
}

export default Modal;

