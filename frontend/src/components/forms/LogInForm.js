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
    .then(res => console.log(res))
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success', response))
    .then(a => this.props.onChange({'Status' : 'Authentic'}));
    
  }
    
  render(){
    return(
        <form onSubmit={this.handleSubmit}>
        <span>Username</span>
        <input type="text" name="username" onChange={this.handleChange} /><br/>
        <span>Password</span>
        <input type="password" name="password" onChange={this.handleChange} /><br/>
        <input type="hidden" value="abc" name="refresh" onChange={this.handleChange}/>
        <input type="submit" value="Login" />
        </form>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);