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
    this.onFrontChange = this.onFrontChange.bind(this);
    this.onBackChange = this.onBackChange.bind(this);
    this.onSpineChange = this.onSpineChange.bind(this);
    this.state = { Title:'', Authors:'', Publisher:'', Edition_Number:'', Year_Publication:'', Genres:'',  Lang:'', ISBN:'', Related:'', Description:'', Front_Cover: null, Back_Cover: null, Spine: null };
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

onFrontChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        Front_Cover: img
      });
    }
};
  
onBackChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        Back_Cover: img
      });
    }
};

onSpineChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        Spine: img
      });
    }
};

handleSubmit = (event) =>{
  event.preventDefault();
  const url = "api/main/add_publication";
  const data = { Title:this.state.Title, Authors:this.state.Authors, Publisher:this.state.Publisher, Edition_Number:this.state.Edition_Number, Year_Publication:this.state.Year_Publication, Genres:this.state.Genres, Lang:this.state.Lang, ISBN:this.state.ISBN, Related:this.state.Related, Description:this.state.Description, Front_Cover:this.state.Front_Cover, Back_Cover:this.state.Back_Cover, Spine:this.state.Spine };
  
  const formData = new FormData();
  formData.append("Title", data["Title"]);
  formData.append("Authors", data["Authors"]);
  formData.append("Publisher", data["Publisher"]);
  formData.append("Edition_Number", data["Edition_Number"]);
  formData.append("Year_Publication", data["Year_Publication"]);
  formData.append("Genres", data["Genres"]);
  formData.append("Lang", data["Lang"]);
  formData.append("ISBN", data["ISBN"]);
  formData.append("Related", data["Related"]);
  formData.append("Description", data["Description"]);
  formData.append("Front_Cover", this.state.Front_Cover, this.state.Front_Cover.name);
  formData.append("Back_Cover", this.state.Back_Cover, this.state.Back_Cover.name);
  formData.append("Spine", this.state.Spine, this.state.Spine.name);
  
  
  
  axios.post(`api/main/add_publication`, formData, {
      headers: {
        'content-type': 'multipart/form-data'
        }
      })
    .then(res => console.log(res) ) //send to single pub page)
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success', response));
  }
    
  render(){
    return(
        <form onSubmit={this.handleSubmit}>
        <span>Book Title*</span>
        <input type="text" name="Title" onChange={this.handleChange} /><br/>
        <span>Author(s)*</span>
        <input type="text" name="Authors" onChange={this.handleChange} /><br/>
        <span>Publisher(s)</span>
        <input type="text" name="Publisher" onChange={this.handleChange} /><br/>
        <span>Edition_Number</span>
        <input type="number" name="Edition_Number" onChange={this.handleChange} /><br/>
        <span>Year</span>
        <input type="number" name="Year_Publication" onChange={this.handleChange} /><br/>
        <span>Genres*</span>
        <input type="text" name="Genres" onChange={this.handleChange} /><br/>
        <span>Language*</span>
        <input type="text" name="Lang" onChange={this.handleChange} /><br/>
        <span>ISBN</span>
        <input type="number" name="ISBN" onChange={this.handleChange} /><br/>
        <span>Related</span>
        <input type="text" name="Related" onChange={this.handleChange} /><br/>
        <div>
            <span>Select Front Image</span>
            <input type="file" name="Front_Cover" onChange={this.onFrontChange} />
        </div>
        <div>
            <span>Select Back Image</span>
            <input type="file" name="Back_Cover" onChange={this.onBackChange} />
        </div>
        <div>
            <span>Select Spine Image</span>
            <input type="file" name="Spine" onChange={this.onSpineChange} />
        </div>
        <span>Description</span>
        <Editor
          value={this.state.Description}
          apiKey="dn8136u1fhyng3ughxdyzfw93m38430c67msp493v583itva"
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

    //  This is for a save button inside the text editor itself. Not sure what kinda data it sends back.
        // <Editor
        //   value={this.state.Description}
        //   apiKey="dn8136u1fhyng3ughxdyzfw93m38430c67msp493v583itva"
        //   init={{
        //     height: 200,
        //     width: 500,
        //     plugins: "save", //image",
        //     toolbar: "bold italic save", // image",
        //     menubar: false,
        //     toolbar_location: "bottom",
        //   }}
        //   onEditorChange={this.handleEditorChange}
        // />
        // <input type="hidden" name="Description" value={this.state.Description} /><br/>
        // </form> );