import React from 'react'
import styled from 'styled-components';
import {Link} from "react-router-dom";

function NotificationButton() {
    return (
        <Link to="/notifications" style={{textDecoration: "none"}}>
            <Container>
                <TextContainer>More</TextContainer>
            </Container>
        </Link>
    )
}

export default NotificationButton

const Container = styled.div`
position: relative;
height: 50px;
width:350px;
margin-left:19%;    
border-radius:8px; 
background: #583192;
display: flex;
align-items: center;
justify-content: center;
`
const TextContainer = styled.text`
color:white;
font-style: normal;
font-weight: bold;
font-size:25px;
letter-spacing: -1px;

color: #FFFFFF;
`