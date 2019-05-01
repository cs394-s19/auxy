import React, { Component } from "react";
import "../../Styles/Join.css";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Auxy from "../HomePage/Auxy.js";
import * as SpotifyFunctions from "../PlayList/spotifyFunctions";


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
      this.redirectSpotify();
      this.props.onHostKey(this.state.hostKey);
    }
  }

  enterPressed(e) {
    if (e.key === 'Enter') {
      this.handleHostClick();
    }
  }

  redirectSpotify(){
    window.location = SpotifyFunctions.redirectUrlToSpotifyForLogin();
  }

render() {
  return (
    <div className='background'>
      <div>
      <button className="np-logout1" onClick={this.props.onBack}>
          &lt;
      </button>
      </div>
      <div className = 'join-loc'>
      <div className = 'title-text'>Host a playlist.</div>
      <div>
        <input placeholder='ENTER KEY' className = 'text-input' onChange={this.handleHostInput} onKeyPress={this.enterPressed}/>
      </div>
      <div>
        <StyledButton onClick={this.handleHostClick}>sicko mode</StyledButton>
     </div>
      </div>
    </div>
  );
}
}

const StyledButton = withStyles({
root: {
  background: 'linear-gradient(45deg, rgba(252, 109, 139,0.8) 30%, rgba(253, 141, 91 ,0.8) 90%)',
  borderRadius: 48,
  border: 0,
  color: 'white',
  height: '48px',
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  width: '135px',
  marginTop: '5px',
  zIndex: '2',
},
label: {
  textTransform: 'lowercase',
},
})(Button);


export default Host;