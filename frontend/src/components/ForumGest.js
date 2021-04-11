import React from 'react'
import styled from 'styled-components'
import ForumGuestThreadCard from './ForumGuestThreadCard'
import {useEffect, useState} from "react";
import axios from 'axios';

function ForumGest() {
    const [threads, setThreads] = React.useState([{'id' : 0, 'PostCount' : 0, 'Title' : '', 'Timestamp' : '', 'Category' : '', 'Creator' : {}, 'Base_View' : ''}])
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
            <ThreadBar>
                <Text>
                    Recent Thread
                </Text>
            </ThreadBar>
            <BodyRecent>
                    {
                        threads.map((elem, index) => {
                            if(index < 6){
                            return(
                                <ForumGuestThreadCard title={elem.title} username={elem.Creator["username"]} timestamp={parseInt ((d.getTime() - Date.parse(elem.Timestamp)) / 3600000)} category={elem.Category} postcount={elem.PostCount} desc={elem.Base_View}/>
                            )
                            }
                        })
                    }
            </BodyRecent>
        </Container>
    )
}

export default ForumGest

const Container = styled.div`
    max-width:100%;
    max-height:100%;
    margin-left:3%;
    margin-right:3%;
`
const ThreadBar = styled.div`
    min-width: 55%;
    min-height: 4%;
    margin-top: 2%;
    display:flex;
    justify-content:center;
    align-items:center;
    color:white;
    background: #03204C;
    border-radius: 8px;
    margin-left:2%;
    margin-right:2%;


`
const Text = styled.h3`
    display:flex;
    justify-content:center;
    align-items:center;
`

const BodyRecent = styled.div`
    margin-left:2%;
    margin-right:2%;
    margin-top:1%;
    margin-bottom:1%;
    display:grid;
    grid-template-rows: 200px 200px 200px 200px;
    background:#DCF2F8;
    padding-top:2%;
    padding-bottom:2%;
    padding-left:2%;
    height:1250px;
    border-radius:8px;

`
