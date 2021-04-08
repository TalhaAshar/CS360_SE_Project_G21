import React, { Component } from "react";
import { render } from "react-dom";
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class App extends Component{
  
constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log(props.auth)

    this.state = { username:'', password:'', refresh : '' };
}

handleChange = (event) =>{
    this.setState({ [event.target.name]:event.target.value });
}

handleSubmit = (event) =>{
  event.preventDefault();
  //const url = "api/accounts/modapps";
  const data = { username:this.state.username, password:this.state.password };
  
  axios.post(`api/register/login`, { data })
    .then(res => {
      this.props.onChange({'Status' : 'Authentic'})
    })
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success', response))
    
  }
    
  render(){
    return(
        <form onSubmit={this.handleSubmit}>
        <span style={{color: "#583192"}}>Username</span><br/>
        <input type="text" name="username" style={{width: "380px", height: "45px", fontSize: "24px", borderColor: "#2F80ED", borderRadius: "14px", outline: "none"}} onChange={this.handleChange} /><br/>
        <span style={{color: "#583192"}}>Password</span><br/>
        <input type="password" name="password" style={{width: "380px", height: "45px", fontSize: "24px", borderColor: "#2F80ED", borderRadius: "14px", outline: "none"}} onChange={this.handleChange} /><br/>
        <input type="hidden" value="abc" name="refresh" onChange={this.handleChange}/>
        <input type="submit" value="Login" style={{width: "160px", height: "70px", position: "relative", top: "150px", left: "220px", fontSize: "24px", color: "#FFFFFF", backgroundColor: "transparent", borderRadius: "7px", borderColor: "#FFFFFF"}}/>
        </form>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);