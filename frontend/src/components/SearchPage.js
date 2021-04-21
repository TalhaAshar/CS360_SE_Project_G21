import React from 'react'
import LinearCard from './LinearCard'
import styled from 'styled-components'
import './popup.scss';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import axios from 'axios';
import {useEffect, useState} from "react";
import { useLocation, useParams} from "react-router-dom"
import Filter from "./SearchFilter";
import NewLinearCard from "./publications/NewLinearCard";
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function SearchPage() {

    const { param } = useParams();
    const [pubs, setPubs] = useState([])
    const [filters, setFilters] = useState([])
    const [start, setStart] = useState(0)

    function handleFilters(value){
        console.log(value, "YES WE ARE EHERE")
        const temp = filters.indexOf(value)
        
        if(temp == -1)
        {
            console.log("ADDING")
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
        }
    }

    function rightClick(){
        if(start + 8 < pubs.length){
            setStart(start + 8)
        }
    }
    console.log("MMMM", param)
 
     useEffect(() => {
        let isComponentMounted = true;

        let url = "api/main/query/?search=" + param
        for (let index = 0; index < filters.length; index++) {
            url = url + "&search_fields=" + filters[index]
        }
        console.log(url, "edfghtuehhe")
        axios.get(url).then((res) => {
            console.log("THEN HANDLER")
            if (isComponentMounted){
                console.log("COMP")
                setPubs(res.data)
                console.log(res)
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

        
            <Heading>
                <Background>
                    <Text>

                Search Results
                </Text>
                </Background>
            </Heading>

            <Nextpage>
            <SkipPreviousRoundedIcon style = {{marginLeft:'0px'}} onClick={leftClick}/>
            <SkipNextRoundedIcon style = {{}} onClick={rightClick}/>
            </Nextpage>

            < Filter onChange={handleFilters}/>
            <Colour>
            
            {(pubs.length == 0) && <p>Your search filters returned no matching results.</p>}
                <Results>
                   {
                    pubs.map((elem, index) => {
                        if(index >= start && index < (start + 8) && index < pubs.length){
                            return(
                                <NewLinearCard title={elem.Title} author={elem.Authors} front={elem.Front_Cover} id={elem.id}/>
                                )
                        }
                        console.log(index)
                    })
                }
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