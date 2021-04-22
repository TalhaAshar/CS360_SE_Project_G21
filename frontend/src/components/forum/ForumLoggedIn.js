import React from 'react'
import styled from 'styled-components'
import ForumLoggInCard from './ForumLoggInCard'
import {useEffect, useState} from "react";
import axios from 'axios';
import {Link} from 'react-router-dom'

function ForumLoggedIn() {

    const [threads, setThreads] = React.useState([])
    const d = new Date()

    useEffect(() => {
        let isComponentMounted = true;
        axios.get(`api/forum/user/home`).then((res) => {
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
            <BookTitleContainer><h1>Discussion Forum</h1></BookTitleContainer>
            <AnnouncementsContainer>
                <HeadContainer1>
                    <HeadContainer>
                    <Link to={{
                        pathname : "/forum/category/user",
                        state : "Announcements"
                    }}>
                    <CategoryTitle>
                        Announcements
                    </CategoryTitle>
                    </Link>
                    </HeadContainer>
                    <Link to="/thread/add">
                    <AddThread>
                        Add Thread
                    </AddThread>
                    </Link>
                </HeadContainer1>
                <Colour>
                        <Results>
                        {
                            threads.map((elem, index) => {
                                if(index < 4){
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
            </AnnouncementsContainer>
            <GeneralContainer>
            <HeadContainer>
                    <Link to={{
                        pathname : "/forum/category/user",
                        state : "General"
                    }}>
                    <CategoryTitle>
                        General
                    </CategoryTitle>
                    </Link>
            </HeadContainer>
                
                <Colour>
                        <Results>
                        {
                            threads.map((elem, index) => {
                                if(index >= 4 && index < 8){
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
            </GeneralContainer>
            <OtherContainer>
                <HeadContainer>
                    <Link to={{
                        pathname : "/forum/category/user",
                        state : "Other"
                    }}>
                        <CategoryTitle>
                            Other
                        </CategoryTitle>
                    </Link>
                    </HeadContainer>
                    <Colour>
                        <Results>
                        {
                            threads.map((elem, index) => {
                                if(index >= 8 && index < 12){
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
            </OtherContainer>
        </Container>
    )
}

export default ForumLoggedIn

const Colour = styled.div`
background: #DCF2F8;
width:80%;
height:450px;
border-radius: 20px;
margin-bottom:100px;
margin-left:10%;
margin-right:10%;
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
padding-top:20px;
padding-left:3%;
margin-left:20px;
margin: 0 auto;
display:grid;
grid-template-rows: 200px 200px;
grid-template-columns: 520px 520px


`

const Container = styled.div`
    margin-top: 2%;

`
const Head = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    background:#03204C;
    color:white;
    font-size:30px;
    font-weight:bold;
    margin-top:30px;
    width:1080px;
    height:60px;
    border-radius: 10.8594px;

`
const HeadContainer = styled.div`
    background: #0A3977;
    border-radius:20px;
    color:white;
    min-width: 14%;
    width: 1%;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-left: 10%;
margin-right: 10%;
margin-bottom: 2%;
margin-top: 2%;
`

const HeadContainer1 = styled.div`
    display:flex;
    justify-content:space-between;
    

`
const CategoryTitle = styled.h4`
    color:white;
    background: #0A3977;
    font-size: 20px;
`

const CategoryTitle1 = styled.h4`
width:110%;
font-size: 20px;
    padding-right:4px;
    padding-left:4px;
    margin-right:25px;
    margin-left:10%;
    margin-top:20px;
    background:#0A3977;
    color:white;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius: 20px;
`
const AddThread = styled.h4`
    width:250px;
    height:40px;
    padding-right:4px;
    padding-left:4px;
    margin-right:25px;
    margin-top:20px;
    background:#3B058B;
    color:white;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius: 8px;

`
const AnnouncementsContainer = styled.div`
margin-top:20px;
margin-bottom:2px;

`
const CategoryThreadContainer = styled.div`
    display:grid;
    max-width:1080px;
    max-height:450px;
    grid-template-rows: 200px 200px;
    grid-template-columns: 520px 520px;
    margin-top:25px;
    margin-bottom:25px;
    background:#DCF2F8;
    padding-top:25px;
    padding-left:30px;
    padding-bottom:10px;
    padding-right:30px;
    border-radius: 16px;
    margin: 0 auto;

    
`
const GeneralContainer = styled.div`
    margin-top:20px;
    margin-bottom:2px;

`
const OtherContainer = styled.div`
    margin-bottom:20px;
    
`