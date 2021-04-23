import React from 'react'
import PostCardGuest from "./PostCardGuest";
import styled from 'styled-components'
import { useLocation, useParams} from "react-router-dom"
import {useEffect, useState} from "react";
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function ThreadGuest() {

    const [posts, setPosts] = React.useState([{"id":'',"Creator":{"id":0,"username":"","email":""},"TimeStamp":"","Body":"","Poll_Title":null,"Poll_Yes":'',"Poll_No":''}])
    const [thread, setThread] = React.useState()
    const d = new Date()
    const { id } = useParams();

    useEffect(() => {
        let isComponentMounted = true;

        let url1 = `api/forum/threads/` + id
        axios.get(url1).then((res) => {
            if (isComponentMounted){
                setPosts(res.data)
            };
        })
        .catch(error => console.log('Error:', error))

        let url2 = `api/forum/threads/retrieve/` + id
        axios.get(url2).then((res) => {
            if (isComponentMounted){
                setThread(res.data)
            };
        })
        .catch(error => console.log('Error:', error))

        return () => {
            isComponentMounted = false;
        }
    }, [id])

            return(
                <Container>
            <Heading>
                    <Background>
                        { thread ? thread['Title'] : null }
                    </Background>
                </Heading>
            <Lower>
                
                <Results>
                    {
                        posts.map((elem, index)  => {
                                return(
                                    <PostCardGuest id={elem.Creator["id"]} username={elem.Creator["username"]} desc={elem.Body} timestamp={parseInt ((d.getTime() - Date.parse(elem.TimeStamp)) / 3600000)}/>
                                )
                        })
                    }
                </Results>

                </Lower>
            </Container>
            )
    
}

export default ThreadGuest
const Container = styled.div`
    height:100%;
`


const Results = styled.div`
    padding-top: 20px;
    width:90%;
    display:flex;
    flex-flow:row wrap;
    height:100%;
    margin-top: 65px;
    margin: 0 auto;
    overflow-wrap:anywhere;
    background:#DCF2F8;
    margin-left:3%;
    margin-bottom:3%;
    padding-left:7%;
    padding-bottom:3%;
    
`
const Lower = styled.div`
   margin-bottom:3%;
   margin-left:3%;
   margin-right:3%;
   margin-top:3%;
`

const Heading = styled.div`
`
const Background = styled.div`
    border-radius: 20px 20px 20px 20px;
    color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    width:94%;
    height:100%;
    background: #0A3977;
    font-family: Manrope;
    font-style: normal;
    font-weight: bold;
    font-size: 45px;
    line-height: 142%;
    bottom: 87.28%;
    overflow-wrap:anywhere;
    margin-left:3%;
    margin-right:3;
    margin-top:2%;
    
`