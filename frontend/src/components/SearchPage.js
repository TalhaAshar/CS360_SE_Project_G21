import React from 'react'
import LinearCard from './LinearCard'
import styled from 'styled-components'
import './popup.scss';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import NewLinearCard from './publications/NewLinearCard';
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';

function SearchPage() {
    return (
        <Container>

        
            <Heading>
                <Background>
                    <Text>

                Search Results
                </Text>
                    <button class="bleh">Filter</button>
                </Background>
            </Heading>

            <Nextpage>
                <SkipPreviousRoundedIcon style = {{marginLeft:'0px'}}/><SkipNextRoundedIcon style = {{}}/>
            </Nextpage>

            <Colour>
                <Results>
                    <NewLinearCard/>
                    <NewLinearCard/>
                    <NewLinearCard/>
                    <NewLinearCard/>
                    <NewLinearCard/>
                    <NewLinearCard/>
                    <NewLinearCard/>
                    <NewLinearCard/>
                </Results>
            </Colour>
        </Container>
    )
}

export default SearchPage

const Results = styled.div`
    width:1100px;
    height:1600px;
    display:grid;
    grid-template-rows: 200px 200px 200px 200px;//one 200px for each card, should be bigger than the card
    padding-top:20px;
padding-left:20px;
`
const Container = styled.div`
margin-left: 120px;
`

const Heading = styled.div`
margin-left: 20px;
`
const Nextpage = styled.div`
cursor: pointer;

display:flex;
    flex-direction:row;
    margin-left: 530px;
    margin-top: 10px;
    margin-bottom: 10px;

`

const Colour = styled.div`
background: #DCF2F8;
width:1140px;
height:1600px;
border-radius: 20px;
margin-bottom:100px;
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
padding-left: 360px;    
`
const Text = styled.h3`
margin-right: 180px;
`