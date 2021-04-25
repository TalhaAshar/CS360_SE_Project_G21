import React, { Component } from "react";
import { render } from "react-dom";
// import fetch from 'cross-fetch';
import styled from 'styled-components'
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function PubReportView () {
    return(
      <Container>
      <Head>Publication Report</Head>
      <FormContainer>
          <LabelContainer>
              <Label for="Reason">Reason</Label>
              <Reason>xyz</Reason>
              <Span>Provide a description of what is wrong and suggestions/corrections required</Span>
              <Details style = {{wordWrap:'break-word'}}>xyz</Details>
          </LabelContainer>

          <RemoveItemContainer>
              <RemoveItemTextContainer>Remove Item</RemoveItemTextContainer>
            </RemoveItemContainer>

          <IgnoreContainer>
            <IgnoreTextContainer>Ignore</IgnoreTextContainer>
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

const Span = styled.span`
  font-weight:bold;
  font-size:20px;
`

const LabelContainer = styled.div`
  display:grid;
  grid-template-rows:20px 65px;
  margin-left:50px;
  margin-top:20px;
`
const Label = styled.label`
  font-weight:bold;
  font-size:20px;
`

const Reason = styled.text`
font-weight:Normal;
font-size:18px;
margin-top: 2%;
`

const Details = styled.text`
font-weight:Normal;
font-size:18px;
margin-top:-52%
`

const RemoveItemContainer = styled.div`
height: 35px;
position:relative;
display:flex; 
width:120px;
align:center;
margin-top:82%;
margin-left:-20%;
border-radius:5px; 
background: #06AF47;
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
width:80px;
align:center;
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