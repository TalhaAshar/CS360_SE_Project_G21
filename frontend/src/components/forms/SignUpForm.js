import React, { Component } from "react";
import { render } from "react-dom";
import axios from 'axios';
import styled from 'styled-components';


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
      <Form onSubmit={this.handleSubmit}>
      <Span>Username</Span><br/>
      <Input type="text" name="username" onChange={this.handleChange} /><br/>
      <Span>Email</Span><br/>
      <Input type="text" name="email" onChange={this.handleChange} /><br/>
      <Span>Password</Span><br/>
      <Input type="password" name="password" onChange={this.handleChange} /><br/>
      <Input type="hidden" value="abc" name="refresh" onChange={this.handleChange}/>
      <Submit type="submit" value="Sign Up"/>
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
  padding-bottom:10px;
`
const Input = styled.input`
  bottom:10px;
  width: 380px;
  height: 40px;
  font-size: 24px;
  border-color: #2F80ED;
  border-radius: 14px;
  outline: none;
`
const Submit = styled.input`
  width: 160px;
  height: 70px;
  position: relative;
  top: 85px;
  left: 220px;
  font-size: 24px;
  font-weight:bold;
  color: #FFFFFF;
  background-color: transparent;
  border-radius: 7px;
  borderColor:#FFFFFF;
`