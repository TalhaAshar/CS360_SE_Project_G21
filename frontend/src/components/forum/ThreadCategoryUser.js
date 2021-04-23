import React from 'react'
import styled from 'styled-components'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import axios from 'axios';
import {useEffect, useState} from "react";
import { useLocation, useParams} from "react-router-dom"
import ForumLoggInCard from "./ForumLoggInCard";
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor';
import {Link} from 'react-router-dom'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function ThreadCategory() {
    const [threads, setThreads] = React.useState([])
    const[start, setStart] = React.useState(0)
    const d = new Date()
    const { category } = useParams();

    console.log(category, "ig")

    useEffect(() => {
        let isComponentMounted = true;
        let url = "api/forum/threads/" + category
        axios.get(url).then((res) => {
            if (isComponentMounted){
                console.log(res.data)
                setThreads(res.data)
            };
        })
        .catch(error => console.log('Error:', error))
        return () => {
            isComponentMounted = false;
        }
    }, [category])

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


    return (
        <Container>
            <BookTitleContainer><h1>{category}</h1></BookTitleContainer>
            <Nextpage>
                <SkipPreviousRoundedIcon style = {{marginLeft:'0px'}} onClick={leftClick}/>
                <SkipNextRoundedIcon style = {{}} onClick={rightClick}/>
            </Nextpage>
            <Colour>
                <Results>
                   {
                    threads.map((elem, index) => {
                        if(index >= start && index < (start + 8) && index < threads.length){
                            let placeholder = "/thread/user/" + elem.id
                            return(
                                <Link to={{
                                    pathname : placeholder,
                                    state : threads[index]
                                }}>
                                <ForumLoggInCard id={elem.Creator["id"]} title={elem.Title} username={elem.Creator["username"]} timestamp={parseInt ((d.getTime() - Date.parse(elem.Timestamp)) / 3600000)} category={elem.Category} postcount={elem.PostCount} desc={elem.Base_View}/>
                                </Link>
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

export default ThreadCategory

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
margin-top: 2%;
`

const Results = styled.div`
width:1100px;
display:grid;
padding-top:20px;
padding-left:3%;
margin-left:20px;
margin: 0 auto;
display:grid;
grid-template-rows: 200px 200px 200px 200px;
grid-template-columns: 520px 520px
`
const Container = styled.div`
margin-left: 3%;
margin-right: 3%;

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
height:1000px;
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