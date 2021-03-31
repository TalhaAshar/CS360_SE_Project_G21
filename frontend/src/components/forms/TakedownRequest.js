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
        <form onSubmit={this.handleSubmit}>
        <span>Affected Party*</span>
        <input type="text" name="Party" onChange={this.handleChange} /><br/>
        <span>Relationship to copyrighted content*</span>
        <input type="text" name="Relationship" onChange={this.handleChange} /><br/>
        <span>Name of copyright owner*</span>
        <input type="text" name="Copyright" onChange={this.handleChange} /><br/>
        <span>Country*</span>
        <input type="text" name="Country" onChange={this.handleChange} /><br/>
        <span>Primary Email*</span>
        <input type="text" name="Email" onChange={this.handleChange} /><br/>
        <span>Publication for removal*</span>
        <input type="text" name="Publication" onChange={this.handleChange} /><br/>
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