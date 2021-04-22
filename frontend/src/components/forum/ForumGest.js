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
                                }}>
                                <ForumGuestThreadCard id={elem.Creator["id"]} title={elem.Title} username={elem.Creator["username"]} timestamp={parseInt ((d.getTime() - Date.parse(elem.Timestamp)) / 3600000)} category={elem.Category} postcount={elem.PostCount} desc={elem.Base_View}/>
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
width:1100px;
display:grid;
grid-template-rows: 200px 200px 200px 200px 200px;//one 200px for each card, should be bigger than the card
padding-top:20px;
margin-left:20px;
margin: 0 auto;


`
const Text = styled.h3`
    display:flex;
    justify-content:center;
    align-items:center;
`

const BodyRecent = styled.div`
    margin-left:50px;
    margin-right:50px;
    margin-top:20px;
    margin-bottom:20px;
    display:grid;
    grid-template-rows: 200px 200px 200px 200px;
    background:#DCF2F8;
    padding-left:40px;
    padding-top:20px;
    padding-bottom:20px;
    padding-right:40px;
    height:1250px;
    border-radius:8px;
    

`
