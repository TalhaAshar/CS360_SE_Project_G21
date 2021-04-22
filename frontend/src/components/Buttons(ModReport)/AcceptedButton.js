import React from 'react'
import styled from 'styled-components';

function AcceptedButton() {
    return (
        <Container>
            <TextContainer>Accepted</TextContainer>
        </Container>
    )
}

export default AcceptedButton

const Container = styled.div`
height: 35px;
width:90px;
align:center;
margin-left:920px;
border-radius:5px; 
background: #06AF47;
`
const TextContainer = styled.text`
color:white;
align:center;
font-style: normal;
font-weight: bold;
margin-left:8px;

display: flex;
align-items: center;
text-align: center;
letter-spacing: -1px;

color: #FFFFFF;
`