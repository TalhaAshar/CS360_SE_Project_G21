import React from 'react'
import styled from 'styled-components'
import CommentIcon from '@material-ui/icons/Comment';
import {useEffect, useState} from "react";
import axios from 'axios';
import {HashRouter as Router, Route, Switch, Link} from 'react-router-dom'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


function PostCardGuest({username, timestamp, desc, id}) {

    let placeholder = "Hours"
    
    let post_time = timestamp

    if(post_time == 1){
        placeholder = "Hour"
    }

    if(post_time > 24){
        placeholder = "Days"
        post_time = Math.floor(post_time / 24)
    }

    if(post_time == 0){
        placeholder = "Now"
        post_time = ""
    }

    const [profile, setProfile] = React.useState({})
    const [flag, setFlag] = React.useState(false)
    const [profile_url, setUrl] = React.useState('/profile/')

    useEffect(() => {
        let isComponentMounted = true;
        
            let url = "api/accounts/profile/" + id
            axios.get(url).then((res) => {
                if (isComponentMounted){
                    setProfile(res.data)
                    setUrl(profile_url + res.data["user"]["id"])
                };
            })
            .catch(error => console.log('Error:', error))
        setFlag(!flag)
        return () => {
            isComponentMounted = false;
        }
    }, [id])


    return (
        
        <Container>
        <Link to={profile_url} style={{textDecoration:"none"}}>
            <ImageUserNameContainer>
                <ImageContainer>
                
                    <Image src={profile["ProfileImage"]}
                        width="100px" height="100px"
                    />
                </ImageContainer>
                    <UserName>
                        {username}
                    </UserName>
            </ImageUserNameContainer>
        </Link>
        <ThreadTimePostContainer>
            <Comment>
                <CommentIcon/>
                <h5 style={{paddingTop:"4px"}}>{post_time}{placeholder}</h5>
            </Comment>
        </ThreadTimePostContainer>
        <ThreadDetailContainer>
            <ThreadMinorDetail dangerouslySetInnerHTML={{ __html:desc}} />
        </ThreadDetailContainer>
        </Container>
    )
}

export default PostCardGuest

const Container = styled.div`
    width:90%;
    background:white;
    border-radius:12px;
    margin-bottom:5%;
`
const ImageUserNameContainer = styled.div`
    margin-left:20px;
    margin-top:20px;
`
const ImageContainer = styled.div`
`
const Image = styled.img`
    border-radius:30px;
`
const UserName = styled.h3`
`
const ThreadDetailContainer = styled.div`
    margin-top:30px;
    margin-left:20px;
`

const ThreadMinorDetail = styled.div`
    margin-top:10px;
    overflow-wrap:break-word;
`
const ThreadTimePostContainer = styled.div`
    margin-left:80%;
    margin-top:-6%;
`
const Comment = styled.div`
    display:flex;
    margin-bottom:10px;
    padding-bottom: 30px;
`

