import React, { Component } from "react";
import "../Styles/SongForm.css"
import Search from "@material-ui/icons/Search";
import Modal from "./Modal";
import "./../Styles/modal.css"

class SongForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsongName: "",
      searchResults: [],
      show : false,
    };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserInput(e) {
    this.setState({
      newsongName: e.target.value
    });
    this.setState({
      searchResults: this.props.getTracks(e),
    })
    if (this.state.searchResults.length != 0) {
      this.showModal();
    }
  }

  handleSubmit(e) {
    this.props.addSong(this.state.newsongName);
    this.setState({
      newsongName: ""
    });
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div className="formWrapper">
        {/* <Modal show={this.state.show} handleClose={this.hideModal} results={this.state.searchResults} /> */}
        {this.state.show ? <Modal handleClose={this.hideModal} searchResults={this.state.searchResults} /> : null}
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

// const Modal = ({ handleClose, show, children }) => {
//   const showHideClassName = show ? 'modal display-block' : 'modal display-none';

//   return (
//     <div className={showHideClassName}>
//       <section className='modal-main'>
//         {children}
//         <button
//           onClick={handleClose}
//         >
//           Close
//         </button>
//       </section>
//     </div>
//   );
// };

export default SongForm;
