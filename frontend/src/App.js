import './App.css';
import Header from './components/Header';
import HeaderUser from './components/HeaderUser';
import {HashRouter as Router, Route, Switch , Link} from 'react-router-dom'
import styled from 'styled-components'
import Home from './components/Home'
import Footer from './components/Footer'
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
import Columnar from "./components/publications/Publications";
import {useEffect, useState} from "react";
import axios from 'axios';
import { ContactSupportOutlined } from '@material-ui/icons';
import Search from "./components/SearchPage";
import ReportPublication from "./components/forms/ReportPublication";
import ReportHistory from "./components/ReportUser";
import ModHistory from "./components/ModAppHistoryUser";
import ModeratorAppForm from "./components/forms/ModeratorAppForm";
import PubActivity from "./components/PubActivity";
import AccountRemoval from "./components/AccountRemovalList";
import ForumGuest from "./components/forum/ForumGest";
import ForumUser from "./components/forum/ForumLoggedIn";
import ThreadAdmin from "./components/ThreadAdminView";
import ThreadGuest from "./components/ThreadGuestView";
import ReportThread from "./components/forms/ReportThread";
import EditPublication from "./components/publications/EditPublication";
import AddPublication from "./components/publications/AddPublication";
import MyActivity from "./components/MyActivity";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
//import profile

function App() {

  const [auth, setAuth] = React.useState([{'Status' : ''}])

    useEffect(() => {
      let isComponentMounted = true;
      axios.get(`api/register/auth`).then((res) => {
          if (isComponentMounted){
          setAuth(res.data)
          };
          console.log('ye boi', res.data)
      })
      .catch(error => console.log('Error:', error))
      return () => {
          isComponentMounted = false;
      }
    }, [])

    function handleChange(newAuth){
      console.log("APP JS", auth)
      setAuth(newAuth)
    }


    //console.log(auth.Status)
  return (
    <Router>
      <Container>
       {(auth["Status"] == 'Unauthentic' || auth["Status"] == '') &&
      <Header auth={auth} onChange={handleChange}/>
       }
       {
         auth["Status"] == 'Authentic' &&
         <HeaderUser auth={auth} onChange={handleChange}/>
       }
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
           
          <Route exact path="/Columnar/">
            <Columnar logged={auth["Status"]}/>
          </Route>

          <Route exact path="/Catalogue/">
            <Catalogue/>
          </Route>

          <Route path="/publication/:id">
            {console.log("single")}
            <SinglePub />  
          </Route>

          <Route exact path="/thread/add">
            <Thread />
          </Route>

          <Route path="/thread/user/:id" component={(props) => <ThreadAdmin {...props} />} /> 

          <Route path="/thread/guest/:id" component={(props) => <ThreadGuest {...props} />} /> 
          
          <Route exact path="/List">
            <List />  
          </Route>

          <Route path="/searched/:param">
            {console.log("IM HERE")}
            <Search />  
          </Route>

          <Route path="/contributions">
            {console.log("IM HERE")}
            <PubActivity />  
          </Route>

          <Route path="/my_activity">
            {console.log("IM HERE")}
            <MyActivity />  
          </Route>

          <Route path="/addpublication">
            <AddPublication />  
          </Route>

          <Route exact path="/editpublication" component={(props) => <EditPublication {...props}/>} />

          <Route exact path="/reportpublication" component={(props) => <ReportPublication {...props}/>} />

          <Route exact path="/reportpost" component={(props) => <ReportThread {...props}/>} />

          <Route exact path="/reports" component={(props) => <ReportHistory {...props}/>} />

          <Route exact path="/modhist" component={(props) => <ModHistory {...props}/>} />

          <Route exact path="/modapps">
            <ModeratorAppForm />
          </Route>

          <Route exact path="/remove_account/admin">
            <AccountRemoval />
          </Route>

          <Route exact path="/forum/guest">
            <ForumGuest />
          </Route>

          <Route exact path="/forum/user">
            <ForumUser />
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
