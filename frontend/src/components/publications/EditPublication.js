import React, { Component } from "react";
import { render } from "react-dom";
// import fetch from 'cross-fetch';
import styled from 'styled-components'
import { Editor } from "@tinymce/tinymce-react";
import Pop from "./Modal";
import axios from 'axios';
import EditPublicationFeedbackPopup from '../functionality/EditPublicationFeedbackPopup';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class App extends Component{
  
constructor(props){
    super(props);
    this.ID = props.location.state['id']
    this.onFrontChange = this.onFrontChange.bind(this);
    this.onBackChange = this.onBackChange.bind(this);
    this.onSpineChange = this.onSpineChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { Title:props.location.state['Title'], Authors:props.location.state['Authors'], Publisher:props.location.state['Publisher'], Edition_Number:props.location.state['Edition_Number'], Year_Publication:props.location.state['Year_Publication'], Genres:props.location.state['Genres'],  Lang:props.location.state['Lang'], ISBN:props.location.state['ISBN'], Related:props.location.batchIDs, Description:props.location.state['Description'], Front_Cover:props.location.state['Front_Cover'], Back_Cover:props.location.state['Back_Cover'], Spine:props.location.state['Spine'], Display:props.location.state['Front_Cover'], Pop: false, invalid: false, seen: false, Front_Flag: false, Back_Flag: false, Spine_Flag: false };
}

togglePop = () => {
    this.setState({
      seen: !this.state.seen
    })
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

handleClick = (event) => {
    event.preventDefault();
    this.setState({Pop:!this.state.Pop});
}

onFrontChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        Front_Cover: img,
        Display: URL.createObjectURL(img),
        Front_Flag: true
      });
    }
};
  
onBackChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        Back_Cover: img,
        Display: URL.createObjectURL(img),
        Back_Flag: true
      });
    }
};

onSpineChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        Spine: img,
        Display: URL.createObjectURL(img),
        Spine_Flag: true
      });
    }
};

