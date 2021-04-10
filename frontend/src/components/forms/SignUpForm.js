import React, { Component } from "react";
import { render } from "react-dom";
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class App extends Component{
  
constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { username:' ', email:' ', password:' ' };
}

handleChange = (event) =>{
    this.setState({ [event.target.name]:event.target.value });
}

handleSubmit = (event) =>{
  event.preventDefault();
  const data = { username:this.state.username, email:this.state.email, password:this.state.password };
  
  axios.post(`api/register/signup`, { data })
    .then(res => console.log(res))
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success', response));
  }
    
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <span style={{color: "#583192"}}>Username</span> <br/>
        <input type="text" name="username" placeholder="Between 8 to 32 characters." minLength="8" maxLength="32" style={{padding:"10px", width: "380px", height: "45px", fontSize: "24px", borderColor: "#2F80ED", borderRadius: "14px", outline: "none"}} onChange={this.handleChange} /><br/>
        <span style={{color: "#583192"}}>Email</span> <br/>
        <input type="text" name="email" style={{padding:"10px", width: "380px", height: "45px", fontSize: "24px", borderColor: "#2F80ED", borderRadius: "14px", outline: "none"}} onChange={this.handleChange} /><br/>
        <span style={{color: "#583192"}}>Password</span> <br/>
        <input type="text" name="password" placeholder="Between 8 to 32 characters." minLength="8" maxLength="32"  style={{padding:"10px", width: "380px", height: "45px", fontSize: "24px", borderColor: "#2F80ED", borderRadius: "14px", outline: "none"}} onChange={this.handleChange} /><br/>
        <input type="submit" value="Sign Up" style={{width: "160px", height: "70px", position: "relative", marginTop: "95px", marginLeft: "220px", fontSize: "24px", color: "#FFFFFF", backgroundColor: "transparent", borderRadius: "7px", borderColor: "#FFFFFF"}}/>
      </form>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);