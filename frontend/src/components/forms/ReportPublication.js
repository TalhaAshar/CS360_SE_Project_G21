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
    this.state = {Type : 'Pub', id : 0, Reason:'Incorrect data', Body:'You need to host your image and then upload in this text box.' };
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
          <option defaultValue="Incorrect data">Incorrect data</option>
          <option value="Inaccurate description">Inaccurate description</option>
          <option value="Non-existent publication">Non-existent publication</option>
          <option value="Images not clear">Images not clear</option>
        </select><br/>
        <span>Provide a description of what is wrong and suggestions/corrections required:</span>
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