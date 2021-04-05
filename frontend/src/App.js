import './App.css';
import Header from './components/Header'
import {HashRouter as Router, Route, Switch , Link} from 'react-router-dom'
import styled from 'styled-components'
import Home from './components/Home'
import Footer from './components/Footer'
import LogIn from './components/LogIn'
import React, {Component} from "react"
import Forum from "./components/ForumGest";
import ContactUs from "./components/forms/ContactUs";
import DMCA from "./components/forms/TakedownRequest";
import Publications from "./components/publications/Publications";
import List from "./components/publications/PersonalizedListUserRead";
import Thread from "./components/forms/ThreadAdd";
import SinglePub from "./components/publications/PubSinglePage";
import Profile from "./components/Profile";
import ProfileManagement from "./components/ProfileManagement";
import Catalogue from "./components/publications/PublicationsList";
import {useEffect, useState} from "react";
import axios from 'axios';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
//import profile

function App() {

  const [auth, setAuth] = React.useState([{'Status' : ''}])

    function getData(){
        axios.get(`api/register/auth`).then((res) => {
            setAuth(res.data)
            //console.log('ye boi', res.data)
            //console.log('nu boi', auth.length)
        })
        .catch(error => console.log('Error:', error))
    }

    useEffect(() => {
        getData()
    }, [])

    function handleChange(newAuth){
      console.log("APP JS", auth)
      setAuth(newAuth)
    }


    //console.log(auth.Status)
  return (
    <Router>
      <Container>
      <Header auth={auth} onChange={handleChange}/>
        <Switch>

          <Route exact path="/">
          {console.log("HOME PAGE")}
            <Home/>
          </Route>

          <Route exact path="/Forum">
            {console.log("FORUM INSIDE")}
            <Forum />
          </Route>

          <Route exact path="/Contact">
            {console.log("CONTACT INSIDE")}
            <ContactUs />
          </Route>

          <Route exact path="/DMCA">
            {console.log("CONTACT INSIDE")}
            <DMCA />
          </Route>

          <Route exact path="/UserAccount">
            {console.log("CONTACT INSIDE")}
            <Profile /> 
          </Route>

           <Route exact path="/management">
            {console.log("CONTACT INSIDE")}
            <ProfileManagement /> 
          </Route> 
           
          <Route path="/Publications/:id">
            <Catalogue />
          </Route>

          <Route path="/publication/:id">
            {console.log("single")}
            <SinglePub />  
          </Route>
          
          <Route path="/List">
            <List />  
          </Route>
          
        </Switch>

      <Footer/>
      
      </Container>
    </Router>
  );
}

export default App;
//the whole page container
const Container = styled.div`
width:100%;
height:1580px;
display: grid;
grid-template-rows: 115px auto 110px;
`
