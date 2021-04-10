import React, { Component } from "react";
import { render } from "react-dom";
// import fetch from 'cross-fetch';
import { Editor } from "@tinymce/tinymce-react";
import axios from 'axios';
import styled from 'styled-components'
import UploadImage from './UploadImage'

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
      <Container>
      <Head>Add Publications</Head>
      <FormContainer>
      <Form onSubmit={this.handleSubmit}>
          <ImageBook>
                  <ImageContainer>
                      <Image/>
                      <Popup
                          trigger={
                              <UploadButton>Upload Image</UploadButton>
                          }
                          overlayStyle = {{padding: '0px', border: 'none',borderRadius:'30px',backgroundColor:'white'}}
                      >
                          <UploadImage/>
                      </Popup>
                  </ImageContainer>
                  <BookDetailContainer>
                      <Span>
                          Book Title*
                      </Span>
                      <Input type="text" name="Title" style={{marginLeft:"75px", marginTop:"30px", marginBottom:'10px'}} /><br/>

                      <Span>Author(s)*</Span>
                      <Input type="text" name="Authors" onChange={this.handleChange} style={{marginLeft:"75px", marginTop:"30px", marginBottom:'10px'}} /><br/>
                      <Span>Publisher(s)</Span>
                      <Input type="text" name="Publisher" onChange={this.handleChange} style={{marginLeft:"65px", marginTop:"30px", marginBottom:'10px'}} /><br/>
                      <Span>Edition_Number</Span>
                      <Input type="number" name="Edition_Number" onChange={this.handleChange} style={{marginLeft:"30px", marginTop:"30px", marginBottom:'10px'}} /><br/>
                      <Span>Year</Span>
                      <Input type="number" name="Year_Publication" onChange={this.handleChange} style={{marginLeft:"125px", marginTop:"30px", marginBottom:'10px'}}  /><br/>
                      <Span>Genres*</Span>
                      <Input type="text" name="Genres" onChange={this.handleChange} style={{marginLeft:"98px", marginTop:"30px", marginBottom:'10px'}} /><br/>
                      <Span>Language*</Span>
                      <Input type="text" name="Lang" onChange={this.handleChange} style={{marginLeft:"75px", marginTop:"30px", marginBottom:'10px'}} /><br/>
                      <Span>ISBN</Span>
                      <Input type="number" name="ISBN"  onChange={this.handleChange} style={{marginLeft:"130px", marginTop:"30px", marginBottom:'10px'}}/><br/>
                      <Span>Related</Span>
                      <Input type="text" name="Related" onChange={this.handleChange} style={{marginLeft:"105px", marginTop:"30px", marginBottom:'10px'}} /><br/>
                  </BookDetailContainer>
              </ImageBook>
              <EditorContainer>
                  <IdTextContainer>
                  <Text>Description</Text>
                  <PublicationsID>Publication ID:1231284793</PublicationsID>
                  </IdTextContainer>
              <Submit type="submit" value="Submit" />
              <Editor
                  value={this.state.Description}
                  apiKey="dn8136u1fhyng3ughxdyzfw93m38430c67msp493v583itva"
                  init={{
                      height: 500,
                      width: 1256,
                      //plugins: "image",
                      toolbar: "bold italic", // image",
                      menubar: false,
                      toolbar_location: "bottom",
                  }}
                  onEditorChange={this.handleEditorChange}
                  />
              </EditorContainer>
      </Form>

      </FormContainer>
  </Container>
        );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);


const Container = styled.div`

`
const Head = styled.h2`
    margin:30px 50px 20px 50px;
    display:flex;
    justify-content:center;
    align-items:center;
    width: 1319px;
    height: 80px;
    color:white;

    background: #03204C;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
`
const FormContainer = styled.div`
    background: #DCF2F8;
    border-radius: 16px;
    width: 1320px;
    height: 1394px;
    margin-left:50px;
    margin-right:50px;
    margin-top:50px;
    margin-bottom:100px;
`
const Form = styled.form`

`
const Span = styled.span`
    margin-top:30px;

`
const Input = styled.input`
    width: 400px;
    height: 40px;
    background: #F9F7FC;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    border:2px solid #ccc;
    :focus{
        outline:2px;   
    }
`
const ImageBook = styled.div`
    display:grid;
    grid-template-columns: auto 800px;
`
const ImageContainer = styled.div`
    position: relative;
    color: white;
    margin:30px 30px 30px 30px;

`
const Image = styled.img`
    height: 624px;
    width:650px;

    background: linear-gradient(135deg, #04396B 0%, #E9ACFF 95.31%);
    border-radius: 16px 16px 0px 0px;

`
const UploadButton = styled.button`
    bottom: 10px;
    position: relative;
    width: 650px;
    height: 61px;
    left: 0px;
    margin-left:0px;
    color:white;    
    background: #03204C;

`
const BookDetailContainer = styled.div`
 diplay:flex;
 margin-left:10px;
`
const EditorContainer = styled.div`
    position:relative;
    margin-left:30px;
    

`
const Submit = styled.input`
    position: absolute;
    bottom:20px;
    right: 135px;
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
const IdTextContainer = styled.div`
    display:flex;
    align-items:center;
    
`
const PublicationsID = styled.h6`
    font-size:20px;
    margin-left:150px;
`
const Text = styled.h5`
    background:#03204C;
    color:white;
    width:250px;
    height:40px;
    display:flex;
    font-size:20px;
    justify-content:center;
    align-items:center;
    margin:2px 0px 5px 0px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;

`


















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