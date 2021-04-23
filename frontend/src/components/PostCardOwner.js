import React from 'react'
import styled from 'styled-components'
import CommentIcon from '@material-ui/icons/Comment';
import ReplyIcon from '@material-ui/icons/Reply';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {useEffect, useState} from "react";
import axios from 'axios';
import {HashRouter as Router, Route, Switch, Link} from 'react-router-dom'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';



function PostCardOwner({first, post_id, thread_id, username, timestamp, desc, id, replyHandler, postHandler, editHandler}) {

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

    function deletePost(){

        let url = "api/forum/post/delete/" + post_id + "/" + thread_id
        axios.post(url).then((res) => {
            console.log("deleted")
            postHandler(res.data)
        })
        .catch(error => console.log('Error:', error))
    }

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
        <ThreadDetailContainer>
            <ThreadMinorDetail dangerouslySetInnerHTML={{ __html:desc}}/>
        </ThreadDetailContainer>
        <ThreadTimePostContainer>
            <Comment>
                <CommentIcon/>
                <h5 style={{paddingTop:"4px"}}>{post_time} {placeholder}</h5>
            </Comment>
            
            
            <Comment1>
            <ReplyIcon style = {{fontSize:'30px'}} onClick={() => replyHandler("@" + username)}/>
            </Comment1>

            <Comment1>
                   {first && <DeleteIcon style = {{fontSize:'30px'}} onClick={deletePost}/>}
            </Comment1>
            <Comment2>
                    <EditIcon style = {{fontSize:'30px', marginLeft:"auto"}} onClick={() => editHandler(desc, post_id)}/>
            </Comment2>
        </ThreadTimePostContainer>

        </Container>
    )
}

export default PostCardOwner

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
    display:flex;
    flex-flow: row wrap;
    margin-left:70%;
    margin-top:-6%;
`
const Comment = styled.div`
    margin-bottom:10px;
    padding-bottom: 30px;
    margin-right:5%;
`


const Commentf = styled.div`
margin-bottom:10px;
margin-right:5%;
`

const TimeIcon = styled.div`
padding-top: 10px;
margin-right:5%;
`
const Comment1 = styled.div`
margin-right:5%;
`
const Comment2 = styled.div`
margin-left:10px;
`
const Commentb = styled.div`
display:flex;
`