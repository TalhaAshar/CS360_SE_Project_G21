import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from 'axios';
import styled from 'styled-components'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: props.original };
    this.ID = props.ID
    this.post_ID = props.post_id

    

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(content, editor) {
    console.log("Reply is: ", this.state.content)
    this.setState({content});
  }

  handleSubmit(event) {
    //alert("Text was submitted: " + this.state.content);
    event.preventDefault();
    window.scrollTo(0, 0)
    console.log(this.props.isEdit, "edit flag")
    let isComponentMounted = true;
    if(this.props.isEdit == false){
      let url = "api/forum/threads/" + this.ID
      const data = { Body:this.state.content };
      axios.post(url, {data}).then((res) => {
        console.log("added")
        if (isComponentMounted){
          window.scrollTo(0, 0)
          this.setState({content : ''})
          this.props.postHandler(res.data)
          this.props.replyHandler('')
          //this.props.editHandler('')
          
        }
        return () => {
          isComponentMounted = false;
      }
      })
    .catch((error) => {
      if (isComponentMounted){
        this.props.replyHandler('')
      }
      return () => {
        isComponentMounted = false;
    }
      
  })
    }
    else{
        let url = "api/forum/threads/edit/" + this.post_ID + "/" + this.ID
        const data = { Body:this.state.content };
        axios.post(url, {data}).then((res) => {
          console.log("added")
          if (isComponentMounted){
            window.scrollTo(0, 0)
            this.setState({content : ''})
            this.props.postHandler(res.data)
            this.props.replyHandler('')
            this.props.editHandler('')
            
          }
          return () => {
            isComponentMounted = false;
        }
        })
      .catch((error) => {
        if (isComponentMounted){
          this.props.replyHandler('')
          this.props.editHandler('')
        }
        return () => {
          isComponentMounted = false;
      }
    });
    }

  
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <EditorContainer>
        <Editor
          value = {this.state.content}
          apiKey="dn8136u1fhyng3ughxdyzfw93m38430c67msp493v583itva"
          init={{
            width: "100%",
            height: 500,
            plugins: "image",
            toolbar: "bold italic image",
            menubar: false,
            toolbar_location: "bottom",
          }}
          onEditorChange={this.handleChange}
        />
        <br />
        <Submit type="submit" value="»" />
        </EditorContainer>
      </Form>
    );
  }
}

export default App;
const Container = styled.div`


`
const Form = styled.form`


`
const EditorContainer = styled.div`
margin-left:4.5%;
margin-top:3%;
flex:1;
padding-top:20px;
padding-left:4.5%;
padding-right: 4.5%;
margin-right:4.5%;
margin: 0 auto;
`
const Submit = styled.input`
width:8%;
height:15%;
position:relative;
bottom:76px;
left:90%;
background-color:#03204C;
color:white;
z-index:2;
border-radius:6px;
font-size:22px;
font-weight:bold;
cursor: pointer;
`