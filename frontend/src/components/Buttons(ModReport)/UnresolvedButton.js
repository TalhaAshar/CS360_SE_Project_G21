import React from 'react'
import styled from 'styled-components';

function UnresolvedButton() {
    return (
        <Container>
            <TextContainer>Unresolved</TextContainer>
        </Container>
    )
}

export default UnresolvedButton

const Container = styled.div`
height: 35px;
width:100px;
align:center;
margin-left:910px;
border-radius:5px; 
background: #CC0C0C;
`
const TextContainer = styled.text`
color:white;
align:center;
font-style: normal;
font-weight: bold;
margin-left:5px;

display: flex;
align-items: center;
text-align: center;
letter-spacing: -1px;

color: #FFFFFF;
`