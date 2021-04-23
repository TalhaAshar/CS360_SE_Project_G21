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
            <Head>Discussion Forum</Head>
            <AnnouncementsContainer>
                <HeadContainer>
                    <Link to={"/forum/category/Announcements"}>
                        <CategoryTitle>
                            Announcements
                        </CategoryTitle>
                    </Link>
                    <Link to="/thread/add">
                        <AddThread>
                            Add Thread
                        </AddThread>
                    </Link>
                </HeadContainer>
                <CategoryThreadContainer>
                    {
                        threads.map((elem, index) => {
                            if(index < 4){
                            let placeholder = "/thread/user/" + elem.id
                            return(
                                <Link to={placeholder}>
                                <ForumLoggInCard id={elem.Creator["id"]} title={elem.Title} username={elem.Creator["username"]} timestamp={parseInt ((d.getTime() - Date.parse(elem.Timestamp)) / 3600000)} category={elem.Category} postcount={elem.PostCount} desc={elem.Base_View}/>
                                </Link>
                            )
                            }
                        })
                    }
                </CategoryThreadContainer>
            </AnnouncementsContainer>
            <GeneralContainer>
            <HeadContainer>
                    <Link to={"/forum/category/General"}>
                        <CategoryTitle>
                            General
                        </CategoryTitle>
                    </Link>
                </HeadContainer>
                <CategoryThreadContainer>
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
                        })
                    }

                </CategoryThreadContainer>
            </GeneralContainer>
            <OtherContainer>
                <HeadContainer>
                    <Link to={"/forum/category/Other"}>
                        <CategoryTitle>
                            Other
                        </CategoryTitle>
                    </Link>
                    </HeadContainer>
                    <CategoryThreadContainer>
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
                        })
                    }

                    </CategoryThreadContainer>
            </OtherContainer>
        </Container>
    )
}

export default ForumLoggedIn

const Container = styled.div`
    display:grid;
    max-width:1100px;
    max-height:1800px;
    grid-template-rows: 65 px 400px 400px 400px;
    margin-left:120px;

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
    display:flex;
    justify-content:space-between;

`
const CategoryTitle = styled.h4`
    width:250px;
    height:40px;
    padding-right:4px;
    padding-left:4px;
    margin-right:25px;
    margin-top:20px;
    background:#03204C;
    color:white;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius: 8px;
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
    max-width:1100px;
    height:500px;
    margin-top:20px;
    margin-bottom:20px;

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
`
const GeneralContainer = styled.div`
    margin-top:20px;
    margin-bottom:2px;

`
const OtherContainer = styled.div`
    margin-bottom:20px;

`