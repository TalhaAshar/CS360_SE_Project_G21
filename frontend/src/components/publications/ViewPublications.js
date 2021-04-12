import React from 'react'
import styled from 'styled-components'
import Catalogue from "./PublicationsList";
import {HashRouter as Router, Route, Switch , Link} from 'react-router-dom'

function View(props) {
    return (props.trigger)?(
        <Container >
            <Link to="/Catalogue/">
            <TextContainer>
                <Text>List</Text>
            </TextContainer>
            </Link>
            <Line></Line>
            <Link to="/Columnar/">
            <TextContainer onClick ={()=>props.setTrigger(!props.trigger)}>
                <Text>Grid</Text>
            </TextContainer>
            </Link>
        </Container>
    ):"";
}

export default View

const Container = styled.div`
width: 150px;
height: 80px;
background:white;
filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
padding-top:2px;

`
const TextContainer = styled.div`
    height:35px;
    padding-top:5px;
    :hover{
        background: rgba(0, 0, 0, 0.1);
    }
`
const Text = styled.h6`
font-family: Manrope;
font-style: normal;
font-weight: 500;
font-size: 15px;
margin-top:0px;
display: flex;
align-items: center;
justify-content:center;
letter-spacing: 0.169679px;
color: #000000;
`
const Line = styled.div`
margin-top:15px;
height:0xp;
width:150px;
border: 1px solid #D6E4EC;
transform: rotate(180deg);
`