import React from 'react'
import styled from 'styled-components'
import './popup.scss';
import axios from 'axios';
import {useEffect, useState} from "react";
import { useLocation, useParams} from "react-router-dom"
import Filter from "./SearchFilter";
import NewLinearCard from "./publications/NewLinearCard";
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function SearchPage() {

    const { param } = useParams();
    const [pubs, setPubs] = useState([])
    const [filters, setFilters] = useState(["Title"])
    const [start, setStart] = useState(0)

    function handleFilters(value){
        console.log(value, "YES WE ARE EHERE")
        const temp = filters.indexOf(value)
        
        if(temp == -1)
        {
            setFilters([...filters, value])
            setStart(0)
        }
        else
        {
            console.log("Inside ELSE")
                const updatedFilters = [...filters.slice(0, temp), ...filters.slice(temp + 1)]
                setFilters(updatedFilters)
                setStart(0)
        }
        console.log(filters)
    }

    function leftClick(){
        if(start > 0){
            setStart(start - 8)
            window.scrollTo(0, 0)
        }
    }

    function rightClick(){
        if(start + 8 < pubs.length){
            setStart(start + 8)
            window.scrollTo(0, 0)
        }
    }
 
     useEffect(() => {
        let isComponentMounted = true;

        let url = "api/main/query/?search=" + param
        for (let index = 0; index < filters.length; index++) {
            url = url + "&search_fields=" + filters[index]
        }

        axios.get(url).then((res) => {

            if (isComponentMounted){
                setPubs(res.data)
            }
            setStart(0)
        })
        .catch(error => console.log('Error:', error))
        return () => {
            isComponentMounted = false;
        }
         //setParams(useParams())
     }, [param, filters])

    return (
        <Container>

        
        <BookTitleContainer><h1>Search Results</h1></BookTitleContainer>

            <Nextpage>
            <SkipPreviousRoundedIcon style = {{marginLeft:'0px'}} onClick={leftClick}/>
            <SkipNextRoundedIcon style = {{}} onClick={rightClick}/>
            </Nextpage>

            <FilterContainer>
                <div></div>
            < Filter onChange={handleFilters}/>
            <div></div>
            </FilterContainer>

            <Colour>
                <Results>
                {(pubs.length == 0) && <YoutubeSearchedForIcon
                        style={{
                            color:"black",
                            fontSize:200,
                            marginLeft:"40%"                       
                            }}
                            />}
                 {(pubs.length == 0) && <IconText>Your applied filters returned no matching results.</IconText>}
                   {
                    pubs.map((elem, index) => {
                        if(index >= start && index < (start + 8) && index < pubs.length){
                            return(
                                <CardDiv key={elem.id}>
                                    <NewLinearCard title={elem.Title} author={elem.Authors} front={elem.Front_Cover} id={elem.id}/>
                                </CardDiv>
                                )
                        }
                    })
                }
                </Results>
            </Colour>
            <Nextpage>
            <SkipPreviousRoundedIcon style = {{marginLeft:'0px'}} onClick={leftClick}/>
            <SkipNextRoundedIcon style = {{}} onClick={rightClick}/>
            </Nextpage>
        </Container>
    )
}

export default SearchPage

const BookTitleContainer = styled.div`
    background: #0A3977;
    border-radius:20px;
    color:white;
    min-width: 55%;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-left: 3%;
    margin-right: 3%;
    margin-top:3%;
`

const FilterContainer = styled.div`
    display: flex;
    justify-content:space-between;
    align-items:center;
    margin-left: 5%;
`

const Results = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-flow:row wrap;
    padding-top:20px;
    margin-left:20px;
    margin: 0 auto;
    padding-bottom:5%;
`
const Container = styled.div`
max-width:100%;
height:95%;
margin-left:3%;
margin-right:3%;
margin-top:3%;
margin-bottom:10%;
background:white;
padding-bottom:5%;
@media only screen and (max-width: 1200px) {
    height:95%;
}

`

const Heading = styled.div`
margin-left: 20px;
`
const Nextpage = styled.div`
cursor: pointer;
display:flex;
flex-direction:row;
margin-left: 48%;
margin-right: 48%;
margin-top: 1%;
`

const Colour = styled.div`
background: #DCF2F8;
width:90%;
border-radius: 20px;
margin-bottom:100px;
margin-left:3%;
margin-right:3%;
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

const IconText = styled.h5`
color:black;
min-width: 55%;
display:flex;
justify-content:center;
align-items:center;
margin-left: 5%;
margin-right: 5%;
font-size: 35px;
`

const CardDiv = styled.div`
    position:relative;
    left:10%;
    right:10%;
    width:100%;
    padding-bottom:5%;

`