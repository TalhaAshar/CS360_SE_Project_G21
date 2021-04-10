import React from 'react'
import styled from 'styled-components'
import CommentIcon from '@material-ui/icons/Comment';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import CardMedia from '@material-ui/core/CardMedia';


function NewLinearCard() {
    return (
        
        <Container>
        <ImageUserNameContainer>
            <ImageContainer>
               
                <Image src="http://www.pngall.com/wp-content/uploads/5/Aesthetic-Anime-Girl-PNG-File-Download-Free.png"
                    width="180px" height="180px"
                />
            </ImageContainer>
        </ImageUserNameContainer>
        <PublicationDetailContainer>
            <BookTitle>Fuck Asad</BookTitle>
            <Author>Talha Ashar</Author>
        </PublicationDetailContainer>
        <ThreadTimePostContainer>
            <TimeIcon>
                <h5 style={{paddingTop:"4px"}}>17 Days Ago</h5>
            </TimeIcon>
        </ThreadTimePostContainer>

        </Container>
    )
}

export default NewLinearCard

const Container = styled.div`
width:1100px;
height:180px;
display:flex;
background:white;
border-radius:12px;
`
const ImageUserNameContainer = styled.div`
    margin-left:0px;
    margin-top:0px;
`
const ImageContainer = styled.div`
`
const Image = styled.img`
    border-radius:30px;
`

const PublicationDetailContainer = styled.div`
    margin-top:30px;
    margin-left:20px;
`
const BookTitle = styled.h4`
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 25px;
color: #081F32
`
const Author = styled.h4`
font-style: normal;
font-weight: normal;
font-size: 20px;
line-height: 25px;
margin-top:30px;
color: #081F32
`
const ThreadTimePostContainer = styled.div`
    margin-left:690px;
    margin-top:5px;
`

const TimeIcon = styled.h4`
`
