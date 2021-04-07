import React, { Component } from "react";
import { render } from "react-dom";
import axios from 'axios';
import styled from 'styled-components'


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
        <Form onSubmit={this.handleSubmit}>
        <Span>Username</Span><br/>
        <Input type="text" name="username" onChange={this.handleChange} /><br/>
        <Span>Password</Span><br/>
        <Input type="password" name="password" onChange={this.handleChange} /><br/>
        <Input type="hidden" value="abc" name="refresh" onChange={this.handleChange}/>
        <Submit type="submit" value="Log In"/>
        </Form>
    );
  }
}

export default App;

const Form = styled.form`
  position:relative;

`
const Span = styled.span`
  color:#583192;
  font-size:20px;
  padding-bottom:20px;
`
const Input = styled.input`
  bottom:8px;
  width: 380px;
  height: 45px;
  font-size: 24px;
  border-color: #2F80ED;
  border-radius: 14px;
  outline: none;
`
const Submit = styled.input`
  width: 160px;
  height: 70px;
  position: relative;
  top: 100px;
  left: 220px;
  font-size: 24px;
  font-weight:bold;
  color: #FFFFFF;
  background-color: transparent;
  border-radius: 7px;
  borderColor:#FFFFFF;
`