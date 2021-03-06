import { Divider,FormatAlignLeftIcon} from '@material-ui/core'
import styled from 'styled-components'
import React from 'react'

import Card from './Cards'
import { Link, useLocation } from "react-router-dom";
import {useEffect, useState} from "react";


function BestEdition({title, authors, publisher, year, ISBN, description, edition, front_cover, id}) {

    let j = "/publication/" + id
  //location = useLocation()
  console.log(j)
  const [path, setPath] = useState(useLocation().pathname)

    return (
        <Container>
            <br/><Title>
                Best Edition Community Selection
            </Title>
            
            <BookContainer>
                <Link to={j}>
                    <BookPhoto>
                        <img src={front_cover} width="300px" height="350px"/>
                    </BookPhoto>
                </Link>
                <BookDetailsContainer>
                    <BookTitle> {title} </BookTitle>
                    <h4> {authors} </h4>
                    <h4> {edition} </h4>
                    <h4> {publisher} </h4>
                    <h4> {year} </h4>
                    <h4> {ISBN} </h4>
                </BookDetailsContainer>
                <DividerContainer>
                        <Divider orientation="vertical" 
                        style={{
                            color:"black",
                            height:"250px",
                            maxHeight:"250px",
                            marginTop:"6px",
                            marginBottom:"6px"
                            }}/>
                </DividerContainer>
                <BookCommentContainer dangerouslySetInnerHTML={{ __html:description}} />
            </BookContainer>
        </Container>
    )
}

export default BestEdition
const Container = styled.div`
    width:100%;
    height:550px;
    padding-left:20px;
    padding-right:20px;
    background-color:white;
    border-radius:16px;
    @media only screen and (max-width: 800px) {
        height:auto;
        display:flex;
        justify-content:left;
        flex-flow: row wrap;
    }
`
const Title = styled.div`
    height:40px;
    width:380px;
    background-color: #0A3977;
    color:white;
    font-size:large;
    font-weight:bold;
    border:1px;
    border-radius:6px;
    text-align: center;
    padding-top: 5px;
    margin-left: 10px;
    margin-top:10px;
`
const BookContainer = styled.div`
    display:flex;
    height:auto;
    background-color:#ffffff;
    padding-left:20px;
`
const BookPhoto = styled.div`
    height:350px;
    width:300px;
    object-fit:none;
    padding-left:8%;
    padding-top:2%;
    margin-top:2%;
    margin-bottom:4%;
`
const BookDetailsContainer = styled.div`
    padding-left:14%;
    padding-right:4%;
    padding-top:1%;
    margin-left:2%;
    @media only screen and (max-width: 700px) {
        display:none;
    }
`
const DividerContainer = styled.div`
    padding-right:2%;
    @media only screen and (max-width: 920px) {
        display:none;
    }

`
const BookCommentContainer = styled.div`
    background-color:#DCF2F8;
    height:40%;
    width:40%;
    padding-left:2%;
    padding-right:1%;
    padding-top:2%;
    margin-bottom:2%;
    padding-bottom:1%;
    border-radius:16px;
    @media only screen and (max-width: 920px) {
        display:none;
    }
`

const BookTitle = styled.div`
    margin-bottom : 2%;
	font-style: normal;
	font-weight: normal;
	font-size: 40px;
	line-height: 46px;
	color: #081F32;
`