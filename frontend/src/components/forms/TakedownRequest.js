import React, { Component } from "react";
import { render } from "react-dom";
// import fetch from 'cross-fetch';
import { Editor } from "@tinymce/tinymce-react";
import styled from 'styled-components'
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class App extends Component{
  
constructor(props){
    super(props);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { Party:'', Relationship:'', Copyright:'', Country:'', Email:'', Publication:'', Body:'You need to host your image and then upload in this text box.' };
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
  const data = { Party:this.state.Party, Relationship:this.state.Relationship, Copyright:this.state.Copyright, Country:this.state.Country, Email:this.state.Email, Publication:this.state.Publication, Body:this.state.Body };
  
  axios.post(`api/main/add_publication`, { data })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success', response));
  }
    
  render(){
    return(
      <Container>
        <Head>DMCA Takedown Request</Head>
        <FormContainer>
            <Form onSubmit={this.handleSubmit}>
            <UserInfo>
            <SpanContainer>
            <Span>Affected Party*</Span><br/>
            <Span>Relationship to copyrighted content*</Span><br/>
            <Span style={{paddingTop:"10px"}}>Name of copyright owner*</Span><br/>
            <Span style={{paddingTop:"10px"}} >Country*</Span><br/>
            <Span style={{paddingTop:"10px"}} >Primary Email*</Span><br/>
            <Span style={{paddingTop:"10px"}} >Publication for removal*</Span><br/>
            </SpanContainer>
            <InputContainer>
            <Input type="text" name="Party" onChange={this.handleChange} /><br/>
            <Input type="text" name="Relationship" onChange={this.handleChange} /><br/>
            <Input type="text" name="Copyright" onChange={this.handleChange} /><br/>
            <Input type="text" name="Country" onChange={this.handleChange} /><br/>
            <Input type="text" name="Email" onChange={this.handleChange} /><br/>
            <Input type="text" name="Publication" onChange={this.handleChange} /><br/>
            </InputContainer>
            </UserInfo>
            <EditorContainer>
              <Span>Body*</Span>
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
  margin-left:150px;
  margin-right:150px;

`
const Head = styled.h3`
  width:990px;
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
  width: 1000px;
  height: 1150px;
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
  grid-template-columns: 500px 500px;
  margin-top:20px;
  padding-left:50px;
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
  margin-top:10px;
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
