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


function PostCardAdmin({username, timestamp, desc, id}) {

    let placeholder = "Hours"
    let post_time = timestamp
    console.log("Ninpa id", id)
    if(post_time > 24){
        placeholder = "Days"
        post_time = Math.floor(post_time / 24)
    }

    const [profile, setProfile] = React.useState({})
    const [flag, setFlag] = React.useState(false)
    const [current, setCurrent] = React.useState(id)
    console.log("vurrent", current)

    useEffect(() => {
        let isComponentMounted = true;
        console.log("BACK IN HERE WITH ID", current)
        
            let url = "api/accounts/profile/" + id
            console.log("send prof", url)
            axios.get(url).then((res) => {
                if (isComponentMounted){
                    setProfile(res.data)
                    console.log("recv prof")
                    console.log(url, res.data)
                    
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
        <ImageUserNameContainer>
            <ImageContainer>
               
                <Image src={profile["ProfileImage"]}
                    width="100px" height="100px"
                />
            </ImageContainer>
            <UserName>{username}</UserName>
        </ImageUserNameContainer>
        <ThreadDetailContainer>
            <ThreadMinorDetail dangerouslySetInnerHTML={{ __html:desc}} />
        </ThreadDetailContainer>
        <ThreadTimePostContainer>
            <Comment>
                <CommentIcon/>
                <h5 style={{paddingTop:"4px"}}>{post_time}{placeholder}</h5>
            </Comment>
            <Commentf>
            
            <Comment1>
            <ReplyIcon style = {{fontSize:'30px'}}/>
            </Comment1>
            <Comment2>
            <ReportProblemIcon style = {{fontSize:'30px'}}/>
            </Comment2>
            </Commentf>
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

export default PostCardAdmin

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
padding-right: 155px;
`
const ThreadCategory = styled.h4`
`
const ThreadMinorDetail = styled.h4`
margin-top:10px;
`
const ThreadTimePostContainer = styled.div`
    margin-left:670px;
    margin-top:20px;
`
const Comment = styled.div`
display:flex;
margin-bottom:10px;
padding-bottom: 30px;
`

const Commentf = styled.div`
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