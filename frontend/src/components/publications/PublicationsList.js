import React from 'react'
import LinearCard from '../LinearCard'
import styled from 'styled-components'
import axios from 'axios';
import {useEffect, useState} from "react";
import { useLocation, useParams} from "react-router-dom"

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function PublicationsList() {

    const { id } = useParams();
    
    const [pubs, setPubs] = useState([{'id' : 0, 'Title' : '', 'Authors' : '', 'Publisher' : '', 'Edition_Number' : 0, 'Year_Publication' : 0, 'Lang' : '', 'ISBN' : 0, 'Description' : '', 'Reason_for_Best_Pub' : '' ,'Front_Cover' : '../images/publications/Screenshot_1.png'}])

    useEffect(() => {
        let isComponentMounted = true;
        let url = "api/main/catalogue_list/" + id
        axios.get(url).then((res) => {
            if (isComponentMounted){
                setPubs(res.data)
            };
        })
        .catch(error => console.log('Error:', error))
        return () => {
            isComponentMounted = false;
        }
    }, [id])

    return (
        <Container>

        
            <Heading>
                <Background>
                Publications
                </Background>
            </Heading>

            <Results>
                {
                    pubs.map((elem, index) => {
                        if(index < 8){
                            return(
                                <LinearCard title={elem.Title} author={elem.Authors} front={elem.Front_Cover} id={elem.id}/>
                                )
                        }
                        console.log(index)
                    })
                }
            </Results>
        </Container>
    )
}

export default PublicationsList

const Results = styled.div`
    width:1100px;
    height:1600px;
    display:grid;
    grid-template-rows: 200px 200px 200px 200px;//one 200px for each card, should be bigger than the card
`
const Container = styled.div`
margin-left: 120px;
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
const Text = styled.h3`
width: 769px;
height: 62px;

font-family: Manrope;
font-style: normal;
font-weight: bold;
font-size: 45px;
line-height: 142%;

text-align: center;
letter-spacing: 0.005em;
font-feature-settings: 'tnum' on, 'lnum' on;

color: black;
`