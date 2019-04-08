import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "../Styles/modal.css"

class Modal extends Component {
  constructor(props) {
    super(props);
    // this.handleClose = props.handleClose
    // this.show = props.show
    // this.children = props.children
    this.state = {
      handleClose: props.handleClose,
      show: props.show,
      children: props.children,
      searchNames: props.searchNames
    };
  }

  componentWillMount() {

  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render(){
    let showHideClassName = this.state.show ? "modal display-block" : "modal display-none";
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {this.children}
          <button onClick={this.state.handleClose}>close</button>
        </section>
      </div>
    );
  }
}

export default Modal;

