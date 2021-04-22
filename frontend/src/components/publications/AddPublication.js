import React, { Component } from "react";
import { render } from "react-dom";
// import fetch from 'cross-fetch';
import { Editor } from "@tinymce/tinymce-react";
import axios from 'axios';
import Pop from "./Modal";
import styled from 'styled-components'
import AddPublicationFeedbackPopup from '../functionality/AddPublicationFeedbackPopup';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class App extends Component{
  
constructor(props){
    super(props);
    this.onFrontChange = this.onFrontChange.bind(this);
    this.onBackChange = this.onBackChange.bind(this);
    this.onSpineChange = this.onSpineChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { ID:0, Title:'', Authors:'', Publisher:'', Edition_Number:'', Year_Publication:'', Genres:'',  Lang:'', ISBN:'', Related:'', Description:'', Display: null, Front_Cover: null, Back_Cover: null, Spine: null, Pop: false, invalid: false, seen: false };
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
        Display: URL.createObjectURL(img)
      });
    }
};
  
onBackChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        Back_Cover: img,
        Display: URL.createObjectURL(img)
      });
    }
};

onSpineChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        Spine: img,
        Display: URL.createObjectURL(img)
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

  if (this.state.Front_Cover == null) {
    this.setState({ invalid:true })
  } else if (this.state.Back_Cover == null) {
    this.setState({ invalid:true })
  } else if (this.state.Spine == null) {
    this.setState({ invalid:true })
  }

  formData.append("Front_Cover", this.state.Front_Cover, this.state.Front_Cover.name);
  formData.append("Back_Cover", this.state.Back_Cover, this.state.Back_Cover.name);
  formData.append("Spine", this.state.Spine, this.state.Spine.name);

  axios.post(`api/main/add_publication`, formData, { headers: { 'content-type': 'multipart/form-data' } })
    .then(res => this.setState({seen:true, invalid:true, ID: res.data['id']}))
    .catch(error => this.setState({invalid:true}))
    .then(response => console.log("huh"));
  }
    
  render(){
    return(
      <Container>
      <Head>Add Publication</Head>
      <FormContainer>
      <Form onSubmit={this.handleSubmit}>
          <ImageBook>
                  <ImageContainer>
                      { (this.state.Display == null) && <Image/> }
                      { (this.state.Display != null) && <Image src={this.state.Display} /> }
                      <UploadButton onClick={this.handleClick}>Upload Image</UploadButton>
                      <Pop trigger={this.state.Pop} setTrigger={this.handleClick} FFunc={this.onFrontChange} SFunc={this.onSpineChange} BFunc={this.onBackChange}>
                            <h1>My pop up for image</h1>
                      </Pop>
                  </ImageContainer>
                  <BookDetailContainer>
                      <Span>
                          Book Title*
                      </Span>
                      <Input type="text" required name="Title" maxLength="150" onChange={this.handleChange} style={{marginLeft:"75px", marginTop:"30px", marginBottom:'10px'}} /><br/>
                      <Span>Author(s)*</Span>
                      <Input type="text" required name="Authors" maxLength="255" onChange={this.handleChange} style={{marginLeft:"75px", marginTop:"30px", marginBottom:'10px'}} /><br/>
                      <Span>Publisher(s)</Span>
                      <Input type="text" name="Publisher" maxLength="255" onChange={this.handleChange} style={{marginLeft:"65px", marginTop:"30px", marginBottom:'10px'}} /><br/>
                      <Span>Edition_Number</Span>
                      <Input type="number" name="Edition_Number" min="1" max="999999" onChange={this.handleChange} style={{marginLeft:"30px", marginTop:"30px", marginBottom:'10px'}} /><br/>
                      <Span>Year of Publication</Span>
                      <Input type="number" name="Year_Publication" min="1" max="9999" onChange={this.handleChange} style={{marginLeft:"15px", marginTop:"30px", marginBottom:'10px'}}  /><br/>
                      <Span>Genres*</Span>
                      <Input type="text" required name="Genres" maxLength="255" onChange={this.handleChange} style={{marginLeft:"98px", marginTop:"30px", marginBottom:'10px'}} /><br/>
                      <Span>Language*</Span>
                      <Input type="text" required name="Lang" maxLength="30" onChange={this.handleChange} style={{marginLeft:"75px", marginTop:"30px", marginBottom:'10px'}} /><br/>
                      <Span>ISBN</Span>
                      <Input type="number" name="ISBN" min="1" max="9999999999999" onChange={this.handleChange} style={{marginLeft:"130px", marginTop:"30px", marginBottom:'10px'}}/><br/>
                      <Span>Related Publications IDs</Span>
                      <Input type="text" name="Related" onChange={this.handleChange} style={{marginLeft:"105px", marginTop:"30px", marginBottom:'10px'}} /><br/>
                  </BookDetailContainer>
              </ImageBook>
              <EditorContainer>
                  <IdTextContainer>
                    <Text>Description</Text>
                    { (this.state.invalid && !this.state.seen) && <ErrorText>Either images are not uploaded or Description is empty.</ErrorText> }
                  </IdTextContainer>
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
                { (!this.state.seen || !this.state.invalid) ? <Submit type="submit" value="Submit" /> : null }
                { (this.state.seen && this.state.invalid) ? <AddPublicationFeedbackPopup toggle={this.togglePop} PubID={this.state.ID} /> : null }
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
    max-height:100%;
    margin-left:3%;
    margin-right:3%;
`
const Head = styled.h2`
    min-width: 55%;
    min-height: 4%;
    margin-top: 2%;
    display:flex;
    justify-content:center;
    align-items:center;
    color:white;
    background: #03204C;
    border-radius: 8px;
`
const FormContainer = styled.div`
    max-width: 100%;
    max-height: 100%;
    margin-top: 2%;
    display:flex;
    justify-content:space-between;
    background:#DCF2F8;
    border-radius: 16px;
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