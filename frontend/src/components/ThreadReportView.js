import React from 'react';
import styled from 'styled-components';
import {useEffect, useState} from "react";
import axios from 'axios';
import { useLocation, useParams} from "react-router-dom";
import { useHistory } from "react-router-dom";
import ReportHistoryFeedbackPopup from "./functionality/ReportHistoryFeedbackPopup"

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


function ThreadReportView() {

  const [report, setReport] = useState({'Reason' : '', 'Description' : ''})
  const { id } = useParams();
  const history = useHistory();
  const [seen, setSeen] = useState(false)

  function togglePop () {
    setSeen(!seen)
  }

  useEffect(() => {
    let isComponentMounted = true;
    let url = "api/accounts/reports/" + id
    axios.get(url).then((res) => {
        if (isComponentMounted){
            setReport(res.data)
        };
    })
    .catch(error => console.log('Error:', error))

    return () => {
        isComponentMounted = false;
    }
  }, [id])

  function removeItem(){
    let url = "api/forum/post/delete/" + report.Relevant_Post + "/" + report.Relevant_Thread

    axios.post(url).then((res) => {
      console.log("")
    })
    .catch(error => console.log('Error:', error))

    url = "api/accounts/reports/" + id
    axios.post(url).then((res) => {
      history.push("/reports")
    })
    .catch(error => console.log('Error:', error))
  }

  function changeStatus(){
    let url = "api/accounts/reports/" + id
    axios.post(url).then((res) => {
      history.push("/reports")
    })
    .catch(error => console.log('Error:', error))
  }

    return (
        <Container>
            <Header><h1>Reported Post</h1></Header>
            <View>
                <Reason>Reason</Reason>
                <ReasonText>{report.Reason}</ReasonText>
                <Details>Provide a description of the offence caused.</Details>
                <DetailsText dangerouslySetInnerHTML={{ __html:report.Description}} />
                
                <ButtonContainer>
                  <RemoveItemContainer>
                    <RemoveItemTextContainer onClick={togglePop}>Remove</RemoveItemTextContainer>
                  </RemoveItemContainer>
                  { seen ? <ReportHistoryFeedbackPopup toggle={togglePop} remove={removeItem}/> : null }
                  <IgnoreContainer onClick={changeStatus}>
                    <IgnoreTextContainer>Ignore</IgnoreTextContainer>
                  </IgnoreContainer>
                </ButtonContainer>
            </View>
        </Container>
    )
}

export default ThreadReportView

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

const Reason = styled.h3`
position:relative;
margin-left:1%;
padding-top:2%;
font-weight:Bold;
font-size:22px;
`

const Details = styled.h3`
position:relative;
margin-left:1%;
margin-top:10%;
font-weight:Bold;
font-size:22px;
`

const ReasonText = styled.text`
position:relative;
width: 100%;
height:auto;
display:flex;
word-break:break-word;
margin-left:1%;
font-weight:Normal;
font-size:18px;
`

const DetailsText = styled.text`
position:relative;
width:100%;
margin-left:1%;
margin-top: 1%;
display:flex;
flex-flow:row wrap;
word-break:break-word;
font-weight:Normal;
font-size:18px;`

const RemoveItemContainer = styled.div`
height: 35px;
position:relative;
display:flex; 
width:80px;
align:center;
border-radius:5px; 
padding-right:2%;
margin-right:2%;
background: #06AF47;
`
const RemoveItemTextContainer = styled.text`
color:white;
align:center;
font-style: normal;
font-weight: bold;
display: flex;
align-items: center;
text-align: center;
padding-right:2%;
letter-spacing: -1px;

color: #FFFFFF;
`

const IgnoreContainer = styled.div`
height: 35px;
position:relative;
display:flex; 
width:80px;
align:center;
border-radius:5px; 
background: #CC0C0C;
padding-left:1%;
`
const IgnoreTextContainer = styled.text`
color:white;
align:center;
font-style: normal;
font-weight: bold;

align-items: center;
text-align: center;
letter-spacing: -1px;

color: #FFFFFF;
`
const ButtonContainer = styled.div`
  display:flex;
  justify-content:flex-end;
  padding-right:2%;
  padding-bottom:2%;
`