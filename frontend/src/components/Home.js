// import { Container } from '@material-ui/core'
import { CardTravelSharp } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import BestEdition from './BestEdition'
import Card from './Cards'
import {useEffect, useState} from "react";
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function Home() {

    const [pubs, setPubs] = React.useState([{'id' : 0, 'Title' : '', 'Authors' : '', 'Publisher' : '', 'Edition_Number' : '', 'Year_Publication' : '', 'Description' : '', 'ISBN' : '', 'Reason_for_Best_Pub' : ''}])
    
    useEffect(() => {
        let isComponentMounted = true;
        axios.get(`api/main/home`).then((res) => {
            if (isComponentMounted){
            setPubs(res.data)
            };
            console.log('ye boi', res.data)
        })
        .catch(error => console.log('Error:', error))
        return () => {
            isComponentMounted = false;
        }
    }, [])

    return (

            <Container>
                <Banner>
                    <BannerHeadTitle>Welcome to BookBound</BannerHeadTitle>
                    <BannerSmallTitle>Find the most intriguing edtion of your favorite book </BannerSmallTitle>
                </Banner>
                <CardContainer>
                        <BestEdition title={pubs[0].Title} authors={pubs[0].Authors} publisher={pubs[0].Publisher} year={pubs[0].Year_Publication} ISBN={pubs[0].ISBN} edition={pubs[0].Edition_Number} description={pubs[0].Reason_for_Best_Pub} front_cover={pubs[0].Front_Cover} id={pubs[0].id}/>
                </CardContainer>
                <Content>
                <br/><RecentAdditionText>Recent Additions</RecentAdditionText>
                    <RecentAdditionContainer>
                   
                            <Cards>
                                {
                                    pubs.map((elem, index) => {
                                        if(index > 0 && index < 6){
                                            return(
                                                <CardDiv>
                                                <Card title={elem.Title} author={elem.Authors} front_cover={elem.Front_Cover} id={elem.id}/>
                                                </CardDiv>
                                            )
                                        }
                                    })
                                } 
                            </Cards>
                    </RecentAdditionContainer>
                    <br/> <RecommendationText>Recommendations</RecommendationText>
                    <RecommendationContainer>
                   
                        <Cards>
                            {
                                pubs.map((elem, index) => {
                                    if(index > 5 && index <= 10){
                                        return(
                                            <CardDiv>
                                            <Card title={elem.Title} author={elem.Authors} front_cover={elem.Front_Cover} id={elem.id}/>
                                            </CardDiv>
                                        )
                                    }
                                })
                            } 
                        </Cards>
                    </RecommendationContainer>
                </Content>
                <FootBanner>
                    <FootBannerSmallTitle>BookBound is the place for all your literature needs</FootBannerSmallTitle>
                    <FootBannerHeadTitle>If it exists then you'll find it here</FootBannerHeadTitle>
                </FootBanner>
            </Container>
    )
}

export default Home

//outer container of the home page (whole)
const Container = styled.div`
    width: 100%;
    height:100%;
    background-color: white;
    margin-bottom:2%;
    display:flex;
    flex-grow:0;
    flex-direction:column;
    @media only screen and (max-width: 800px) {
      }
`
const Banner = styled.div`
    min-height:4%;
    margin-top: 1%;
    margin-left: 10%;
    margin-right: 10%;
    margin-bottom:1%;
    color:#03204C;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border:none;
    border-radius:6px;
`
// //the welcome writing
const BannerHeadTitle = styled.h2`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:row;
`
const BannerSmallTitle = styled.h4`
    font-weight:100;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:row;
`
const Content = styled.div`
    height:90%;
    width:auto;
`
const CardContainer = styled.div`
    background: #FFFFFF;
    border-radius: 16px;
    border:2px;
    border-style:solid;
    margin-bottom:2%;
    margin-left:2%;
    margin-right:2%;
    height:auto;
    @media only screen and (max-width: 700px) {
        width:70%;
    }
`
const RecentAdditionContainer = styled.div`
    margin-top:-2%;
    margin-bottom:1%;
    margin-left:3%;
    margin-right:3%;
    background-color:#DCF2F8;
    border-radius:8px;
    height:auto;
    width:auto;
    padding-bottom:1%;
    display:flex;
    justify-content:space-between;
    @media only screen and (max-width: 920px){
        margin-bottom:60%;
        display:flex;
        justify-content:space-between;
        width:auto;
    }
`
const RecentAdditionText = styled.h3`
    width:20%;
    background-color: #0A3977;
    color:white;
    font-size:large;
    font-weight:bold;
    border:1px;
    border-radius:6px;
    margin-left:3%;
    margin-bottom:3%;
    text-align: center;
`
const Cards = styled.div`
    display:flex;
    justify-content:left;
    flex-flow:row wrap;
    flex:1;
    margin-left:2.7%;
    margin-bottom:1%;
    @media only screen and (max-width: 920px){
        display:flex;
        justify-content:space-evenly;
        align-items:left;
        margin-bottom:3%;
    }
`
const CardDiv = styled.div`
    margin-top:3%;
    margin-bottom:3%;
    margin-left:2%;
    margin-right:2%;

`
const RecommendationContainer = styled.div`
    background-color:#DCF2F8;
    border-radius:8px;
    margin-top:-2%;
    margin-bottom:1%;
    margin-left:3%;
    margin-right:3%;
    height:auto;
    width:auto;
    padding-bottom:1%;
    @media only screen and (max-width: 900px){
        margin-bottom:60%;
        padding-bottom:60%;
        width:70%;
    }
`
const RecommendationText = styled.h3`
    width:20%;
    background-color: #0A3977;
    color:white;
    font-size:large;
    font-weight:bold;
    border:1px;
    border-radius:6px;
    margin-left:3%;
    margin-bottom:3%;
    text-align: center;
`

const FootBanner = styled.div`
    min-height:4%;
    margin-top: 1%;
    margin-left: 10%;
    margin-right: 10%;
    margin-bottom:1%;
    color:#03204C;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border:none;
    border-radius:6px;
`
// //the welcome writing
const FootBannerHeadTitle = styled.h2`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:row;
`
const FootBannerSmallTitle = styled.h4`
    font-weight:100;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:row;
`