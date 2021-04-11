import React, { Component } from "react";
import { render } from "react-dom";
// import fetch from 'cross-fetch';
import { Editor } from "@tinymce/tinymce-react";
import axios from 'axios';
import styled from 'styled-components'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class App extends Component{
  
constructor(props){
    super(props);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { Reason:'Spam', Body:'You need to host your image and then upload in this text box.' };
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
  const data = { Reason:this.state.Reason, Body:this.state.Body };
  
  axios.post(`api/main/add_publication`, { data })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success', response));
  }
    
  render(){
    return(
      <Container>
      <Head>Report-Thread</Head>
      <FormContainer>
          <Form onSubmit={this.handleSubmit}>
          <LabelContainer>
              <Label for="Reason">Reason</Label>
              <Select name="Reason" id="Reason" value={this.state.Reason} onChange={this.handleChange}>
                  <Option defaultValue="Spam">Spam</Option>
                  <Option value="Offensive material">Offensive material</Option>
                  <Option value="False or misleading information">False or misleading information</Option>
                  <Option value="Violation of community  guidelines (abuse, misuse, etc)">Violation of community  guidelines (abuse, misuse, etc)</Option>
              </Select><br/>
          </LabelContainer>
          
          <EditorContainer>
            <Span>Provide a brief description of the offence caused</Span>
            <Editor
              value={this.state.Body}
              apiKey="dn8136u1fhyng3ughxdyzfw93m38430c67msp493v583itva"
              init={{
                height: 600,
                width: 900,
                plugins: "image",
                toolbar: "bold italic image",
                menubar: false,
                toolbar_location: "bottom",
              }}
              onEditorChange={this.handleEditorChange}
            />
            <Submit type="submit" value="Submit" />
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
width: 1000px;
height: 950px;
margin-top:20px;
display:flex;
justify-content:space-between;
background:#DCF2F8;
border-radius: 16px;

`
const Form = styled.form`
`

const Span = styled.span`
font-weight:bold;
font-size:20px;
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
margin-left:50px;

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
`
