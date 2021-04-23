import React from 'react'
import styled from 'styled-components'
import ForumGuestThreadCard from './ForumGuestThreadCard';
import {useEffect, useState} from "react";
import axios from 'axios';
import {Link} from "react-router-dom";

function ForumGest() {

    const [threads, setThreads] = React.useState([])
    const d = new Date()

    useEffect(() => {
        let isComponentMounted = true;
        axios.get(`api/forum/guest/home`).then((res) => {
            if (isComponentMounted){
                setThreads(res.data)
            };
        })
        .catch(error => console.log('Error:', error))
        return () => {
            isComponentMounted = false;
        }
    }, [])

    return (
        <Container>
            
            <BookTitleContainer><h1>Recent Threads</h1></BookTitleContainer>
           
            <BodyRecent>
                <Results>

                
                    {
                        threads.map((elem, index) => {
                            if(index < 6){
                            let placeholder = "/thread/guest/" + elem.id
                            return(
                                <Link to={{
                                    pathname : placeholder,
                                    state : threads[index]
                                }} style={{textDecoration:"none", marginBottom:"1%"}}>
                                <ThreadDiv>
                                <ForumGuestThreadCard id={elem.Creator["id"]} title={elem.Title} username={elem.Creator["username"]} timestamp={parseInt ((d.getTime() - Date.parse(elem.Timestamp)) / 3600000)} category={elem.Category} postcount={elem.PostCount} desc={elem.Base_View}/>
                                </ThreadDiv>
                                </Link>
                            )
                            }
                        })
                    }
                </Results>

            </BodyRecent>
        </Container>
    )
}

export default ForumGest

const Container = styled.div`
    width:100%;
    height:100%;

`

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
`
const Results = styled.div`
    width:100%;
    display:flex;
    flex-flow:row wrap;
    padding-top:20px;
    margin-left:22px;
    margin-bottom:5%;

`
const ThreadDiv = styled.div`
    width:100%;
    padding-left:10%;
`
const Text = styled.h3`
    display:flex;
    justify-content:center;
    align-items:center;
`

const BodyRecent = styled.div`
    margin-left:3%;
    margin-right:3%;
    margin-top:2%;
    margin-bottom:5%;
    display:flex;
    flex-flow:row wrap;
    background:#DCF2F8;
    padding-top:2%;
    padding-bottom:2%;
    padding-right:5.5%;
    padding-left:5.5%;
    height:90%;
    border-radius:8px;
`

