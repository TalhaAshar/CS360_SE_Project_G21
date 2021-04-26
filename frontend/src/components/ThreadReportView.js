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
            <Header>Reported Thread/Post</Header>
            <View>
                <Reason>Reason</Reason>
                <ReasonText>{report.Reason}</ReasonText>
                <Details>Provide a description of the offence caused.</Details>
                <DetailsText dangerouslySetInnerHTML={{ __html:report.Description}} />
                <RemoveItemContainer>
                  <RemoveItemTextContainer onClick={togglePop}>Remove</RemoveItemTextContainer>
                </RemoveItemContainer>
                { seen ? <ReportHistoryFeedbackPopup toggle={togglePop} remove={removeItem}/> : null }
                <IgnoreContainer onClick={changeStatus}>
                  <IgnoreTextContainer>Ignore</IgnoreTextContainer>
                </IgnoreContainer>
            </View>
        </Container>
    )
}

export default ThreadReportView

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

const Reason = styled.h3`
position:relative;
margin-left:5%;
padding-top:2%;
font-weight:Bold;
font-size:22px;
`

const Details = styled.h3`
position:relative;
margin-left:5%;
margin-top:10%;
font-weight:Bold;
font-size:22px;
`

const ReasonText = styled.text`
position:relative;
width: 900px;
height: 0 auto;
display:flex;
word-break:break-word;
margin-left:5%;
font-weight:Normal;
font-size:18px;
`

const DetailsText = styled.text`
position:relative;
width: 900px;
margin-left:5%;
margin-top: 1%;
display:flex;
word-break:break-word;
font-weight:Normal;
font-size:18px;`

const RemoveItemContainer = styled.div`
height: 35px;
position:relative;
display:flex; 
width:80px;
align:center;
margin-top:50%;
margin-left:65%;
border-radius:5px; 
background: #06AF47;
`
const RemoveItemTextContainer = styled.text`
color:white;
align:center;
font-style: normal;
font-weight: bold;
margin-left:7%;

display: flex;
align-items: center;
text-align: center;
letter-spacing: -1px;

color: #FFFFFF;
`

const IgnoreContainer = styled.div`
height: 35px;
position:relative;
display:flex; 
width:80px;
align:center;
margin-left:85%;
margin-top:-3.3%;
border-radius:5px; 
background: #CC0C0C;
`
const IgnoreTextContainer = styled.text`
color:white;
align:center;
font-style: normal;
font-weight: bold;
margin-left:17%;
margin-top:8%;

align-items: center;
text-align: center;
letter-spacing: -1px;

color: #FFFFFF;
`