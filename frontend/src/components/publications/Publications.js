import React from 'react'
import styled from 'styled-components'
import Card from './Cards'

function Publications() {
    return (
       <Container>
           <PublicationTitle>
               <Heading>Publications</Heading>
           </PublicationTitle>
           <ViewNextButtonContainer>
                    <View>View</View>
                    <NextPrevious>Buttons</NextPrevious>
           </ViewNextButtonContainer>
           <Cards>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                
           </Cards>
       </Container>
    )
}

export default Publications

const Container = styled.div`
    width:1200px;
    max-height:2500px;
`
const ViewNextButtonContainer = styled.div`
    display:flex;
    margin-left:150px;
   
`
const View = styled.h4`
`
const NextPrevious = styled.h4`
    margin-left:420px;
`
const PublicationTitle = styled.div`
    background: #0A3977;
    margin-left:150px;
    margin-right:150px;
    margin-top:20px;
    width:600px;
    color:white;
    border-radius:12px;
    height:50px;
    width:1000px;
    display:flex;
    align-items:center;
    justify-content:center;

`

const Heading = styled.h3`
    display:flex;
    align-items:center;
    justify-content:center;
`
const Cards = styled.div`
    margin-left:150px;
    margin-right:50px;
    margin-top:20px;
    margin-bottom:20px;
    display:grid;
    grid-template-rows: 375px 375px 375px 375px;
    grid-template-columns: 250px 250px 250px 250px;
    background:#DCF2F8;

`
