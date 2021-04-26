import React from 'react'
import styled from 'styled-components';

function RejectedButton() {
    return (
        <Container>
            <TextContainer>Rejected</TextContainer>
        </Container>
    )
}

export default RejectedButton

const Container = styled.div`
height: 35px;
width:90px;
align:center;
margin-left:20%;
border-radius:5px; 
background: #CC0C0C;
`
const TextContainer = styled.text`
color:white;
align:center;
font-style: normal;
font-weight: bold;
margin-left:10px;
align-items: center;
text-align: center;
letter-spacing: -1px;
color: #FFFFFF;
`