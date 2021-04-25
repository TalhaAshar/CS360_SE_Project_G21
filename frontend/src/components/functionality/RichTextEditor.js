import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from 'axios';
import styled from "styled-components"

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
    console.log(this.props.isEdit, "edit flag")
    let isComponentMounted = true;
    if(this.props.isEdit == false){
      let url = "api/forum/threads/" + this.ID
      const data = { Body:this.state.content };
      axios.post(url, {data}).then((res) => {
        console.log("added")
        if (isComponentMounted){
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
      <Form onSubmit={this.handleSubmit} style={{marginLeft:"4.5%", marginRight:"4.5%"}}>
      <EditorContainer>
              <Editor
                  value={this.state.Description}
                  apiKey="dn8136u1fhyng3ughxdyzfw93m38430c67msp493v583itva"
                  init={{
                      height: 500,
                      width:"90%",
                      //plugins: "image",
                      toolbar: "bold italic", // image",
                      menubar: false,
                      toolbar_location: "bottom",
                  }}
                  onEditorChange={this.handleEditorChange}
                  />
              </EditorContainer>
              <Submit type="submit" value="Submit" />
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
    position:relative;
    margin-left:30px;
    

`
const Submit = styled.input`
    position: relative;
    bottom:20%;
    left: 87%;
    width:150px;
    height:35px;
    z-index:4;
    border:none;
    background: #03204C;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    color:white;
    font-size:20px;
    font-weight:bold;
`



// <Container>
//       <Form onSubmit={this.handleSubmit} style={{marginLeft:"4.5%", marginRight:"4.5%"}}>
//         <Editor
//           value = {this.state.content}
//           apiKey="dn8136u1fhyng3ughxdyzfw93m38430c67msp493v583itva"
//           init={{
//             width:"100%",
//             height: 500,
//             plugins: "image",
//             toolbar: "bold italic image",
//             menubar: false,
//             toolbar_location: "bottom",
//           }}
//           onEditorChange={this.handleChange}
//         />
//         <Submit type="submit" value="Submit" />
//       </Form>
//       </Container>