import React from 'react'
import styled from 'styled-components'

function SortPerList(props) {
    return (props.trigger)?(
        <Container>
            <TextContainer onClick ={()=>props.setTrigger('alphabetical')}>
                <Text>Alphabetical</Text>
                <Line></Line>
            </TextContainer>
            <TextContainer onClick ={()=>props.setTrigger('read')}>
                <Text>Read</Text>
                <Line></Line>    
            </TextContainer>
            <TextContainer onClick ={()=>props.setTrigger('unread')}>
                <Text>Unread</Text>
            </TextContainer>
        </Container>
    ):"";
}

export default SortPerList

const Container = styled.div`
width: 200px;
height: 110px;
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
width:250px;
border: 1px solid #D6E4EC;
transform: rotate(180deg);
`