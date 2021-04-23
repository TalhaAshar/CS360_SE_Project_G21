import React, { Component } from "react";
import { render } from "react-dom";
import axios from 'axios';
import SignUpFeedbackPopup from '../functionality/SignUpFeedbackPopup';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class App extends Component{
  
constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { username:' ', email:' ', password:' ', seen: false, invalid: false };
}

togglePop = () => {
  this.setState({
    seen: !this.state.seen
  })
}

handleChange = (event) =>{
    this.setState({ [event.target.name]:event.target.value });
}

handleSubmit = (event) =>{
  event.preventDefault();
  const data = { username:this.state.username, email:this.state.email, password:this.state.password };
  
  axios.post(`api/register/signup`, { data })
    .then(res => this.setState({ seen:true }))
    .catch(error => this.setState({ invalid:true }))
    .then(response => console.log('Success', response));
  }
    
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <span style={{color: "#583192"}}>Username*</span> <br/>
        <input type="text" required name="username" placeholder="Between 8 to 32 characters." minLength="8" maxLength="32" style={{padding:"10px", width: "380px", height: "45px", fontSize: "24px", borderColor: "#2F80ED", borderRadius: "14px", outline: "none"}} onChange={this.handleChange} /><br/>
        <span style={{color: "#583192"}}>Email*</span> <br/>
        <input type="text" required name="email" placeholder="Up to 150 characters" maxLength="150" style={{padding:"10px", width: "380px", height: "45px", fontSize: "24px", borderColor: "#2F80ED", borderRadius: "14px", outline: "none"}} onChange={this.handleChange} /><br/>
        <span style={{color: "#583192"}}>Password*</span> <br/>
        <input type="password" required name="password" placeholder="Between 8 to 32 characters." minLength="8" maxLength="32"  style={{padding:"10px", width: "380px", height: "45px", fontSize: "24px", borderColor: "#2F80ED", borderRadius: "14px", outline: "none"}} onChange={this.handleChange} /><br/>
        { this.state.invalid && <span style={{color: "#FF0000", position: "absolute"}}>Username or Email are already taken.</span> }
        <input type="submit" value="Sign Up" style={{width: "160px", height: "70px", position: "relative", marginTop: "95px", marginLeft: "220px", fontSize: "24px", color: "#FFFFFF", backgroundColor: "transparent", borderRadius: "7px", borderColor: "#FFFFFF"}}/>
        { this.state.seen ? <SignUpFeedbackPopup toggle={this.togglePop} /> : null}
      </form>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);