import React, { Component } from "react";
import { render } from "react-dom";
// import fetch from 'cross-fetch';
import { Editor } from "@tinymce/tinymce-react";
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class App extends Component{
  
constructor(props){
    super(props);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {Type : 'Thread', id : 0, Reason:'Spam', Body:'You need to host your image and then upload in this text box.' };
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
        <form onSubmit={this.handleSubmit}>
        <span>Reason</span>
        <select name="Reason" id="Reason" value={this.state.Reason} onChange={this.handleChange}>
          <option defaultValue="Spam">Spam</option>
          <option value="Offensive material">Offensive material</option>
          <option value="False or misleading information">False or misleading information</option>
          <option value="Violation of community  guidelines (abuse, misuse, etc)">Violation of community  guidelines (abuse, misuse, etc)</option>
        </select><br/>
        <span>Provide a brief description of the offence caused:</span>
        <Editor
          value={this.state.Body}
          apiKey="dn8136u1fhyng3ughxdyzfw93m38430c67msp493v583itva"
          init={{
            height: 200,
            width: 500,
            plugins: "image",
            toolbar: "bold italic image",
            menubar: false,
            toolbar_location: "bottom",
          }}
          onEditorChange={this.handleEditorChange}
        />
        <input type="submit" value="Submit" />
        </form> );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);