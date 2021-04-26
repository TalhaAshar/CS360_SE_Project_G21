import React from 'react';
import styled from 'styled-components';
import {useEffect, useState} from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useLocation, useParams} from "react-router-dom";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


function ModAppView() {

  const [app, setApp] = useState({'Reason' : '', 'Description' : '', 'Name' : '', 'Location' : '', })
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    let isComponentMounted = true;
    let url = "api/accounts/modapps/" + id
    axios.get(url).then((res) => {
        if (isComponentMounted){
            setApp(res.data)
        };
    })

    return () => {
        isComponentMounted = false;
    }
  }, [id])


  function changeStatus(choice){
    let url = "api/accounts/modapps/" + id + "/" + choice
    axios.post(url).then((res) => {
      history.push("/modhist")
    })
  }

    return (
        <Container>
            <Header>Moderator Application</Header>
            <View>
                <Name >Name</Name>
                <NameText>{app.Name}</NameText>
                <Location>Location</Location>
                <LocationText>{app.Location}</LocationText>
                <Why>Why do you want to be a moderator?</Why>
                <WhyText>{app.Reason}</WhyText>
                <Qualifications>Describe your qualifications.</Qualifications>
                <QualificationsText dangerouslySetInnerHTML={{ __html:app.Description}} />
                <AcceptedContainer onClick={() => changeStatus("accept")}>
                    <AcceptedTextContainer >Accepted</AcceptedTextContainer>
                </AcceptedContainer>

                <RejectedContainer onClick={() => changeStatus("reject")}>
                    <RejectedTextContainer >Rejected</RejectedTextContainer>
                </RejectedContainer>
            </View>
        </Container>
    )
}

export default ModAppView

const Container = styled.div`
  margin-left:11%;
  height: 0 auto; 
`
const Header = styled.h3`
  width:1040px;
  height:50px;
  margin-top:30px;
  margin-left:5px;
  display:flex;
  font-size:25px;
  justify-content:center;
  align-items:center;
  color:white;
  background: #03204C;
  border-radius: 8px;
`
const View = styled.h3`
width: 1050px;
height: 900px;
justify-content:space-between;
background:#DCF2F8;
border-radius: 16px;
`

const Name = styled.h3`
position:relative;
margin-left:5%;
padding-top:2%;
font-weight:Bold;
font-size:22px;
`

const Location = styled.h3`
position:relative;
margin-left:60%;
margin-top:-6.75%;
font-weight:Bold;
font-size:22px;
`

const Why = styled.h3`
position:relative;
margin-left:5%;
margin-top:5%;
font-weight:Bold;
font-size:22px;
`

const Qualifications = styled.h3`
position:relative;
margin-left:5%;
margin-top:10%;
font-weight:Bold;
font-size:22px;
`

const NameText = styled.text`
position:relative;
width: 450px;
height: 0 auto;
display:flex;
word-break:break-word;
margin-left:5%;
font-weight:Normal;
font-size:18px;
`

const LocationText = styled.text`
position:relative;
width: 400px;
margin-left:60%;
display:flex;
word-break:break-word;
font-weight:Normal;
font-size:18px;`

const WhyText = styled.text`
position:relative;
width: 900px;
margin-left:5%;
margin-top: 3%;
display:flex;
word-break:break-word;
font-weight:Normal;
font-size:18px;`

const QualificationsText = styled.text`
position:relative;
width: 900px;
margin-left:5%;
margin-top: 1%;
display:flex;
word-break:break-word;
font-weight:Normal;
font-size:18px;`

const AcceptedContainer = styled.div`
height: 35px;
position:relative;
display:flex; 
width:90px;
align:center;
margin-left:70%;
margin-top:40%;
border-radius:5px; 
background: #06AF47;
cursor: pointer;
`
const AcceptedTextContainer = styled.text`
color:white;
align:center;
font-style: normal;
font-weight: bold;
margin-left:9%;

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
margin-left:85%;
margin-top:-3.5%;
border-radius:5px; 
background: #CC0C0C;
cursor: pointer;
`
const RejectedTextContainer = styled.text`
color:white;
align:center;
font-style: normal;
font-weight: bold;
margin-left:10%;
margin-top:8%;

align-items: center;
text-align: center;
letter-spacing: -1px;

color: #FFFFFF;
`