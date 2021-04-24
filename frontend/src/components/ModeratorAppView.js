import React, { Component } from "react";
import { render } from "react-dom";
// import fetch from 'cross-fetch';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from 'axios';
import { useLocation, useParams} from "react-router-dom";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


function ModAppView() {

  const [app, setApp] = useState({'Reason' : '', 'Description' : '', 'Name' : '', 'Location' : '', })
  const { id } = useParams();


  useEffect(() => {
    let isComponentMounted = true;
    let url = "api/accounts/modapps/" + id
    axios.get(url).then((res) => {
        if (isComponentMounted){
            setApp(res.data)
        };
    })
    .catch(error => console.log('Error:', error))

    return () => {
        isComponentMounted = false;
    }
  }, [id])


  function changeStatus(choice){
    let url = "api/accounts/modapps/" + id + "/" + choice
    axios.post(url).then((res) => {
      console.log("The state was changed")
    })
    .catch(error => console.log('Error:', error))
  }


    return(
      <Container>

        <Head>Moderator Application</Head>

        <FormContainer>

            <UserInfo>
              <Span>Full Name</Span>
              <Span>Location</Span>
              <Name>{app.Name}</Name>              
              <Location>{app.Location}</Location>
              <Span>Why do you want to be a moderator?</Span><br/>
              <Why>{app.Reason}</Why>  
              <Span style = {{marginTop:'25%',position:'relative',marginLeft:'-100%'}}>Describe your qualifications.</Span>
              <Qualifications style = {{wordWrap:'break-word'}} dangerouslySetInnerHTML={{ __html:app.Description}} /> 
            </UserInfo>

            <AcceptedContainer>
              <AcceptedTextContainer onClick={() => changeStatus("accept")}>Accepted</AcceptedTextContainer>
            </AcceptedContainer>

            <RejectedContainer>
              <RejectedTextContainer onClick={() => changeStatus("reject")}>Rejected</RejectedTextContainer>
            </RejectedContainer>

        </FormContainer> 

      </Container>
        )
}

export default ModAppView

const Container = styled.div`
  margin-left:150px;
  margin-right:150px;

`
const Head = styled.h3`
  width:1040px;
  height:50px;
  margin-top:30px;
  margin-left:5px;
  display:flex;
  justify-content:center;
  align-items:center;
  color:white;
  background: #03204C;
  border-radius: 8px;
`
const FormContainer = styled.div`
  width: 1050px;
  height: 900px;
  margin-top:20px;
  display:flex;
  justify-content:space-between;
  background:#DCF2F8;
  border-radius: 16px;

`
const Name = styled.text`
font-weight:Normal;
font-size:18px;
margin-top:2%
`
const Location = styled.text`
font-weight:Normal;
font-size:18px;
margin-top:2%
`

const Why = styled.text`
font-weight:Normal;
font-size:18px;
margin-top:2%
`

const Qualifications = styled.text`
font-weight:Normal;
font-size:18px;
`

const UserInfo = styled.div`
  display:grid;
  grid-template-rows:20px 60px 20px 200px;
  grid-template-columns:500px 500px;
  margin-top:20px;
  padding-left:50px;
`

const Span = styled.span`
  font-weight:bold;
  font-size:20px;
  
`

const AcceptedContainer = styled.div`
height: 35px;
position:relative;
display:flex; 
width:90px;
align:center;
margin-top:80%;
margin-left:-30%;
border-radius:5px; 
background: #06AF47;
`
const AcceptedTextContainer = styled.text`
color:white;
align:center;
font-style: normal;
font-weight: bold;
margin-left:15%;

display: flex;
align-items: center;
text-align: center;
letter-spacing: -1px;

color: #FFFFFF;
`

const RejectedContainer = styled.div`
height: 35px;
position:relative;
display:flex; 
width:90px;
align:center;
margin-left:-5%;
margin-top:80%;
margin-right:2%;
border-radius:5px; 
background: #CC0C0C;
`
const RejectedTextContainer = styled.text`
color:white;
align:center;
font-style: normal;
font-weight: bold;
margin-left:15%;
margin-top:8%;

align-items: center;
text-align: center;
letter-spacing: -1px;

color: #FFFFFF;
`