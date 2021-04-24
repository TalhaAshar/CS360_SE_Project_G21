import React from 'react'
import styled from 'styled-components'
import CommentIcon from '@material-ui/icons/Comment';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import {HashRouter as Router, Route, Switch, Link} from 'react-router-dom'
import CardMedia from '@material-ui/core/CardMedia';
import {useEffect} from "react";
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function ForumGuestThreadCard({username, title, category, postcount, timestamp, desc, id}) {

    let placeholder = "Hours"
    let postholder = "Posts"

    if(postcount == 1){
        postholder = "Post"
    }
    
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

    const [profile, setProfile] = React.useState({'user':{'id':0}})
    const [profile_url, setUrl] = React.useState('/profile/')
    const [flag, setFlag] = React.useState(false)

    useEffect(() => {
        let isComponentMounted = true;
        let url = "api/accounts/profile/" + id
        axios.get(url).then((res) => {
            if (isComponentMounted){
                setProfile(res.data)
                setFlag(true)
                setUrl(profile_url + res.data["user"]["id"])
            };
        })
        .catch(error => console.log('Error:', error))
        return () => {
            isComponentMounted = false;
        }
    }, [])

    console.log("Post time", post_time)
    return (
        
        <Container>
            <ContainerDiv>
        <ContainerImageThreadDetails>
        <Link to={profile_url} style={{textDecoration:"none"}}>
            <ImageUserNameContainer>
                <ImageContainer>
                    {flag && <Image src={profile["ProfileImage"]}
                        width="100px" height="100px"
                    />}
                </ImageContainer>
                    <UserName>
                        {username}
                    </UserName>
            </ImageUserNameContainer>
        </Link>
        <ThreadDetailContainer>
            <ThreadTitle>{title.substr(0, 20)}</ThreadTitle>
            <ThreadCategory>{category}</ThreadCategory>
            <ThreadMinorDetail dangerouslySetInnerHTML={{ __html:desc}}/>
        </ThreadDetailContainer>
        </ContainerImageThreadDetails>
        <ThreadTimePostContainer>
            <Comment>
                <CommentIcon/>
                <h5 style={{paddingTop:"4px", marginLeft:"10%"}}>{postcount} {postholder}</h5>
            </Comment>
            <TimeIcon>
                <QueryBuilderIcon/>
                <h5 style={{paddingTop:"4px", marginLeft:"10%"}}>{post_time} {placeholder}</h5>
            </TimeIcon>
        </ThreadTimePostContainer>
        </ContainerDiv>
        </Container>
    )
}

export default ForumGuestThreadCard

const Container = styled.div`
    width:100%;
    height:100%;
    background:white;
    border-radius:12px;
    margin-bottom:3%;
`
const ContainerDiv = styled.div`

`
const ContainerImageThreadDetails = styled.div`
    display:flex;
    align-items:center;
    justify-content:flex-start;

`
const ImageUserNameContainer = styled.div`
    margin-left:10%;
    margin-top:20%;

`
const ImageContainer = styled.div`

`
const Image = styled.img`
    border-radius:30px;
`
const UserName = styled.h3`
`
const ThreadDetailContainer = styled.div`
    margin-top:-2%;
    margin-left:2%;
`
const ThreadTitle = styled.h4`
`
const ThreadCategory = styled.h4`
`
const ThreadMinorDetail = styled.h6`
`
const ThreadTimePostContainer = styled.div`
    margin:20px 0% 0% 500px;
    display:flex;
    justify-content:flex-end;
`
const Comment = styled.div`
    display:flex;
    margin-bottom:2%;
    margin-left:20%;
    margin-right:20%;

`
const TimeIcon = styled.div`
    display:flex;
    margin-left:30%;
    margin-right:30%;
`

