import React, { Component } from "react";
import { render } from "react-dom";
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class App extends Component{
  
constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { dummy : '' };
}

handleChange = (event) =>{
    this.setState({ [event.target.name]:event.target.value });
}

handleSubmit = (event) =>{
  event.preventDefault();
  //const url = "api/accounts/modapps";
  const data = { dummy:this.state.dummy };
  
  axios.post(`api/register/logout`, {data} )
    .then(res => console.log(res))
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success', response));
}
    
  render(){
    return(
        <form onSubmit={this.handleSubmit}>
        <input type="hidden" value={this.state.dummy}/>
        <input type="submit" value="Logout" />
        </form>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);