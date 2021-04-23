import React from 'react'
import styled from 'styled-components'
import CommentIcon from '@material-ui/icons/Comment';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import CardMedia from '@material-ui/core/CardMedia';
import ReplyIcon from '@material-ui/icons/Reply';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Delete } from '@material-ui/icons';
import {useEffect, useState} from "react";
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


function ForumGuestThreadCard({username, title, category, postcount, timestamp, desc, id}) {

    let placeholder = "Hours"
    let post_time = timestamp

    if(post_time > 24){
        placeholder = "Days"
        post_time = Math.floor(post_time / 24)
    }

    const [profile, setProfile] = React.useState({})
    const [flag, setFlag] = React.useState(false)

    useEffect(() => {
        let isComponentMounted = true;
        let url = "api/accounts/profile/" + id
        axios.get(url).then((res) => {
            if (isComponentMounted){
                setProfile(res.data)
                setFlag(true)
            };
        })
        .catch(error => console.log('Error:', error))
        return () => {
            isComponentMounted = false;
        }
    }, [])

    return (
        
        <Container>
        <Link to={profile_url}>
            <ImageUserNameContainer>
                <ImageContainer>
                {flag && <Image src={profile["ProfileImage"]}
                        width="100px" height="100px"
                    />}
                </ImageContainer>
                <UserName>{username}</UserName>
            </ImageUserNameContainer>
        </Link>
        <ThreadDetailContainer>
            <ThreadTitle>{title}</ThreadTitle>
            <ThreadCategory>{category}</ThreadCategory>
            <ThreadMinorDetail dangerouslySetInnerHTML={{ __html:desc}} />
        </ThreadDetailContainer>
        <ThreadTimePostContainer>
            <Comment>
                <CommentIcon/>
                <h5 style={{paddingTop:"4px"}}>{postcount} Posts</h5>
            </Comment>
            <Comment>
            
            <Comment1>
            <ReplyIcon style = {{fontSize:'30px'}}/>
            </Comment1>
            <Comment2>
            <ReportProblemIcon style = {{fontSize:'30px'}}/>
            </Comment2>
            </Comment>
            <TimeIcon>
            <Comment1>
                    <DeleteIcon style = {{fontSize:'30px'}}/>
            </Comment1>
            <Comment2>
                    <EditIcon style = {{fontSize:'30px'}}/>
            </Comment2>
            </TimeIcon>
        </ThreadTimePostContainer>

        </Container>
    )
}

export default ForumGuestThreadCard

const Container = styled.div`
width:1100px;
height:180px;
display:flex;
background:white;
border-radius:12px;
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
const ThreadTitle = styled.h4`
`
const ThreadCategory = styled.h4`
`
const ThreadMinorDetail = styled.h6`
`
const ThreadTimePostContainer = styled.div`
    margin-left:680px;
    margin-top:60px;
`
const Comment = styled.div`
display:flex;
margin-bottom:10px;
`
const TimeIcon = styled.div`
display:flex;
padding-top: 10px;
`
const Comment1 = styled.div`
display:flex;
`
const Comment2 = styled.div`
display:flex;
margin-left:10px;
`
const Commentb = styled.div`
display:flex;
`