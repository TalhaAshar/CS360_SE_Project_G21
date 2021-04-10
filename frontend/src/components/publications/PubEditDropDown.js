import React from 'react'
import styled from 'styled-components'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import FlagIcon from '@material-ui/icons/Flag';

function SortPerList(props) {
    return (props.trigger)?(
        <Container>
            <TextContainer onClick ={()=>props.setTrigger(false)}>
                <AddCircleIcon/>
                <Text>Add Publications</Text>
            </TextContainer>
            <Line></Line>
            <TextContainer onClick ={()=>props.setTrigger(false)}>
                <EditIcon/>
                <Text>Edit Publications</Text>    
            </TextContainer>
            <Line></Line>
            <TextContainer onClick ={()=>props.setTrigger(false)}>
                <FlagIcon/>
                <Text>Report Publications</Text>
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
    display:flex;
    height:35px;
    padding-top:5px;
    :hover{
        background: rgba(0, 0, 0, 0.1);
    }
    cursor:pointer;
`
const Text = styled.h6`
font-family: Manrope;
font-style: normal;
font-weight: 500;
font-size: 15px;
padding-left:10px;
padding-bottom:10px;
display: flex;
align-items: center;
justify-content:center;
letter-spacing: 0.169679px;
color: #000000;
`
const Line = styled.div`
margin-top:1px;
height:0xp;
width:200px;
border: 1px solid #D6E4EC;
transform: rotate(180deg);
`