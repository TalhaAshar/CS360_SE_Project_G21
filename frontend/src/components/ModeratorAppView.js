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
            <Header><h1>Moderator Application</h1></Header>
            <View>
                <Name >Name</Name>
                <NameText>{app.Name}</NameText>
                <Location>Location</Location>
                <LocationText>{app.Location}</LocationText>
                <Why>Why do you want to be a moderator?</Why>
                <WhyText>{app.Reason}</WhyText>
                <Qualifications>Describe your qualifications.</Qualifications>
                <QualificationsText dangerouslySetInnerHTML={{ __html:app.Description}} />
                <ButtonContainer>
                  <AcceptedContainer onClick={() => changeStatus("accept")}>
                      <AcceptedTextContainer >Accepted</AcceptedTextContainer>
                  </AcceptedContainer>

                  <RejectedContainer onClick={() => changeStatus("reject")}>
                      <RejectedTextContainer >Rejected</RejectedTextContainer>
                  </RejectedContainer>
                </ButtonContainer>
            </View>
        </Container>
    )
}

export default ModAppView

const Container = styled.div`
max-width:100%;
max-height:100%;
background:white;
padding-bottom:5%;

`
const Header = styled.h3`
background: #0A3977;
border-radius:20px;
color:white;
min-width: 55%;
display:flex;
justify-content:center;
align-items:center;
margin-left: 3%;
margin-right: 3%;
margin-top: 2%;
margin-bottom: 2%;
`
const View = styled.h3`
  margin-left: 3%;
  margin-right: 3%;
  max-width: 100%;
  max-height: 100%;
  margin-top: 2%;
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
margin-top:-6.5%;
padding-top:2%;
font-weight:Bold;
font-size:22px;
@media only screen and (max-width: 900px) {
  margin-top:-12%;
}
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
width: 100%;
margin-left:5%;
margin-top: 3%;
display:flex;
word-break:break-word;
font-weight:Normal;
font-size:18px;`

const QualificationsText = styled.text`
position:relative;
width: 100%;
height:100%;
margin-left:5%;
margin-top: 1%;
display:flex;
flex-flow:row wrap;
word-break:break-word;
font-weight:Normal;
font-size:18px;`

const AcceptedContainer = styled.div`
height: 35px;
position:relative;
display:flex; 
width:90px;
border-radius:5px; 
background: #06AF47;
cursor: pointer;
`
const AcceptedTextContainer = styled.text`
color:white;
align:center;
font-style: normal;
font-weight: bold;
display: flex;
align-items: center;
text-align: center;
letter-spacing: -1px;
padding-right:2%;
color: #FFFFFF;
`

const RejectedContainer = styled.div`
height: 35px;
position:relative;
display:flex; 
width:90px;
border-radius:5px; 
background: #CC0C0C;
margin-left:2%;
cursor: pointer;
align-items:center;
`
const RejectedTextContainer = styled.text`
color:white;
align:center;
font-style: normal;
font-weight: bold;
text-align: center;
letter-spacing: -1px;
margin-left:2%;
color: #FFFFFF;
`
const ButtonContainer = styled.div`
  display:flex;
  justify-content:flex-end;
  padding-right:2%;
  padding-bottom:2%;
`