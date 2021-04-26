import './App.css';
import Header from './components/Header';
import HeaderUser from './components/HeaderUser';
import {HashRouter as Router, Route, Switch , Link} from 'react-router-dom'
import styled from 'styled-components'
import Home from './components/Home'
import Footer from './components/Footer'
import React, {Component} from "react"
import ContactUs from "./components/forms/ContactUs";
import DMCA from "./components/forms/TakedownRequest";
import List from "./components/publications/PersonalizedListUserRead";
import Thread from "./components/forms/ThreadAdd";
import SinglePub from "./components/publications/PubSinglePage";
import Profile from "./components/Profile";
import ProfileManagement from "./components/ProfileManagement";
import Catalogue from "./components/publications/PublicationsList";
import Columnar from "./components/publications/Publications";
import {useEffect, useState} from "react";
import axios from 'axios';
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
import ProfileGuest from "./components/ProfileGuest";
import ListGuest from "./components/publications/PersonalizedListGuest"
import MyActivity from "./components/MyActivity";
import ForumCategoryUser from "./components/forum/ThreadCategoryUser";
import ResolvePubReport from "./components/PubReportView";
import ResolvePostReport from "./components/ThreadReportView";
import ResolveModApp from "./components/ModeratorAppView";
import Notification from "./components/Notifications";
import Blacklist from "./components/Blacklist";


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function App() {

  const [auth, setAuth] = React.useState([{'Status' : ''}])

    useEffect(() => {
      let isComponentMounted = true;
      axios.get(`api/register/auth`).then((res) => {
          if (isComponentMounted){
          setAuth(res.data)
          };
      })
      .catch(error => console.log('Error:', error))
      return () => {
          isComponentMounted = false;
      }
    }, [])

    function handleChange(newAuth){
      console.log("Am here again")
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
            <Home/>
          </Route>

          <Route exact path="/Contact">
            <ContactUs />
          </Route>

          <Route exact path="/DMCA">
            <DMCA />
          </Route>

          <Route exact path="/UserAccount">
            <Profile /> 
          </Route>

          <Route path="/profile/:id">
            <ProfileGuest /> 
          </Route>

           <Route exact path="/management">
            <ProfileManagement onChange={handleChange}/> 
          </Route> 
           
          <Route exact path="/Columnar/">
            <Columnar />
          </Route>

          <Route exact path="/Catalogue/">
            <Catalogue />
          </Route>

          <Route path="/publication/:id">
            <SinglePub />  
          </Route>

          <Route exact path="/thread/add">
            <Thread />
          </Route>

          <Route path="/thread/user/:id" component={(props) => <ThreadAdmin {...props} />} /> 

          <Route path="/thread/guest/:id">
            <ThreadGuest />
          </Route>
          
          <Route exact path="/List">
            <List />  
          </Route>

          <Route path="/List/guest/:id">
            <ListGuest />
          </Route>

          <Route path="/searched/:param">
            <Search />  
          </Route>

          <Route path="/contributions">
            <PubActivity />  
          </Route>

          <Route path="/my_activity">
            <MyActivity />  
          </Route>

          <Route path="/addpublication">
            <AddPublication />  
          </Route>

          <Route exact path="/editpublication" component={(props) => <EditPublication {...props}/>} />

          <Route exact path="/reportpublication" component={(props) => <ReportPublication {...props}/>} />

          <Route exact path="/reportpost" component={(props) => <ReportThread {...props}/>} />

          <Route exact path="/reports">
            <ReportHistory />
          </Route >

          <Route exact path="/modhist">
            <ModHistory />
          </Route> 

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

          <Route path="/forum/category/:category">
            <ForumCategoryUser />
          </Route>

          <Route path="/resolve/report/publication/:id">
            <ResolvePubReport />
          </Route>

          <Route path="/resolve/report/post/:id">
            <ResolvePostReport />
          </Route>

          <Route path="/resolve/modapp/:id">
            <ResolveModApp />
          </Route>

          <Route exact path="/notifications">
            <Notification />
          </Route>

          <Route exact path="/blacklist">
            <Blacklist />
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
height:100%;
display: grid;
grid-template-rows: 115px auto 110px;
`
