import React, { Component } from "react";
import { render } from "react-dom";
// import fetch from 'cross-fetch';
import { Editor } from "@tinymce/tinymce-react";
import axios from 'axios';
import ThreadAddFeedbackPopup from '../functionality/ThreadAddFeedbackPopup';
import styled from 'styled-components';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class App extends Component{
constructor(props){
    super(props);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { Title:'', Category:'Announcements', Body:'', seen: false, invalid: false, Thread: {} };
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
  const url = "api/main/add_publication";
  const data = { Title:this.state.Title, Category:this.state.Category, Body:this.state.Body };
  
  axios.post(`api/forum/threads/add`, { data })
  .then(res => this.setState({seen:true, invalid:true, Thread: res.data}))
  .catch(error => this.setState({invalid:true}))
  .then(response => console.log("huh"));
  }
    
  render(){
    return(
      <Container>
      <Head>Add Thread</Head>
      <FormContainer>
          <Form onSubmit={this.handleSubmit}>
          <UserInfo>
              <Span>Title*</Span>
              <Input type="text" required maxLength="250" name="Title" onChange={this.handleChange} />
          </UserInfo>
          <LabelContainer>
              <Label for="Category">Category</Label>
              <Select name="Category" id="Category" value={this.state.Reason} onChange={this.handleChange}>
                  <Option defaultValue="Announcements">Announcements</Option>
                  <Option value="General">General</Option>
                  <Option value="Other">Other</Option>
              </Select><br/>
          </LabelContainer>
          
          <EditorContainer>
            <Span>Body*</Span>
            { (this.state.invalid && !this.state.seen) ? <ErrorMessage>Body cannot be empty.</ErrorMessage> : null }
            <Editor
              value={this.state.Body}
              maxLength="5000"
              apiKey="dn8136u1fhyng3ughxdyzfw93m38430c67msp493v583itva"
              init={{
                placeholder : 'You need to host your image and then upload in this text box.',
                height: 600,
                width: 900,
                plugins: "image",
                toolbar: "bold italic image",
                menubar: false,
                toolbar_location: "bottom",
              }}
              onEditorChange={this.handleEditorChange}
            />
            { (!this.state.seen || !this.state.invalid) ? <Submit type="submit" value="Submit" /> : null }
            { (this.state.seen && this.state.invalid) ? <ThreadAddFeedbackPopup toggle={this.togglePop} thread={this.state.Thread} /> : null }
          </EditorContainer>
        </Form>
      </FormContainer> 
    </Container>
        );
  }
}

export default App;


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
flex:1;
margin-right:3%;
margin-bottom:1%;
`
const UserInfo = styled.div`
  display:grid;
  grid-template-rows:20px 60px;
  margin-top:20px;
  padding-left:50px;
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

const Input = styled.input`
  width: 900px;
  height: 60px;
  margin-top:5px;
  background: #F9F7FC;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius:6px;
  outline:none;
  border:none;
`
const LabelContainer = styled.div`
  display:grid;
  grid-template-rows:20px 65px;
  margin-left:50px;
  margin-top:20px;
`
const Label = styled.label`
  font-weight:bold;
  font-size:20px;
`
const Select = styled.select`
  width:900px;
  height:60px;
  margin-top:10px;
  outline:none;
  background-color:#F9F7FC;
  border-radius:6px;
  border:none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const Option = styled.option`
  height: 39px;
  background-color: #FFFFFF;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`
const EditorContainer = styled.div`
  margin-left:3%;
  margin-top:3%;
  flex:1;
`
const Submit = styled.input`
  width:8%;
  height:15%;
  position:relative;
  bottom:55px;
  left:91%;
  background-color:#03204C;
  color:white;
  z-index:2;
  border-radius:6px;
  font-size:15px;
  font-weight:bold;
`
