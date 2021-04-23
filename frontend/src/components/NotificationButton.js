import React from 'react'
import styled from 'styled-components';

function NotificationButton() {
    return (
        <Container>
            <TextContainer>More</TextContainer>
        </Container>
    )
}

export default NotificationButton

const Container = styled.div`
position: absolute;
height: 50px;
width:350px;
margin-left:9%;    
align:center;
border-radius:8px; 
background: #583192;
`
const TextContainer = styled.text`
color:white;
align:center;
font-style: normal;
font-weight: bold;
font-size:25px;
margin-left:44%;
margin-top:3%;

display: flex;
align-items: center;
text-align: center;
letter-spacing: -1px;

color: #FFFFFF;
`