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
position: relative;
height: 50px;
width:350px;
margin-left:19%;    
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
margin-left:43%;
padding-top:3%;

display: flex;
align-items: center;
text-align: center;
letter-spacing: -1px;

color: #FFFFFF;
`