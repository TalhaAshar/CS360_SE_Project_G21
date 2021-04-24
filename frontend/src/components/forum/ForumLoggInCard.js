import React from 'react'
import styled from 'styled-components'
import CommentIcon from '@material-ui/icons/Comment';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import {HashRouter as Router, Route, Switch, Link} from 'react-router-dom'
import {useEffect} from "react";
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function ForumLoggInCard({username, title, category, postcount, timestamp, desc, id}) {

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

    return (
        <Container>
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
            <TimeIcon>
                <QueryBuilderIcon/>
                <text style={{paddingTop:"1px"}}>{post_time} {placeholder}</text>
            </TimeIcon>
            <ThreadTitle>{title.substr(0, 20)}</ThreadTitle>
            <ThreadCategory>{category}</ThreadCategory>
            <ThreadMinorDetail dangerouslySetInnerHTML={{ __html:desc}} />
        </ThreadDetailContainer>
        <ThreadTimePostContainer>
            <Comment>
                <CommentIcon/>
                <text style={{paddingTop:"1px"}}>{postcount} {postholder}</text>
            </Comment>
        </ThreadTimePostContainer>

        </Container>
    )
}

export default ForumLoggInCard

const Container = styled.div`
    width:500px;
    height:180px;
    display:flex;
    border-radius:12px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;


`
const ImageUserNameContainer = styled.div`
    margin-left:10%;
    margin-top:10%;

`
const ImageContainer = styled.div`

`
const Image = styled.img`
    border-radius:30px;
`
const UserName = styled.h3`
`
const ThreadDetailContainer = styled.div`
    margin-top:5%;
    margin-left:10%;
`
const ThreadTitle = styled.h4`
    width:200px;
    overflow:hidden;
`
const ThreadCategory = styled.h4`
    min-width:200px;
    overflow:hidden;
`
const ThreadMinorDetail = styled.h6`
    width:200px;
    overflow:hidden;
`
const ThreadTimePostContainer = styled.div`
    position:relative;
    left:1%;
    margin-top:5%;
    padding-right:4px;
    justify-content:flex-end;
    

`
const Comment = styled.div`
display:flex;
margin-bottom:10px;

`
const TimeIcon = styled.div`
display:flex;
margin-bottom:2px;
margin-top:2px;
`
