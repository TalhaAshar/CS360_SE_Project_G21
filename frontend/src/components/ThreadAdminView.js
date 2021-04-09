import React from 'react'
import LinearCard from './LinearCard'
import ThreadCardGuest from './ThreadCardGuest'
import styled from 'styled-components'

function SearchPage() {
    return (
        <Container>
            <Heading>
                    <Background>
                    Thread Title
                    </Background>
                </Heading>
            <Lower>
                

                <Results1>
                    <ThreadCardGuest/>
                </Results1>
                <RP>
                <Report>
                    <RText>
                    Report Thread
                    </RText>
                    
                </Report>
                <Delete>
                    <DText>
                    Delete Thread
                    </DText>
                </Delete>
                </RP>
                <Results>
                    <ThreadCardGuest/>
                    <ThreadCardGuest/>
                    <ThreadCardGuest/>
                    <ThreadCardGuest/>
                </Results>
            </Lower>
        </Container>
    )
}

export default SearchPage

const Results = styled.div`
    width:1100px;
    display:grid;
    height: 200px;
    margin-top: 65px;
    grid-template-rows: 200px 200px 200px 200px;//one 200px for each card, should be bigger than the card
`
const Lower = styled.div`
background: #DCF2F8;
width: 1100px;
height:1600px;
`

const Results1 = styled.div`
    padding-top: 20px;
    width:1100px;
    display:grid;
    height: 200px;

    grid-template-rows: 200px 200px 200px 200px;//one 200px for each card, should be bigger than the card
`
const Container = styled.div`
margin-left: 120px;
width: 1100px;
height:1600px;

`

const Heading = styled.div`
`
const Background = styled.div`
border-radius: 20px 20px 20px 20px;
color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    width:1100px;
    height:80px;
    background: #0A3977;
    left: 8.56%;
    font-family: Manrope;
font-style: normal;
font-weight: bold;
font-size: 45px;
line-height: 142%;
right: 8.43%;
top: 9.11%;
bottom: 87.28%;
margin-bottom: 30px;
    
`
const Report = styled.h3`
width: 151px;
height: 52px;

background: #CE1010;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;

`

const Delete = styled.h3`
margin-left: 13px;
width: 151px;
height: 52px;

background: #CE1010;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;

`

const DText = styled.h3`
width: 125px;
margin-left: 13px;
padding-top: 13px;

font-family: Manrope;
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 25px;
color: #FFFFFF;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const RText = styled.h3`
width: 125px;
margin-left: 13px;
padding-top: 13px;

font-family: Manrope;
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 25px;
color: #FFFFFF;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const RP = styled.h3`
height: 25px;
padding-top: 13px;
display:flex;
flex-direction:row;
margin-left: 779px;
margin-top: 13px;
`