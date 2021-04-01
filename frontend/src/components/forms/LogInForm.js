import React, { Component } from "react";
import { render } from "react-dom";
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class App extends Component{
  
constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { Username:'', Password:'' };
}

handleChange = (event) =>{
    this.setState({ [event.target.name]:event.target.value });
}

handleSubmit = (event) =>{
  event.preventDefault();
  //const url = "api/accounts/modapps";
  const data = { Username:this.state.Username, Password:this.state.Password };
  
  axios.post(`api/accounts/LogInData`, { data })
    .then(res => console.log(res))
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success', response));
  }
    
  render(){
    return(
        <form onSubmit={this.handleSubmit}>
        <span>Username</span>
        <input type="text" name="Username" onChange={this.handleChange} /><br/>
        <span>Password</span>
        <input type="text" name="Password" onChange={this.handleChange} /><br/>
        <input type="submit" value="Login" />
        </form>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);