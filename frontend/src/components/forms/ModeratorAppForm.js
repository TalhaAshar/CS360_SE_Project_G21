import React, { Component } from "react";
import { render } from "react-dom";
// import fetch from 'cross-fetch';
import { Editor } from "@tinymce/tinymce-react";
import axios from 'axios';
import styled from 'styled-components'
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
import ModAppFormFeedbackPopup from '../functionality/ModAppFormFeedbackPopup';

class App extends Component{
  
constructor(props){
    super(props);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { Name:'', Location:'', Why:'', Body:'', seen: false, invalid: false };
}

togglePop = () => {
  this.setState({
    seen: !this.state.seen
  })
}

rteChange = (content, delta, source, editor) => {
    console.log(this.state.Body);
}

handleChange = (event) =>{
    this.setState({ [event.target.name]:event.target.value });
}

handleEditorChange(Body, editor) {
    this.setState({Body});
}

handleSubmit = (event) =>{
  event.preventDefault();
  const data = { Name:this.state.Name, Location:this.state.Location, Why:this.state.Why, Body:this.state.Body };
  
  axios.post(`api/accounts/modapps`, { data })
  .then(res => this.setState({seen:true, invalid:true}))
  .catch(error => this.setState({invalid:true}))
  .then(response => console.log("huh"));
  }
    
  render(){
    return(
      <Container>
        <BookTitleContainer><h1>Moderator Application</h1></BookTitleContainer>
        <FormContainer>
        <Ub>
            <Form onSubmit={this.handleSubmit}>
            <UserInfo>
            <Span>Full Name*</Span>
            <Span>Location*</Span>
            <Input1 type="text" required name="Name" onChange={this.handleChange} />
            <Input1 type="text" required name="Location" onChange={this.handleChange} />
            <Span style={{paddingTop:"40px"}} >Why do you want to be a moderator?*</Span><br/>
            <Input2 required name="Why" style={{marginTop:"65px",marginBottom:"50px",width:"950px" ,height:"300px", resize:"none"}} onChange={this.handleChange} /><br/>
            </UserInfo>
            
            <EditorContainer>
              <Span>Describe your qualifications.*</Span>
              { (this.state.invalid && !this.state.seen) ? <ErrorMessage>Description cannot be empty.</ErrorMessage> : null }
              <Editor
                value={this.state.Body}
                apiKey="dn8136u1fhyng3ughxdyzfw93m38430c67msp493v583itva"
                init={{
                  placeholder: "You need to host your image and then upload in this text box.",
                  height: 400,
                  width: 950,
                  plugins: "image",
                  toolbar: "bold italic image",
                  menubar: false,
                  toolbar_location: "bottom",
                }}
                onEditorChange={this.handleEditorChange}
              />
            { (!this.state.seen || !this.state.invalid) ? <Submit type="submit" value="Submit" /> : null }
            { (this.state.seen && this.state.invalid) ? <ModAppFormFeedbackPopup toggle={this.togglePop} /> : null }
            </EditorContainer>
          </Form>
          </Ub>
        </FormContainer> 
      </Container>
        );
  }
}

export default App;

const BookTitleContainer = styled.div`
    background: #0A3977;
    border-radius:20px;
    color:white;
    min-width: 55%;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-left: 3%;
margin-right: 3%;
margin-top: 2%;
margin-bottom: 2%;
`

const Container = styled.div`
max-width:100%;
max-height:100%;
background: white;
`

const Ub = styled.h3`
margin: 0 auto;
`
const FormContainer = styled.div`
max-width: 100%;
max-height: 100%;
margin-top: 2%;
display:flex;
justify-content:space-between;
background:#DCF2F8;
border-radius: 16px;
  margin-left: 3%;
margin-right: 3%;


`
const Form = styled.form`
`
const UserInfo = styled.div`
  

  width:1100px;
  display:grid;
  padding-top:20px;
  padding-left:7%;
  padding-right:5.5%;
  margin: 0 auto;
  display:grid;
  grid-template-rows:20px 60px 20px 200px;
  grid-template-columns:500px 500px;
`

const Span = styled.span`
  font-weight:bold;
  font-size:20px;
`

const ErrorMessage = styled.span`
  font-weight:bold;
  font-size:20px;
  color:red;
`

const Input1 = styled.input`
width: 90%;
height: 60px;
margin-top:10px;
margin-right:5%;
background: #F9F7FC;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius:6px;
outline:none;
border:none;
`

const Input2 = styled.textarea`
  width: 400px;
  height: 30px;
  margin-top:10px;
  background: #F9F7FC;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius:6px;
  outline:none;
  border:none;
`

const EditorContainer = styled.div`
margin-left:3%;
margin-top:3%;
flex:1;
width:1100px;
padding-top:200px;
padding-left:7%;
margin-left:20px;
margin: 0 auto;

`
const Submit = styled.input`
  width:80px;
  height:30px;
  position:relative;
  bottom:55px;
  left:800px;
  background-color:#03204C;
  color:white;
  z-index:2;
  border-radius:6px;
  font-size:15px;
  font-weight:bold;
  cursor:pointer;
`
