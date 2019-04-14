import React, { Component } from "react";
import PlayList from "./PlayList";
import {withRouter,Route} from 'react-router-dom'



function NewHomepage(props){
 
  return(<PlayList AccessKey={props.match.params.key}/>)
  //pass the accesskey to playlist
}


class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keys:['123'],
      key:1234,
      visible:'block'//visible is used to control whether the host and user button show or not
    };
    this.handleHostClick=this.handleHostClick.bind(this)
    this.handleUserClick=this.handleUserClick.bind(this)
   
  }

  handleUserInput(e){
    this.setState({key:e.target.value})
  }

  handleHostInput(e){
    this.setState({key:e.target.value})
  }

  handleUserClick(e){

    for(var i=0;i<this.state.keys.length;i++){
      if(this.state.keys[i]===this.state.key){
        this.setState({visible:'none'})
        this.props.history.push({pathname:'NewHomepage',params:{key:this.state.key}})
        
        return;
        }
    }
    
    alert('Invalied key')
     
  }

  handleHostClick(e){

    for(var i=0;i<this.state.keys.length;i++){
      if(this.state.keys[i]===this.state.key){
        alert('Key Already Existed')
        return null;
        }
      
    }
    this.setState({visible:'none'})
    this.props.history.push({pathname:'NewHomepage',params:{key:this.state.key}})

  }


  render() {
    
    return (
      <div>
        <Route path="/NewHomepage" component={NewHomepage} />   
        <div style={{display:this.state.visible}}>
        <div>
        <input onChange={e => {this.handleHostInput(e);}}/> 
        <button onClick={e => {this.handleHostClick(e);}}>Host</button>
        </div>
        <div>
        <input onChange={e => {this.handleUserInput(e);}}/> 
        <button onClick={e => {this.handleUserClick(e);}}>Join</button>
        </div>
        </div>
        

      </div>
    );
    
  }

}

export default withRouter(Homepage);