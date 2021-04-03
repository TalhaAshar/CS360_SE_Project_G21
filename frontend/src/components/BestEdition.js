import { Divider,FormatAlignLeftIcon} from '@material-ui/core'
import styled from 'styled-components'
import React from 'react'

import Card from './Cards'



function BestEdition({title, authors, publisher, year, ISBN, description, edition, front_cover, id}) {

    return (
        <Container>
            <Title>
                Best Edition Community Selection
            </Title>
            <BookContainer>
                <Card style={{width:"200",height:"500px"}} title={title} author={authors} front_cover={front_cover} id={id}/>
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
    max-height:50px;
    max-width:380px;
    background-color: #0A3977;
    color:white;
    font-size:large;
    font-weight:bold;
    border:1px;
    border-radius:6px;
    padding-left:40px;
    margin-top:10px;


`
const BookContainer = styled.div`
    display:flex;
    max-height:360px;
    background-color:#ffffff;
    padding-left:20px;
`
const Image = styled.img`
    max-height:350px;
    max-width:300px;
    object-fit:none;
    padding-left:10px;

`
const BookDetailsContainer = styled.div`
    padding-left:80px;
    padding-right:80px;
    padding-top:10px;

    
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