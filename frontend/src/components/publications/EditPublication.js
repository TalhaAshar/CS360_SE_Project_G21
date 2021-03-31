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
    this.state = { Title:'', Authors:'', Publisher:'', Edition_Number:'', Year_Publication:'', Genres:'',  Lang:'', ISBN:'', Related:'', Description:'', Front:'', Back:'', Spine:'' };
}

rteChange = (content, delta, source, editor) => {
    console.log(this.state.Description);
}

handleChange = (event) =>{
    this.setState({ [event.target.name]:event.target.value });
}

handleEditorChange(Description, editor) {
    this.setState({Description});
}

handleSubmit = (event) =>{
  event.preventDefault();
  const url = "api/main/add_publication";
  const data = { Title:this.state.Title, Authors:this.state.Authors, Publisher:this.state.Publisher, Edition_Number:this.state.Edition_Number, Year_Publication:this.state.Year_Publication, Genres:this.state.Genres, Lang:this.state.Lang, ISBN:this.state.ISBN, Related:this.state.Related, Description:this.state.Description, Front:this.state.Front, Back:this.state.Back, Spine:this.state.Spine };
  
  axios.post(`api/main/add_publication`, { data })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success', response));
  }
    
  render(){
    return(
        <form onSubmit={this.handleSubmit}>
        <span>Book Title*</span>
        <input type="text" name="Title" value="HARDCODE" onChange={this.handleChange} /><br/>
        <span>Author(s)*</span>
        <input type="text" name="Authors" value="HARDCODE" onChange={this.handleChange} /><br/>
        <span>Publisher(s)</span>
        <input type="text" name="Publisher" value="HARDCODE" onChange={this.handleChange} /><br/>
        <span>Edition_Number</span>
        <input type="number" name="Edition_Number" value="123" onChange={this.handleChange} /><br/>
        <span>Year</span>
        <input type="number" name="Year_Publication" value="123" onChange={this.handleChange} /><br/>
        <span>Genres*</span>
        <input type="text" name="Genres" value="HARDCODE" onChange={this.handleChange} /><br/>
        <span>Language*</span>
        <input type="text" name="Lang" value="HARDCODE" onChange={this.handleChange} /><br/>
        <span>ISBN</span>
        <input type="number" name="ISBN" value="123321123321" onChange={this.handleChange} /><br/>
        <span>Related</span>
        <input type="text" name="Related" value="1,2,3" onChange={this.handleChange} /><br/>
        <label for="img">Front</label>
        <input type="file" id="front" name="Front" accept="image/*" onChange={this.handleChange} /><br/>
        <label for="img">Back</label>
        <input type="file" id="back" name="Back" accept="image/*" onChange={this.handleChange} /><br/>
        <label for="img">Spine</label>
        <input type="file" id="spine" name="Spine" accept="image/*" onChange={this.handleChange} /><br/>
        <span>Description</span>
        <Editor
          value={this.state.Description} //Set previous state from line 16.
          apiKey="dn8136u1fhyng3ughxdyzfw93m38430c67msp493v583itva"//lun khao why doe gaand na marwa tsk tsk keep this as easter egg for talha lels
          init={{
            height: 200,
            width: 500,
            //plugins: "image",
            toolbar: "bold italic", // image",
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