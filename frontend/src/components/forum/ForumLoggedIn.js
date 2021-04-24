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
                <Head>
                <HeadContainer style={{marginLeft:"8%"}}>
                    <Link to={"/forum/category/Announcements"} style={{textDecoration:"none"}}>
                        <CategoryTitle>
                            Announcements
                        </CategoryTitle>
                    </Link>
                </HeadContainer>
                <HeadContainer1>
                    <Link to="/thread/add" style={{textDecoration:"none"}}>
                        <AddThread>
                            Add Thread
                        </AddThread>
                    </Link>
                </HeadContainer1>
                </Head>
                <Colour>
                        <Results>
                        {
                            threads.map((elem, index) => {
                                if(index < 4){
                                    let placeholder = "/thread/user/" + elem.id
                                    return(
                                        <Link to={placeholder} style={{textDecoration:"none"}}>
                                            <CardDiv>
                                          <ForumLoggInCard id={elem.Creator["id"]} title={elem.Title} username={elem.Creator["username"]} timestamp={parseInt ((d.getTime() - Date.parse(elem.Timestamp)) / 3600000)} category={elem.Category} postcount={elem.PostCount} desc={elem.Base_View}/>
                                          </CardDiv>
                                        </Link>
                                    )
                                }
                            })
                        }
                        </Results>
                    </Colour>
            </AnnouncementsContainer>
            <GeneralContainer>
            <HeadContainer style={{marginBottom:"2%"}}>
                    <Link to={"/forum/category/General"} style={{textDecoration:"none"}}>
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
                                        }} style={{textDecoration:"none"}}>
                                        <CardDiv>
                                        <ForumLoggInCard id={elem.Creator["id"]} title={elem.Title} username={elem.Creator["username"]} timestamp={parseInt ((d.getTime() - Date.parse(elem.Timestamp)) / 3600000)} category={elem.Category} postcount={elem.PostCount} desc={elem.Base_View}/>
                                        </CardDiv>
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
                <HeadContainer style={{marginBottom:"2%"}}>
                    <Link to={"/forum/category/Other"} style={{textDecoration:"none"}}>
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
                                        }} style={{textDecoration:"none"}}>
                                        <CardDiv>
                                        <ForumLoggInCard id={elem.Creator["id"]} title={elem.Title} username={elem.Creator["username"]} timestamp={parseInt ((d.getTime() - Date.parse(elem.Timestamp)) / 3600000)} category={elem.Category} postcount={elem.PostCount} desc={elem.Base_View}/>
                                        </CardDiv>
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
    height:100%;
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
    margin-top:3%;
`

const Results = styled.div`
    width:100%;
    height:100%;
    padding-top:20px;
    padding-left:3%;
    padding-right:4%;
    display:flex;
    flex-flow:row wrap;
    justify-content:space-between;
    
`
const CardDiv = styled.div`
    margin-left:2%;
    padding-bottom:8%;
`
const Container = styled.div`
    margin-top: 4%%;
    background:white;

`
const Head = styled.div`
    display:flex;
    justify-content:space-between;
    margin-top:3%;
    margin-left:3%;
    margin-right:3%;
    margin-bottom:5%;
    
`
const HeadContainer = styled.div`
    background: #0A3977;
    border-radius:20px;
    color:white;
    min-width: 14%;
    width: 1%;
    height:5%;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top: 2%;
    margin-left:10%;
`

const HeadContainer1 = styled.div`
    display:flex;
    justify-content:space-between;
    margin-right:8%;
`
const CategoryTitle = styled.h4`
    color:white;
    background: #0A3977;
    font-size: 20px;
    border-radius:8px;
`

const AddThread = styled.h4`
    width:250px;
    height:60%;
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
