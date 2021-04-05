import React from 'react'
import styled from 'styled-components'
import Card from '../Cards'
import {useEffect, useState} from "react";
import axios from 'axios';
import { useLocation, useParams} from "react-router-dom"

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function Publications() {
    const { id } = useParams();
    const [pubs, setPubs] = React.useState([{'id' : 0, 'Title' : '', 'Authors' : '', 'Front_Cover' : '../images/publications/Screenshot_1.png'}])
    const [flag, setFlag] = React.useState(false)

    function getData(id){
        let url = "api/main/catalogue_columnar/" + id
        console.log(url)
        axios.get(url).then((res) => {
            setPubs(res.data)
            console.log('ye boi', res.data)
            console.log('nu boi', pubs.length)
        })
        .catch(error => console.log('Error:', error))
    }

    useEffect(() => {
        getData(id)
    }, [id])


    switch (flag) {
        case false:
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
                         {
                             pubs.map((elem, index) => {
                                 console.log(elem.id)
                                 if(index < 16){
                                     return(
                                         <Card title={elem.Title} author={elem.Authors} front_cover={elem.Front_Cover} id={elem.id}/>
                                         )
                                 }
                             })
                         }
                    </Cards>
                 
                </Container>
             )
            break;
        case true:
            return (
                <div>IT REAALLY WORKS BRO</div>
            )
        break;
        default:
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
                         {
                             pubs.map((elem, index) => {
                                 console.log(elem.id)
                                 if(index < 16){
                                     return(
                                         <Card title={elem.Title} author={elem.Authors} front_cover={elem.Front_Cover} id={elem.id}/>
                                         )
                                 }
                             })
                         }
                    </Cards>
                 
                </Container>
             )
    }
    
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
