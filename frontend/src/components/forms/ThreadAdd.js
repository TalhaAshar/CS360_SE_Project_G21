import React, { Component } from "react";
import { render } from "react-dom";
// import fetch from 'cross-fetch';
import { Editor } from "@tinymce/tinymce-react";
import axios from 'axios';

import styled from 'styled-components';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

// const Container = styled.div`
// `;

// const HeaderContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-contents: center;
//   margin: 40 40 40 40;
// `;

// const ThreadAddContainer = styled.h1`
// `;

// const BoxContainer = styled.div`
// `;

// const TitleContainer = styled.div`
// `;

// const TitleWitleContainer = styled.h3`
// `;

// const TitleInputContainer = styled.div`
// `;

// const CategoryContainer = styled.div`
// `;

// const CatContainer = styled.h3`
// `;

// const CatSajidContainer = styled.div`
// `;

// const BodyContainer = styled.div`
// `;

// const SubmitbuttonContainer = styled.div`
// `;

// const SubmitContainer = styled.h4`
// `;

class App extends Component{
constructor(props){
    super(props);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { Title:'', Category:'Announcements', Body:'You need to host your image and then upload in this text box.' };
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
  const data = { Title:this.state.Title, Category:this.state.Category, Body:this.state.Body };
  
  axios.post(`api/main/add_publication`, { data })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success', response));
  }
    
  render(){
    return(
      // <Container>
      //   <HeaderContainer>
      //     <ThreadAddContainer>
      //       Thread - Add
      //     </ThreadAddContainer>
      //   </HeaderContainer>
      //   <BoxContainer>
      //     <TitleContainer>
      //       <TitleWitleContainer>
      //         Tital*
      //       </TitleWitleContainer>
      //       <TitleInputContainer>
      //         TitleInput
      //       </TitleInputContainer>
      //     </TitleContainer>
      //     <CategoryContainer>
      //       <CatContainer>
      //         Category
      //       </CatContainer>
      //       <CatSajidContainer>
      //         SAJID IDHAR DROPDOWN MENU ANA HAI
      //       </CatSajidContainer>
      //     </CategoryContainer>
      //     <BodyContainer>
      //       <Editor
      //         value={this.state.Body}
      //         apiKey="dn8136u1fhyng3ughxdyzfw93m38430c67msp493v583itva"
      //         init={{
      //           height: 200,
      //           width: 500,
      //           plugins: "image",
      //           toolbar: "bold italic image",
      //           menubar: false,
      //           toolbar_location: "bottom",
      //         }}
      //         onEditorChange={this.handleEditorChange}
      //       />
      //     </BodyContainer>
      //     <SubmitbuttonContainer>
      //       <SubmitContainer>
      //         Submit
      //       </SubmitContainer>
      //     </SubmitbuttonContainer>
      //   </BoxContainer>
      // </Container>
        <form onSubmit={this.handleSubmit}>
        <span>Title*</span>
        <input type="text" name="Title" onChange={this.handleChange} /><br/>
        <label htmlFor="Category">Category</label>
        <select name="Category" id="Category" value={this.state.Category} onChange={this.handleChange}>
          <option defaultValue="Announcements">Announcements</option>
          <option value="General">General</option>
          <option value="Other">Other</option>
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