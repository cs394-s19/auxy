import React, { Component } from "react";
import "../../Styles/Join.css";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Auxy from "../HomePage/Auxy.js";

class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userKey: 0,
      hostKey: null,
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this);
    this.enterPressed = this.enterPressed.bind(this);
  }

  handleUserInput(e) {
    this.setState({ 
      userKey: e.target.value });
  }

  // handleUserInput = e => {
  //   this.setState({
  //     userKey: e.target.value,
  //   });
  // }

  handleUserClick() {
    this.props.onJoinKey(this.state.userKey);
  }

  enterPressed(e) {
    if (e.key === 'Enter') {
      this.handleUserClick();
    }
  }

  render() {
    return (
      <div className='background'>
        <div>
        <button className="np-logout" onClick={this.props.onBack}>
            &lt;
        </button>
        </div>
        <div className = 'join-loc'>
        <div className = 'title-text'>Join a playlist.</div>
        <div>
          <input placeholder='ENTER KEY' className = 'text-input' onChange={this.handleUserInput} onKeyPress={this.enterPressed}/>
        </div>
        <div>
          <StyledButton onClick={this.handleUserClick}>esketit</StyledButton>
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
    width: '120px',
    marginTop: '5px',
    zIndex: '2',
  },
  label: {
    textTransform: 'lowercase',
  },
})(Button);


export default Join;