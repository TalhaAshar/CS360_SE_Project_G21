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
                        <img src={front_cover} />
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
    max-height:500px;
    padding-left:20px;
    padding-right:20px;
    background-color:white;
    border-radius:16px;
`
const Title = styled.div`
    height:40px;
    max-width:380px;
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
    max-height:360px;
    background-color:#ffffff;
    padding-left:20px;
`
const BookPhoto = styled.div`
    max-height:350px;
    max-width:300px;
    object-fit:none;
    padding-left:10px;
`
const BookDetailsContainer = styled.div`
    padding-left:80px;
    padding-right:80px;
    padding-top:10px;
    margin-left:40px;
`
const DividerContainer = styled.div`
    padding-left:20px;
    padding-right:20px;
    padding-top:30px;

`
const BookCommentContainer = styled.div`
    background-color:#DCF2F8;
    max-height:250px;
    max-width:450px;
    padding-left:60px;
    padding-right:60px;
    padding-top:20px;
    margin-top:35px;
    margin-left:85px;
    padding-bottom:20px;
    border-radius:16px;
`

const BookTitle = styled.div`
	width: 509px;
	height: 46px;

	font-family: DM Serif Display;
	font-style: normal;
	font-weight: normal;
	font-size: 40px;
	line-height: 46px;


	color: #081F32;
`