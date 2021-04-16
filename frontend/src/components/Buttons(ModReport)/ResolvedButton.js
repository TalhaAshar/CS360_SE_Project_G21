import React from 'react'
import styled from 'styled-components';

function ResolvedButton() {
    return (
        <Container>
            <TextContainer>Resolved</TextContainer>
        </Container>
    )
}

export default ResolvedButton

const Container = styled.div`
height: 35px;
width:100px;
align:center;
margin-left:910px;
border-radius:5px; 
background: #06AF47;
`
const TextContainer = styled.text`
color:white;
align:center;
font-style: normal;
font-weight: bold;
margin-left:13px;

display: flex;
align-items: center;
text-align: center;
letter-spacing: -1px;

color: #FFFFFF;
`