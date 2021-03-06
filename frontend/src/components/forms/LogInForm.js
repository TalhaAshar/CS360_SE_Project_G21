import React, { Component } from "react";
import { render } from "react-dom";
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class App extends Component{
  
constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { username:' ', password:' ', refresh : ' ', invalid: false };
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
    .catch(error => this.setState({ invalid:true }))
    .then(response => console.log('Success', response))
  }

  render(){
    return(
        <form onSubmit={this.handleSubmit}>
          <span style={{color: "#583192"}}>Username*</span><br/>
          <input type="text" name="username" required minLength="8" maxLength="32" style={{width: "380px", height: "45px", fontSize: "24px", borderColor: "#2F80ED", borderRadius: "14px", padding:"10px", outline: "none"}} onChange={this.handleChange} /><br/>
          <span style={{color: "#583192"}}>Password*</span><br/>
          <input type="password" name="password" required minLength="8" maxLength="32" style={{width: "380px", height: "45px", fontSize: "24px", borderColor: "#2F80ED", borderRadius: "14px", padding:"10px", outline: "none", cursor: "pointer"}} onChange={this.handleChange} /><br/>
          <input type="hidden" value="abc" name="refresh" onChange={this.handleChange}/>
          { this.state.invalid && <span style={{color: "#FF0000", position: "absolute"}}>Incorrect username or password.</span> }
          <input type="submit" value="Login" style={{width: "160px", height: "70px", position: "relative", marginTop: "105px", marginLeft: "220px", fontSize: "24px", color: "#FFFFFF", padding:"10px", backgroundColor: "transparent", borderRadius: "7px", borderColor: "#FFFFFF" , cursor: "pointer"}}/>
        </form>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);