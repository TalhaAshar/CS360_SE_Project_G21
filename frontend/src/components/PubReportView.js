import React, { Component } from "react";
import { render } from "react-dom";
// import fetch from 'cross-fetch';
import styled from 'styled-components'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from 'axios';
import { useLocation, useParams} from "react-router-dom";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function PubReportView () {

  const [report, setReport] = useState({'Reason' : '', 'Description' : ''})
  const { id } = useParams();


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
    let url = "api/main/delete_publication/" + report.Relevant_Pub["id"]

    axios.post(url).then((res) => {
      console.log("The pub was deleted")
    })
    .catch(error => console.log('Error:', error))

    url = "api/accounts/reports/" + id
    axios.post(url).then((res) => {
      console.log("The state was changed")
    })
    .catch(error => console.log('Error:', error))

  }

  function changeStatus(){
    let url = "api/accounts/reports/" + id
    axios.post(url).then((res) => {
      console.log("The state was changed")
    })
    .catch(error => console.log('Error:', error))
  }


    return(
      <Container>
      <Head>Publication Report</Head>
      <FormContainer>
          <LabelContainer>
              <Label for="Reason">Reason
              <br/>
              <Reason>{report.Reason}</Reason>
              </Label>
              
              <Span>Provide a description of what is wrong and suggestions/corrections required
              <Details style = {{wordWrap:'break-word'}} dangerouslySetInnerHTML={{ __html:report.Description}} />
              </Span>
              
          </LabelContainer>

          <RemoveItemContainer>
              <RemoveItemTextContainer onClick={removeItem}>Remove Item</RemoveItemTextContainer>
            </RemoveItemContainer>

          <IgnoreContainer>
            <IgnoreTextContainer onClick={changeStatus}>Ignore</IgnoreTextContainer>
          </IgnoreContainer>

      </FormContainer> 
    </Container>
         )
}

export default PubReportView;

const Container = styled.div`
  margin-left:150px;
  margin-right:150px;

`
const Head = styled.h3`
  width:990px;
  height:50px;
  margin-top:30px;
  margin-left:05px;
  display:flex;
  justify-content:center;
  align-items:center;
  color:white;
  background: #03204C;
  border-radius: 8px;
`
const FormContainer = styled.div`
  width: 1000px;
  height: 900px;
  margin-top:20px;
  display:flex;
  justify-content:space-between;
  background:#DCF2F8;
  border-radius: 16px;

`

const Span = styled.div`
  font-weight:bold;
  font-size:20px;
  margin-top: -40%;
`

const LabelContainer = styled.div`
  display:flex;
  flex-flow: row wrap;
  margin-left:50px;
  margin-top:20px;
`
const Label = styled.div`
  font-weight:bold;
  font-size:20px;
  margin-bottom: -40%;
`

const Reason = styled.text`
font-weight:Normal;
font-size:18px;
margin-top: 2%;
`

const Details = styled.text`
font-weight:Normal;
font-size:18px;
`

const RemoveItemContainer = styled.div`
height: 35px;
position:relative;
display:flex; 
width:200px;
align:center;
margin-top:82%;
margin-left:15%;
border-radius:5px; 
background: #06AF47;
right: 10%;
`
const RemoveItemTextContainer = styled.text`
color:white;
align:center;
font-style: normal;
font-weight: bold;
margin-left:12%;

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
justify-content:center; 
width:130px;
align-items:center;
padding: 0% 1% 1% 0%;
margin-left:-5%;
margin-top:82%;
margin-right:2%;
border-radius:5px; 
background: #CC0C0C;
`
const IgnoreTextContainer = styled.text`
color:white;
align:center;
font-style: normal;
font-weight: bold;
margin-left:22%;
margin-top:10%;

align-items: center;
text-align: center;
letter-spacing: -1px;

color: #FFFFFF;
`
