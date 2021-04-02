import React from 'react'
import styled from 'styled-components'
import ForumGuestThreadCard from './ForumGuestThreadCard'
import {useEffect, useState} from "react";
import axios from 'axios';

function ForumGest() {
    const [threads, setThreads] = React.useState([{'id' : 0, 'PostCount' : 0, 'Title' : '', 'Timestamp' : '', 'Category' : '', 'Creator' : {}, 'Base_View' : ''}])
    const d = new Date()
    function getData(){
        axios.get(`api/forum/guest/home`).then((res) => {
            setThreads(res.data)
            console.log('ye boi', res.data)
            console.log('nu boi', threads.length)
        })
        .catch(error => console.log('Error:', error))
    }

    useEffect(() => {
        getData()
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

`
const ThreadBar = styled.div`
    width: 1179px;
    height: 60px;
    color:white;
    background-color:#03204C;
    margin-top:20px;
    margin-left:50px;
    display:flex;
    justify-content:center;
    border-radius:12px;


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
