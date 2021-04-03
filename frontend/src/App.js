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
import List from "./components/publications/PersonalizedListGuest";
import Thread from "./components/forms/ThreadAdd";
import SinglePub from "./components/publications/PubSinglePage";
import {useEffect, useState} from "react";
import axios from 'axios';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
//import profile

function App() {

  const [pubs, setPubs] = React.useState([{'Status' : ''}])
  console.log(pubs)

    function getData(){
        axios.get(`api/register/auth`).then((res) => {
            setPubs(res.data)
            console.log('ye boi', res.data)
            console.log('nu boi', pubs.length)
        })
        .catch(error => console.log('Error:', error))
    }

    useEffect(() => {
        getData()
    }, [])

  return (
    <Router>
      <Container>
      
      <Header check={pubs.Status}/>

        <Switch>

          <Route exact path="/">
          {console.log("HOME PAGE")}
            <Home/>
          </Route>

          <Route exact path="/Publications">
            <Publications />
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
            <List />  
          </Route>

          <Route path="/publication/:id">
            {console.log("single")}
            <SinglePub />  
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
