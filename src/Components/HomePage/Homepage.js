import React, { Component } from "react";
import "../../Styles/Homepage.css";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Auxy from "./Auxy.js";


class Homepage extends Component {
  render() {
    return (
      <div className='background'>
        <div className='top-circle'></div>
        <div className='bottom-circle'></div>
        <div className='welcome-container'>
          <div className='meet-text'>MEET</div>
          <Auxy transform="scale(3.7,3.7)" className = "auxy-text"
           /> 
          
          <div className='sub-text'>a playlist for your occasion, by your occasion</div>
          <StyledButton onClick={this.props.onClickHost}>HOST</StyledButton>
          <StyledButton onClick={this.props.onClickJoin}>JOIN</StyledButton>
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
    marginTop: '15px',
    marginRight: '18px',
    zIndex: '2',
  },
  // label: {
  //   textTransform: 'lowercase',
  // },
})(Button);

export default Homepage;
