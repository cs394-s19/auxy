import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "../Styles/modal.css"

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handleClose: props.handleClose,
      show: props.show,
      searchResults: props.searchResults,
    };
  }

  componentWillMount() {

  }

  render(){
    let showHideClassName = this.state.show ? "modal display-block" : "modal display-none";
    let resultList = this.state.searchResults.map((result, i) => {
      return <li key={i}>{result}</li>;
    });

    return (
      <div>
        <ul>{resultList}</ul>
      </div>
    );

    // return (
    //   <div className={showHideClassName}>
    //     <ul>{resultList}</ul>
    //     <section className="modal-main">
    //       <button onClick={this.state.handleClose}>close</button>
    //     </section>
    //   </div>
    // );
  }
}

export default Modal;

