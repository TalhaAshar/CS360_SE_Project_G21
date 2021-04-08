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

    const [pubs, setPubs] = React.useState([{'id' : 0, 'Title' : '', 'Authors' : '', 'Publisher' : '', 'Edition_Number' : '', 'Year_Publication' : '', 'Description' : '', 'ISBN' : '', 'Reason_for_Best_Pub' : ''},
    {'id' : 0, 'Title' : '', 'Authors' : '', 'Front_Cover' : '../images/publications/Screenshot_1.png'},{'id' : 0, 'Title' : '', 'Authors' : '', 'Front_Cover' : '../images/publications/Screenshot_1.png'},{'id' : 0, 'Title' : '', 'Authors' : '', 'Front_Cover' : '../images/publications/Screenshot_1.png'},{'id' : 0, 'Title' : '', 'Authors' : '', 'Front_Cover' : '../images/publications/Screenshot_1.png'},
    {'id' : 0, 'Title' : '', 'Authors' : '', 'Front_Cover' : '../images/publications/Screenshot_1.png'}, {'id' : 0, 'Title' : '', 'Authors' : '', 'Front_Cover' : '../images/publications/Screenshot_1.png'}, {'id' : 0, 'Title' : '', 'Authors' : '', 'Front_Cover' : '../images/publications/Screenshot_1.png'}, {'id' : 0, 'Title' : '', 'Authors' : '', 'Front_Cover' : '../images/publications/Screenshot_1.png'}, {'id' : 0, 'Title' : '', 'Authors' : '', 'Front_Cover' : '../images/publications/Screenshot_1.png'}, {'id' : 0, 'Title' : '', 'Authors' : '', 'Front_Cover' : '../images/publications/Screenshot_1.png'}])
    
    function getData(){
        console.log("HOME JS")
        axios.get(`api/main/home`).then((res) => {
            setPubs(res.data)
            console.log('ye boi', res.data)
        })
        .catch(error => console.log('Error:', error))
    }

    useEffect(() => {
        getData()
    }, [])

    return (

            <Container>

                <Banner>
                    <BannerHeadTitle>Welcome to BookBound</BannerHeadTitle>
                    <BannerSmallTitle>Find the most intriguing edtion of your favorite book </BannerSmallTitle>
                </Banner>
                <Content>
                    <CardContainer>
                        <BestEdition title={pubs[0].Title} authors={pubs[0].Authors} publisher={pubs[0].Publisher} year={pubs[0].Year_Publication} ISBN={pubs[0].ISBN} edition={pubs[0].Edition_Number} description={pubs[0].Reason_for_Best_Pub} front_cover={pubs[0].Front_Cover} id={pubs[0].id}/>
                    </CardContainer>

                    <RecentAdditionContainer>
                    <br/> <RecentAdditionText>Recent Additions</RecentAdditionText>
                            <Cards>
                                {
                                    pubs.map((elem, index) => {
                                        if(index > 0 && index < 6){
                                            return(
                                                <Card title={elem.Title} author={elem.Authors} front_cover={elem.Front_Cover} id={elem.id}/>
                                            )
                                        }
                                    })
                                } 
                            </Cards>
                    </RecentAdditionContainer>
                
                    <RecommendationContainer>
                    <br/> <RecommendationText>Recommendations</RecommendationText>
                        <Cards>
                            {
                                pubs.map((elem, index) => {
                                    if(index > 5 && index <= 10){
                                        return(
                                            <Card title={elem.Title} author={elem.Authors} front_cover={elem.Front_Cover} id={elem.id}/>
                                        )
                                    }
                                })
                            } 
                        </Cards>
                    </RecommendationContainer>
                </Content>
            </Container>
    )
}

export default Home

//outer container of the home page (whole)
const Container = styled.div`
    max-width: 1570px;
    margin: 0 auto;
    height: auto;
    background-color: white;
`
const Banner = styled.div`
    min-height:40px;
    margin-top: 60px;
    margin-left: 60px;
    margin-right: 60px;
    margin-bottom:60px;
    color:#03204C;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border:none;
    border-radius:6px;
`
// //the welcome writing
const BannerHeadTitle = styled.h2`
    margin-left: 60px;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:row;
`
const BannerSmallTitle = styled.h4`
    font-weight:100;
    margin-left:50px;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:row;
`
const Content = styled.div`
`
const CardContainer = styled.div`
    background: #FFFFFF;
    border-radius: 16px;
    border:2px;
    border-style:solid;
    margin-bottom:20px;
    margin-left:20px;
    margin-right:20px;
`
const RecentAdditionContainer = styled.div`
    margin-top:50px;
    margin-bottom:20px;
    margin-left:20px;
    margin-right:20px;
    padding-left:18px;
    background-color:#DCF2F8;
    border-radius:8px;
`
const RecentAdditionText = styled.h3`
    height:30px;
    max-width:235px;
    background-color: #0A3977;
    color:white;
    font-size:large;
    font-weight:bold;
    border:1px;
    border-radius:6px;
    margin-left:10px;
    text-align: center;
`
const Cards = styled.div`
    display:flex;
    padding-right: 20px;
`
const RecommendationContainer = styled.div`
    margin-top:20px;
    margin-bottom:20px;
    margin-left:20px;
    margin-right:20px;
    padding-left:18px;
    background-color:#DCF2F8;
    border-radius:8px;
`
const RecommendationText = styled.h3`
    height:30px;
    max-width:235px;
    background-color: #0A3977;
    color:white;
    font-size:large;
    font-weight:bold;
    border:1px;
    border-radius:6px;
    margin-left:10px;
    text-align: center;
`