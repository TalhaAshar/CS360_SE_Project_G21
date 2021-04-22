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
            <Link to={j} style={{textDecoration:"none"}}>
            <ImageContainer>
               
                <Image src={front}
                    width="180px" height="180px"
                />
            </ImageContainer>
            </Link>
        </ImageUserNameContainer>
        <Link to={j} style={{textDecoration:"none"}}>
            <PublicationDetailContainer>
                <BookTitle>{title}</BookTitle>
                <Author>{author}</Author>
            </PublicationDetailContainer>
        </Link>

        </Container>
    )
}

export default NewLinearCard

const Container = styled.div`
    width:80%;
    height:88%;
    display:flex;
    background:white;
    border-radius:12px;
`
const ImageUserNameContainer = styled.div`
    width:100%:
    height:90%;
    margin-left:0px;
    margin-top:0px;
`
const ImageContainer = styled.div`
    width:90%;
    height:90%:
`
const Image = styled.img`
    border-radius:30px;
`

const PublicationDetailContainer = styled.div`
    margin-top:5%;
    margin-left:3%;
`
const BookTitle = styled.h4`
    width: 80%;
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
    margin-top:5%;
    color: #081F32
`
const ThreadTimePostContainer = styled.div`
    margin-left:70%;
    margin-top:2%;
    position:absolute;
    @media only screen and (max-width: 900px) {
        margin-left:60%;
    }
`

const TimeIcon = styled.h5`
    paddding-top:2%;
`
