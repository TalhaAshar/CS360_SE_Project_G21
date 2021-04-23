import React from 'react'
import styled from 'styled-components'
import DeleteIcon from '@material-ui/icons/Delete';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

function SortPerList(props) {
    return (props.trigger)?(
        <Container onMouseLeave={() => props.setTrigger(!props.trigger)}>
            <TextContainer onClick ={()=>props.setTrigger(!props.trigger)} onClick={() => props.Delete(props.id)} style={{cursor:"pointer", borderBottom:"1px solid"}}>
                <DeleteIcon/>
                <Text>Remove From List</Text>
            </TextContainer>
            <TextContainer onClick ={()=>props.setTrigger(!props.trigger)} onClick={() => props.MarkRead(props.id)} style={{cursor:"pointer", borderBottom:"1px solid"}}>
                <BookmarkIcon/>
                <Text>Mark As Read</Text>
            </TextContainer>
            <TextContainer onClick ={()=>props.setTrigger(!props.trigger)} onClick={() => props.MarkUnread(props.id)} style={{cursor:"pointer"}}>
                <BookmarkBorderIcon/>
                <Text>Mark As Unread</Text>
            </TextContainer>
        </Container>
    ):"";
}

export default SortPerList

const Container = styled.div`
width: 200px;
height: 105px;
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