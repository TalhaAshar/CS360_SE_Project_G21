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
    this.state = { Reason:'Incorrect data', Body:'' };
    this.ID = props.location.state
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
  const data = { id: this.ID, Reason:this.state.Reason, Body:this.state.Body, Type: "PUB"};
  
  axios.post(`api/accounts/reports`, { data })
    .then(res => console.log(res))
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success', response));
  }
    
  render(){
    return(
      <Container>
      <Head>Publication Report</Head>
      <FormContainer>
          <Form onSubmit={this.handleSubmit}>
          <LabelContainer>
              <Label for="Reason">Reason:</Label> <br/>
              <Select name="Reason" id="Reason" value={this.state.Reason} onChange={this.handleChange}>
                <Option defaultValue="Incorrect data">Incorrect data</Option>
                <Option value="Inaccurate description">Inaccurate description</Option>
                <Option value="Non-existent publication">Non-existent publication</Option>
                <Option value="Images not clear">Images not clear</Option>
              </Select>
          </LabelContainer>
          
          <EditorContainer>
            <Span>Please provide a description of what is wrong and propose suggestions/corrections:</Span> <br/>
            <Editor
              value={this.state.Body}
              apiKey="dn8136u1fhyng3ughxdyzfw93m38430c67msp493v583itva"
              init={{
                placeholder: 'You need to host your image and then upload in this text box.',
                height: 900,
                width: '100%',
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

const Span = styled.span`
  font-weight:bold;
  font-size:20px;
`

const LabelContainer = styled.div`
  margin-left:3%;
  margin-top:3%;
  flex:1;
`
const Label = styled.label`
  font-weight:bold;
  font-size:20px;
`
const Select = styled.select`
  min-width:100%;
  height:60px;
  margin-top:10px;
  outline:none;
  background-color:#F9F7FC;
  border-radius:6px;
  border:none;
  padding:1%;
  font-size: 24px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const Option = styled.option`
  height: 50px;
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
  font-size:24px;
  font-weight:bold;
`
