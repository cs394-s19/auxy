import React, { Component } from "react";
import "../Styles/SongForm.css"
import Search from "@material-ui/icons/Search";

class SongForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsongName: "",
      results: [],
    };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserInput(e) {
    this.setState({
      newsongName: e.target.value,
    });

    let searchResults = this.props.getTracks(e.target.value);
    if (e.target.value != null && e.target.value != '') {
      this.setState({results: searchResults});
      this.props.setSearchResults(searchResults);
      this.props.showResult();
    }
    else {
      this.props.hideResult();
    }
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
