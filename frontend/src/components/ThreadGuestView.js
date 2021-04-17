import React from 'react'
import ThreadCardGuest from './ThreadCardGuest'
import PostCardGuest from "./PostCardGuest";
import styled from 'styled-components'
import { useLocation, useParams} from "react-router-dom"
import {useEffect, useState} from "react";
import axios from 'axios';
import RichTextEditor from "./functionality/RichTextEditor";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function ThreadGuest(props) {

    const [posts, setPosts] = React.useState([{"id":'',"Creator":{"id":0,"username":"","email":""},"TimeStamp":"","Body":"","Poll_Title":null,"Poll_Yes":'',"Poll_No":''}])
    const [flag, setFlag] = useState(false)
    const d = new Date()
    const { id } = useParams();
    console.log("ningo", posts)

    useEffect(() => {
        let isComponentMounted = true;

        let url = `api/forum/threads/` + id
        axios.get(url).then((res) => {
            if (isComponentMounted){
                
                console.log(posts, "set new")
                console.log(res.data, "Nptt")
                setPosts(res.data)
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
                    {props.location.state.Title}
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

                <RichTextEditor />
                </Lower>
            </Container>
            )
    
}

export default ThreadGuest

const Results = styled.div`
    width:1100px;
    display:grid;
    height: 200px;
    margin-top: 65px;
    grid-template-rows: 200px 200px 200px 200px;//one 200px for each card, should be bigger than the card
`
const Lower = styled.div`
background: #DCF2F8;
width: 1100px;
height:1600px;
`

const Results1 = styled.div`
    padding-top: 20px;
    width:1100px;
    display:grid;
    height: 200px;

    grid-template-rows: 200px 200px 200px 200px;//one 200px for each card, should be bigger than the card
`
const Container = styled.div`
margin-left: 120px;
width: 1100px;
height:1600px;

`

const Heading = styled.div`
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
bottom: 87.28%;
margin-bottom: 30px;
    
`
const Report = styled.h3`
width: 151px;
height: 52px;

background: #CE1010;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;

`

const Delete = styled.h3`
margin-left: 13px;
width: 151px;
height: 52px;

background: #CE1010;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;

`

const DText = styled.h3`
width: 125px;
margin-left: 13px;
padding-top: 13px;

font-family: Manrope;
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 25px;
color: #FFFFFF;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const RText = styled.h3`
width: 125px;
margin-left: 13px;
padding-top: 13px;

font-family: Manrope;
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 25px;
color: #FFFFFF;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const RP = styled.h3`
height: 25px;
padding-top: 13px;
display:flex;
flex-direction:row;
margin-left: 779px;
margin-top: 13px;
`