handleSubmit = (event) =>{
    event.preventDefault();
    const url = "api/main/edit_publication/" + this.ID;
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
    
    if (this.state.Front_Flag) {
        formData.append("Front_Cover", this.state.Front_Cover, this.state.Front_Cover.name);
    } else {
        formData.append("Front_Cover", null);
    }
    
    if (this.state.Back_Flag) {
        formData.append("Back_Cover", this.state.Back_Cover, this.state.Back_Cover.name);
    } else {
        formData.append("Back_Cover", null);
    }

    if (this.state.Spine_Flag) {
        formData.append("Spine", this.state.Spine, this.state.Spine.name);
    } else {
        formData.append("Spine", null);
    }
  
    axios.post(url, formData, { headers: { 'content-type': 'multipart/form-data' } })
    .then(res => this.setState({seen:true, invalid:true}))
    .catch(error => this.setState({invalid:true}))
    .then(response => console.log("huh"));
}
    
  render(){
    return(
      <Container>
      <Head><h1>Edit Publication</h1></Head>
      <FormContainer>
      <Form onSubmit={this.handleSubmit}>
          <ImageBook>
            <ImageContainer>
                      <Image src={this.state.Display} />
                      <UploadButton onClick={this.handleClick}>Upload Image</UploadButton>
                      <Pop trigger={this.state.Pop} setTrigger={this.handleClick} FFunc={this.onFrontChange} SFunc={this.onSpineChange} BFunc={this.onBackChange}>
                      </Pop>
                  </ImageContainer>
            <BookDetailContainer>
                      <Span>
                          Book Title*
                      </Span>
                      <Input type="text" required name="Title" maxLength="150" value={this.state.Title} onChange={this.handleChange} style={{marginLeft:"95px", marginTop:"30px", marginBottom:'10px'}} /><br/>
                      <Span>Author(s)*</Span>
                      <Input type="text" required name="Authors" maxLength="255" value={this.state.Authors} onChange={this.handleChange} style={{marginLeft:"95px", marginTop:"30px", marginBottom:'10px'}} /><br/>
                      <Span>Publisher(s)</Span>
                      <Input type="text" name="Publisher" maxLength="255" value={this.state.Publisher} onChange={this.handleChange}  style={{marginLeft:"85px", marginTop:"30px", marginBottom:'10px'}} /><br/>
                      <Span>Edition_Number</Span>
                      <Input type="number" name="Edition_Number" min="1" max="999999" value={this.state.Edition_Number} onChange={this.handleChange}  style={{marginLeft:"53px", marginTop:"30px", marginBottom:'10px'}} /><br/>
                      <Span>Year of Publication</Span>
                      <Input type="number" name="Year_Publication" min="1" max="9999" value={this.state.Year_Publication} onChange={this.handleChange} style={{marginLeft:"35px", marginTop:"30px", marginBottom:'10px'}}  /><br/>
                      <Span>Genres*</Span>
                      <Input type="text" required name="Genres" maxLength="255" value={this.state.Genres} onChange={this.handleChange} style={{marginLeft:"120px", marginTop:"30px", marginBottom:'10px'}} /><br/>
                      <Span>Language*</Span>
                      <Input type="text" required name="Lang" maxLength="30" value={this.state.Lang} onChange={this.handleChange} style={{marginLeft:"100px", marginTop:"30px", marginBottom:'10px'}} /><br/>
                      <Span>ISBN</Span>
                      <Input type="number" name="ISBN" min="1" max="9999999999999" value={this.state.ISBN} onChange={this.handleChange}  style={{marginLeft:"155px", marginTop:"30px", marginBottom:'10px'}}/><br/>
                      <Span>Related Publications IDs</Span>
                      <Input type="text" name="Related"value={this.state.Related} onChange={this.handleChange}  style={{marginLeft:"5px", marginTop:"30px", marginBottom:'10px'}} /><br/>
                  </BookDetailContainer>
              </ImageBook>
              <EditorContainer>
                  <IdTextContainer>
                      <Text>Description</Text>
                      <PublicationsID>Publication ID: {this.ID}</PublicationsID>
                      { (this.state.invalid && !this.state.seen) && <ErrorText>Description is empty.</ErrorText> }
                  </IdTextContainer>
              <Editor
                  value={this.state.Description}
                  apiKey="dn8136u1fhyng3ughxdyzfw93m38430c67msp493v583itva"
                  init={{
                      height: 500,
                      width: "90%",
                      //plugins: "image",
                      toolbar: "bold italic", // image",
                      menubar: false,
                      toolbar_location: "bottom",
                  }}
                  onEditorChange={this.handleEditorChange}
                  />
                { (!this.state.seen || !this.state.invalid) ? <Submit type="submit" value="Submit" /> : null }
                { (this.state.seen && this.state.invalid) ? <EditPublicationFeedbackPopup toggle={this.togglePop} PubID={this.ID} /> : null }
              </EditorContainer>
      </Form>
      </FormContainer>
  </Container>
);
  }
}

export default App;

const Container = styled.div`
max-width:100%;
height:95%;
margin-left:3%;
margin-right:3%;
margin-top:5%;
margin-bottom:10%;
background:white;
`

const Head = styled.h3`
background: #0A3977;
border-radius:20px;
color:white;
min-width: 55%;
display:flex;
justify-content:center;
align-items:center;
margin-top: 2%;
margin-bottom: 2%;
`

const FormContainer = styled.div`
width: 95%;
height: 85%;
margin-top: 2%;
display:flex;
justify-content:center;
align-items:center;
background:#DCF2F8;
border-radius: 16px;
margin-bottom:5%;
margin-left:3%;
marign-right:3%:
padding-left:5%;
`
const Form = styled.form`
`
const Span = styled.span`
    margin-top:30px;

`
const Input = styled.input`
width: 50%;
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
    width:100%;
    height:60%;
`
const ImageContainer = styled.div`
    position: relative;
    color: white;
    margin:30px 30px 30px 30px;
    width:400px;

`
const Image = styled.img`
    height: 100%;
    width:120%;
    background: linear-gradient(135deg, #04396B 0%, #E9ACFF 95.31%);
    border-radius: 16px 16px 0px 0px;

`
const UploadButton = styled.button`
position: relative;
bottom: 10%;
width: 120%;
height: 10%;
left: 0px;
margin-left:0px;
color:white;    
background: #03204C;
`
const BookDetailContainer = styled.div`
 diplay:flex;
 margin-left:20%;
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

const ErrorText = styled.h6`
    font-size:20px;
    margin-left:350px;
    color: #FF0000;
    position: absolute;
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