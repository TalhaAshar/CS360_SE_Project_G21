import React from 'react'
import styled from 'styled-components'
import CommentIcon from '@material-ui/icons/Comment';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import CardMedia from '@material-ui/core/CardMedia';
import {useEffect, useState} from "react";
import { Link, useLocation } from "react-router-dom";


function NewLinearCard({title, author, front, id}) {

    let j = "/publication/" + id
  //location = useLocation()
  console.log(j)
  const [path, setPath] = useState(useLocation().pathname)

    return (
        
        <Container>
        <ImageUserNameContainer>
            <Link to={j}>
            <ImageContainer>
               
                <Image src={front}
                    width="180px" height="180px"
                />
            </ImageContainer>
            </Link>
        </ImageUserNameContainer>
        <PublicationDetailContainer>
            <BookTitle>{title}</BookTitle>
            <Author>{author}</Author>
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
width: 800px;
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
    position: absolute;
    margin-left:690px;
    margin-top:5px;
`

const TimeIcon = styled.h4`
`
