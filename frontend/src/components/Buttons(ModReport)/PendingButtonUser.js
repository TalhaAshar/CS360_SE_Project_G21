import React from 'react'
import styled from 'styled-components';

function PendingButton() {
    return (
        <Container>
            <TextContainer>Pending</TextContainer>
        </Container>
    )
}

export default PendingButton

const Container = styled.div`
height: 35px;
width:90px;
align:center;
margin-left:23%;
border-radius:5px; 
background: #898989;
`
const TextContainer = styled.text`
color:white;
align:center;
font-style: normal;
font-weight: bold;
margin-left:12px;
display: flex;
align-items: center;
text-align: center;
letter-spacing: -1px;
color: #FFFFFF;
`