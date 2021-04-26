import React from 'react'
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import styled from 'styled-components'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function Activity(props) {

    const [thread, setThread] = React.useState({'id' : 0, 'Title' : '', 'Creator' : {'username' : 'temp'}})
    const [post, setPost] = React.useState({'Creator' : {'username' : ''}, 'ParentThread' : {'id' : 0}, 'Body' : ''})
    console.log(props)

    useEffect(() => {
        if(props.type == 'Thread'){
            let isComponentMounted = true;
            let url2 = `api/forum/threads/retrieve/` + props.pub.CreatedThread
            axios.get(url2).then((res) => {
                if (isComponentMounted){
                    setThread(res.data)
                };
            })
            .catch(error => console.log('Error:', error))
            
            return () => {
                isComponentMounted = false;
            }
        }
        else if(props.type == 'ReportPost'){
            let isComponentMounted = true;
            let url2 = `api/forum/posts/retrieve/` + props.pub.FiledReport["Relevant_Post"]
            axios.get(url2).then((res) => {
                if (isComponentMounted){
                    setPost(res.data)
                    console.log(res.data)
                };
            })
            .catch(error => console.log('Error:', error))
            
            return () => {
                isComponentMounted = false;
            }
        }
        else if(props.type == 'Post'){
            let isComponentMounted = true;
            let url2 = `api/forum/posts/parent/` + props.pub.CreatedPost
            axios.get(url2).then((res) => {
                if (isComponentMounted){
                    setThread(res.data)
                    console.log(res.data)
                };
            })
            .catch(error => console.log('Error:', error))
            
            return () => {
                isComponentMounted = false;
            }
        }
    }, [])

    if(props.type == 'Pub'){
        let placeholder = "/publication/" + props.pub.Publication_ID["id"]
        return (
            <ActivityContainer>
                <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                <Text>You {(props.pub.Edit_Type).toLowerCase()}ed the publication "<Link to={placeholder}>{props.pub.Publication_ID["Title"]}</Link>".</Text>
                <NLine></NLine>
            </ActivityContainer>
        )
    }
    else if(props.type == 'ReportPub'){
        let placeholder = "/publication/" + props.pub.FiledReport["Relevant_Pub"]["id"]
        return (
            <ActivityContainer>
                <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                <Text>You reported the publication "<Link to={placeholder}>{props.pub.FiledReport["Relevant_Pub"]["Title"]}</Link>".</Text>
                <NLine></NLine>
            </ActivityContainer>
        )
    }
    else if(props.type == 'ReportPost'){
        let placeholder = "/thread/user/" + props.pub.FiledReport["Relevant_Thread"]
        return (
            <ActivityContainer>
                <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                <Text>You reported {post.Creator["username"]}'s <Link to={placeholder}>post.</Link></Text>
                <NLine></NLine>
            </ActivityContainer>
        )
    }
    else if(props.type == 'Mod'){
        return (
            <ActivityContainer>
                <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                <Text>You applied for moderatorship.</Text>
                <NLine></NLine>
            </ActivityContainer>
        )
    }
    else if(props.type == 'Thread'){
        let placeholder = "/thread/user/" + props.pub.CreatedThread
        return (
            <ActivityContainer>
                <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                <Text>You created the thread, <Link to={placeholder}>{thread.Title.substr(0, 10)}</Link>.</Text>
                <NLine></NLine>
            </ActivityContainer>
        )
    }
    else if(props.type == "Empty"){
        return (
            <ActivityContainer>
                <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                <Text>You signed up to BookBound!</Text>
                <NLine></NLine>
            </ActivityContainer>
        )
    }
    else{
        let placeholder = "/thread/user/" + thread.id
        return (
            <ActivityContainer>
                <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                <Text>You posted on {thread.Creator["username"]}'s <Link to={placeholder}>thread</Link>.</Text>
                <NLine></NLine>
            </ActivityContainer>
        )
    }
}

export default Activity

const ActivityContainer = styled.div`
width:100%;
height:60px;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 32px;
display: flex;
align-items: center;
color: Black;
`

const NLine = styled.line`
position:absolute;
width:82%;
heigth:0px;
margin-top: 60px;
border: 1px solid #F9F7FC;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const Text = styled.text``