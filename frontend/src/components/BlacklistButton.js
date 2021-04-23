import React from 'react'
import styled from 'styled-components';

function BlacklistButton() {
    return (
        <Container>
            <TextContainer>Remove from blacklist</TextContainer>
        </Container>
    )
}

export default BlacklistButton

const Container = styled.div`
position: absolute;
height: 35px;
width:200px;
margin-left:65%;
margin-top:2%;    
align:center;
border-radius:8px; 
background: #583192;
`
const TextContainer = styled.text`
color:white;
align:center;
font-style: normal;
font-weight: bold;
margin-left:11.5%;
margin-top:4%;

display: flex;
align-items: center;
text-align: center;
letter-spacing: -1px;

color: #FFFFFF;
`