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
    this.state = { Name:'', Email:'', Reason:'Feedback', Body:'You need to host your image and then upload in this text box.' };
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
  const url = "api/main/contact";
  const data = { Name:this.state.Name, Email:this.state.Email, Reason: this.state.Reason, Body:this.state.Body };
  
  axios.post(`api/main/contact`, { data })
    .then(res => console.log(res))
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success', response));
  }
    
  render(){
    return(
        <form onSubmit={this.handleSubmit}>
        <span>Name*</span>
        <input type="text" name="Name" onChange={this.handleChange} /><br/>
        <span>Email*</span>
        <input type="text" name="Email" onChange={this.handleChange} /><br/>
        <label htmlFor="Reason">Reason</label>
        <select name="Reason" id="Reason" value={this.state.Reason} onChange={this.handleChange}>
          <option defaultValue="Feedback">Feedback</option>
          <option value="Complaint">Complaint</option>
          <option value="Suggestion">Suggestion</option>
          <option value="Buy You A Coffee">Buy You A Coffee</option>
        </select><br/>
        <span>Body*</span>
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