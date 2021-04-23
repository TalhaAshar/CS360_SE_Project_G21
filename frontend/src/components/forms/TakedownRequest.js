import React, { Component } from "react";
import { render } from "react-dom";
import { Editor } from "@tinymce/tinymce-react";
import styled from 'styled-components'
import axios from 'axios';
import TakedownFeedbackPopup from '../functionality/TakedownFeedbackPopup';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class App extends Component{
  
constructor(props){
    super(props);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { Party:'', Relationship:'', Copyright:'', Country:'', Email:'', Publication:'', Body:'', seen: false, invalid: false };
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
  const url = "api/main/takedown/" + this.state.Publication;
  const data = { Party:this.state.Party, Relationship:this.state.Relationship, Copyright:this.state.Copyright, Country:this.state.Country, Email:this.state.Email, Publication:this.state.Publication, Body:this.state.Body };
  
  axios.post(url, { data })
  .then(res => this.setState({seen:true, invalid:true}))
  .catch(error => this.setState({invalid:true}))
  .then(response => console.log("huh"));
  }
    
  render(){
    return(
      <Container>
        <BookTitleContainer><h1>DMCA Takedown Request</h1></BookTitleContainer>
        <FormContainer>
            <Form onSubmit={this.handleSubmit}>
            <UserInfo>
            <SpanContainer>
              <Span>Affected Party*</Span><br/>
              <Span>Relationship to copyrighted content*</Span><br/>
              <Span style={{paddingTop:"10px"}}>Name of copyright owner*</Span><br/>
              <Span style={{paddingTop:"10px"}} >Country*</Span><br/>
              <Span style={{paddingTop:"10px"}} >Primary Email*</Span><br/>
              <Span style={{paddingTop:"10px"}} >Publication ID for removal*</Span><br/>
            </SpanContainer>
            <InputContainer>
              <Input type="text" required name="Party" onChange={this.handleChange} /><br/>
              <Input type="text" required name="Relationship" onChange={this.handleChange} /><br/>
              <Input type="text" required name="Copyright" onChange={this.handleChange} /><br/>
              <Input type="text" required name="Country" onChange={this.handleChange} /><br/>
              <Input type="text" required name="Email" onChange={this.handleChange} /><br/>
              <Input type="text" required name="Publication" onChange={this.handleChange} /><br/>
            </InputContainer>
            </UserInfo>
            <EditorContainer>
              <Span>Body*</Span>
              { (this.state.invalid && !this.state.seen) ? <ErrorMessage>Body cannot be empty.</ErrorMessage> : null }
              <Editor
                value={this.state.Body}
                apiKey="dn8136u1fhyng3ughxdyzfw93m38430c67msp493v583itva"
                init={{
                  placeholder: 'You need to host your image and then upload in this text box.',
                  height: 400,
                  width: '94%',
                  plugins: "image",
                  toolbar: "bold italic image",
                  menubar: false,
                  toolbar_location: "bottom",
                }}
                onEditorChange={this.handleEditorChange}
              />
              { (!this.state.seen || !this.state.invalid) ? <Submit type="submit" value="Submit" /> : null }
              { (this.state.seen && this.state.invalid) ? <TakedownFeedbackPopup toggle={this.togglePop} /> : null }
            </EditorContainer>
          </Form>
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
margin-left:3%;
margin-right:3%;
`
const Head = styled.h3`
min-width: 55%;
min-height: 4%;
margin-top: 2%;
display:flex;
justify-content:center;
align-items:center;
color:white;
background: #03204C;
border-radius: 8px;
`
const FormContainer = styled.div`
  max-width: 100%;
  max-height: 100%;
  margin-top: 2%;
  display:flex;
  justify-content:space-between;
  background:#DCF2F8;
  border-radius: 16px;

  
`
const Form = styled.form`
  flex: 1;
  margin-right: 3%;
  margin-bottom: 1%;
`
const UserInfo = styled.div`


  width:1100px;
  display:grid;
  padding-top:20px;
  padding-left:7%;
  padding-right:5.5%;
  margin: 0 auto;
  display:grid;
    grid-template-columns: 500px 500px;

`
const SpanContainer = styled.div`
  margin-top:10px;
  padding-top:10px;
`
const InputContainer = styled.div`
`
const Span = styled.h5`
  font-weight:bold;
  font-size:20px;
  margin-top:10px
`
const ErrorMessage = styled.span`
  font-weight:bold;
  font-size:20px;
  color:red;
`

const Input = styled.input`
  width: 400px;
  height: 60px;
  margin-top:5px;
  background: #F9F7FC;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius:6px;
  outline:none;
  border:none;
  margin-bottom:10px;
`
const EditorContainer = styled.div`
  margin-left:3%;
  margin-top:3%;
  flex:1;
  width:1100px;
padding-top:20px;
padding-left:7%;
margin-left:20px;
margin: 0 auto;
  
`
const Submit = styled.input`
width:8%;
height:15%;
position:relative;
bottom:55px;
left:85%;
background-color:#03204C;
color:white;
z-index:2;
border-radius:6px;
font-size:22px;
font-weight:bold;
cursor: pointer;
`
