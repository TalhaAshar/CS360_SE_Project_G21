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
    this.state = { Name:'', Location:'', Why:'', Body:'You need to host your image and then upload in this text box.' };
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
    .then(res => console.log("Posted"))
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success', response));
  }
    
  render(){
    return(
      <Container>
        <Head>Moderator Application</Head>
        <FormContainer>
            <Form onSubmit={this.handleSubmit}>
            <UserInfo>
            <Span>Full Name*</Span>
            <Span>Location*</Span>
            <Input type="text" name="Name" onChange={this.handleChange} />
            <Input type="text" name="Location" onChange={this.handleChange} />
            <Span style={{paddingTop:"80px"}} >Why do you want to be a moderator?*</Span><br/>
            <Input type="text" name="Why" style={{marginTop:"120px",marginBottom:"50px",width:"950px" ,height:"300px"}} onChange={this.handleChange} /><br/>
            </UserInfo>
            
            <EditorContainer>
              <Span>Describe your qualifications.*</Span>
              <Editor
                value={this.state.Body}
                apiKey="dn8136u1fhyng3ughxdyzfw93m38430c67msp493v583itva"
                init={{
                  height: 600,
                  width: 950,
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
  width:1040px;
  height:50px;
  margin-top:30px;
  margin-left:5px;
  display:flex;
  justify-content:center;
  align-items:center;
  color:white;
  background: #03204C;
  border-radius: 8px;
`
const FormContainer = styled.div`
  width: 1050px;
  height: 1200px;
  margin-top:20px;
  display:flex;
  justify-content:space-between;
  background:#DCF2F8;
  border-radius: 16px;

`
const Form = styled.form`
`
const UserInfo = styled.div`
  display:grid;
  grid-template-rows:20px 60px 20px 200px;
  grid-template-columns:500px 500px;
  margin-top:20px;
  padding-left:50px;
`

const Span = styled.span`
  font-weight:bold;
  font-size:20px;
  
`
const Input = styled.input`
  width: 400px;
  height: 60px;
  margin-top:10px;
  background: #F9F7FC;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius:6px;
  outline:none;
  border:none;
`

const EditorContainer = styled.div`
  margin-left:50px;
  margin-top:230px;

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
