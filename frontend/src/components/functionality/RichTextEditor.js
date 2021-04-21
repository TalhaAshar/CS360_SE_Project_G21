import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from 'axios';

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
      <form onSubmit={this.handleSubmit}>
        <Editor
          value = {this.state.content}
          apiKey="dn8136u1fhyng3ughxdyzfw93m38430c67msp493v583itva"
          init={{
            height: 500,
            menubar: false,
            toolbar: "bold italic"
          }}
          onEditorChange={this.handleChange}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default App;