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
//import profile

function App() {
  return (
    <Router>
      <Container>
      
      <Header/>

        <Switch>

          <Route exact path="/">
          {console.log("HOME PAGE")}
            <Home/>
          </Route>

          <Route exact path="/Publications">
            Publication
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
