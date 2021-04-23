import React from 'react'
import ThreadCardGuest from './ThreadCardGuest'
import PostCardOwner from "./PostCardOwner";
import PostCardLogged from "./PostCardLogged";
import PostCardAdmin from "./PostCardAdmin";
import styled from 'styled-components'
import { useLocation, useParams} from "react-router-dom"
import {useEffect, useState} from "react";
import axios from 'axios';
import RichTextEditor from "./functionality/RichTextEditor";
import ReplyTextEditor from "./functionality/RichTextEditor";
import ReportThread from "./forms/ReportThread";
import DeleteFeedbackPopup from './functionality/DeleteFeedbackPopup';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function ThreadAdmin(props) {

    const [posts, setPosts] = React.useState([{"id":'',"Creator":{"id":0,"username":"","email":""},"TimeStamp":"","Body":"","Poll_Title":null,"Poll_Yes":'',"Poll_No":''}])
    const [Details, setDetails] = useState( {'User_Type':'', 'ProfileImage':'', 'biography':'', 'education':'', 'institution':'', 'profession':'', 'company':'', 'location':'', 'age':'', 'user':{} } )
    const [User, setUser] = useState('')
    const [flag, setFlag] = useState(false)
    const [reply, setReply] = useState('')
    const [editFlag, setEditFlag] = useState(false)
    const [postToEdit, setPostToEdit] = useState(0)
    const [Popup, setPopup] = useState(false)
    const [thread, setThread] = useState()
    const d = new Date()
    const { id } = useParams();
    console.log("reply", reply)

    useEffect(() => {
        let isComponentMounted = true;

        let url1 = `api/forum/threads/` + id
        axios.get(url1).then((res) => {
            if (isComponentMounted){
                
                //console.log(posts, "set new")
                console.log(res.data, "Nptt")
                setPosts(res.data)
            };
        })
        .catch(error => console.log('Error:', error))

        axios.get(`api/accounts/profile`).then((res) => {
            if (isComponentMounted){
                setDetails(res.data)
                setUser(res.data['user']['username'])
                if(res.data['User_Type'] == 'ADMIN' || res.data['User_Type'] == 'MODERATOR'){
                    setFlag(true)
                }
            };
        })
        .catch(error => console.log('Error:', error))

        let url2 = `api/forum/threads/retrieve/` + id
        axios.get(url2).then((res) => {
            if (isComponentMounted){
                setThread(res.data)
            };
        })
        .catch(error => console.log('Error:', error))
        
        return () => {
            isComponentMounted = false;
        }
    }, [id])


    function deleteThread(){
        let url = `api/forum/threads/delete/` + id
        axios.post(url)
        .then(res => {setPopup(true)})
        .catch(error => console.log('Error:', error))
    }

    function replyPost(value){
        setReply(value)
        console.log(reply, value, "THIS IS MY REPLY")
    }

    function updatePosts(newPosts){
        console.log("New Posts", newPosts)
        setPosts(newPosts)
        setReply('')
    }

    function editPost(value, post_id){
        setEditFlag(!editFlag)
        setPostToEdit(post_id)
        setReply(value)
        console.log("Finished edit handler")
    }

    switch(flag){
        case true:
            return(
                <Container>
            <Heading>
                    <Background>
                        { thread ? thread['Title'] : null }
                    </Background>
                </Heading>
            <Lower>
                

                <Results1>
                    <PostCardAdmin first={false} editHandler={editPost} postHandler={updatePosts} replyHandler={replyPost} thread_id={id} post_id={posts[0].id} id={posts[0].Creator["id"]} username={posts[0].Creator["username"]} desc={posts[0].Body} timestamp={parseInt ((d.getTime() - Date.parse(posts[0].TimeStamp)) / 3600000)} />
                </Results1>
                <RP>

                <Report onClick={deleteThread}>
                    <RText>
                        Delete Thread
                    </RText>
                    { Popup ? <DeleteFeedbackPopup /> : null }
                </Report>

                {(User == posts[0].Creator["username"]) && <Delete>
                    <DText>
                    Unnotify Me
                    </DText>
                </Delete>}

                </RP>
                <Results>
                    {
                        posts.map((elem, index)  => {
                            if(index > 0){
                                return(
                                    <PostCardAdmin first={true} editHandler={editPost} postHandler={updatePosts} replyHandler={replyPost} thread_id={id} post_id={elem.id} id={elem.Creator["id"]} username={elem.Creator["username"]} desc={elem.Body} timestamp={parseInt ((d.getTime() - Date.parse(elem.TimeStamp)) / 3600000)}/>
                                )
                            }
                        })
                    }
                </Results>

                
                </Lower>

                {(reply == '') && <RichTextEditor post_id={postToEdit} editHandler={editPost} ID={id} original={reply} replyHandler={replyPost} postHandler={updatePosts} isEdit={editFlag}/>}
                {(reply != '') && <ReplyTextEditor post_id={postToEdit} editHandler={editPost} ID={id} original={reply} replyHandler={replyPost} postHandler={updatePosts} isEdit={editFlag}/>}

            </Container>
            )
        case false:
            return(
                <Container>
            <Heading>
                    <Background>
                        { thread ? thread['Title'] : null }
                    </Background>
                </Heading>
            <Lower>
                

                <Results1>
                    {(User == posts[0].Creator["username"]) && <PostCardOwner post_id={posts[0].id} irst={false} editHandler={editPost} postHandler={updatePosts} replyHandler={replyPost} thread_id={id} id={posts[0].Creator["id"]} username={posts[0].Creator["username"]} desc={posts[0].Body} timestamp={parseInt ((d.getTime() - Date.parse(posts[0].TimeStamp)) / 3600000)}/>}
                    {(User != posts[0].Creator["username"]) && <PostCardLogged replyHandler={replyPost} post_id={posts[0].id} id={posts[0].Creator["id"]} username={posts[0].Creator["username"]} desc={posts[0].Body} timestamp={parseInt ((d.getTime() - Date.parse(posts[0].TimeStamp)) / 3600000)}/>}
                    {/* <ThreadCardGuest id={props.location.state.Creator["id"]} title={props.location.state.Title} username={props.location.state.Creator["username"]} timestamp={parseInt ((d.getTime() - Date.parse(props.location.state.Timestamp)) / 3600000)} category={props.location.state.Category} postcount={props.location.state.PostCount} desc={posts[0].Body}/> */}
                </Results1>
                <RP>

                {(User == posts[0].Creator["username"]) &&<Report onClick={deleteThread}>
                    <RText>
                        Delete Thread
                    </RText>
                    { Popup ? <DeleteFeedbackPopup /> : null }
                </Report>}

                {(User == posts[0].Creator["username"]) && <Delete>
                    <DText>
                    Unnotify Me
                    </DText>
                </Delete>}

                </RP>
                <Results>
                    {/* is current user creator or no*/}
                    {
                        posts.map((elem, index)  => {
                            
                            if(index > 0){
                                
                                if(User == elem.Creator["username"]){
                                    
                                    return(
                                        <PostCardOwner post_id={elem.id} first={true} editHandler={editPost} postHandler={updatePosts} replyHandler={replyPost} thread_id={id} id={elem.Creator["id"]} username={elem.Creator["username"]} desc={elem.Body} timestamp={parseInt ((d.getTime() - Date.parse(elem.TimeStamp)) / 3600000)}/>
                                    )
                                }else{
                                    return(
                                        <PostCardLogged replyHandler={replyPost} post_id={elem.id} id={elem.Creator["id"]} username={elem.Creator["username"]} desc={elem.Body} timestamp={parseInt ((d.getTime() - Date.parse(elem.TimeStamp)) / 3600000)}/>
                                    )
                                }
                            }
                        })
                    }
                </Results>

                
                </Lower>

                {(reply == '') && <RichTextEditor post_id={postToEdit} editHandler={editPost} ID={id} original={reply} replyHandler={replyPost} postHandler={updatePosts} isEdit={editFlag}/>}
                {(reply != '') && <ReplyTextEditor post_id={postToEdit} editHandler={editPost} ID={id} original={reply} replyHandler={replyPost} postHandler={updatePosts} isEdit={editFlag}/>}

            </Container>
            )
        default:
            return(
                <Container>
            <Heading>
                    <Background>
                        { thread ? thread['Title'] : null }
                    </Background>
                </Heading>
            <Lower>
                

                <Results1>
                    {(User == posts[0].Creator["username"]) && <PostCardOwner post_id={posts[0].id} first={false} editHandler={editPost} postHandler={updatePosts} replyHandler={replyPost} thread_id={id} id={posts[0].Creator["id"]} username={posts[0].Creator["username"]} desc={posts[0].Body} timestamp={parseInt ((d.getTime() - Date.parse(posts[0].TimeStamp)) / 3600000)}/>}
                    {(User != posts[0].Creator["username"]) && <PostCardLogged replyHandler={replyPost} post_id={posts[0].id} id={posts[0].Creator["id"]} username={posts[0].Creator["username"]} desc={posts[0].Body} timestamp={parseInt ((d.getTime() - Date.parse(posts[0].TimeStamp)) / 3600000)}/>}
                    {/*Two cases to be handled, is current viewer the creator or not?*/}
                    {/* <ThreadCardGuest id={props.location.state.Creator["id"]} title={props.location.state.Title} username={props.location.state.Creator["username"]} timestamp={parseInt ((d.getTime() - Date.parse(props.location.state.Timestamp)) / 3600000)} category={props.location.state.Category} postcount={props.location.state.PostCount} desc={posts[0].Body}/> */}
                </Results1>
                <RP>

                {(User == posts[0].Creator["username"]) &&<Report onClick={deleteThread}>
                    <RText>
                        Delete Thread
                    </RText>
                    { Popup ? <DeleteFeedbackPopup /> : null }
                </Report>}

                {(User == posts[0].Creator["username"]) && <Delete>
                    <DText>
                    Unnotify Me
                    </DText>
                </Delete>}

                </RP>
                <Results>
                    {/* is current user creator or no*/}
                    {
                        posts.map((elem, index)  => {
                            if(index > 0){
                                if(User == elem.Creator["username"]){
                                    return(
                                        <PostCardOwner post_id={elem.id} first={true} editHandler={editPost} postHandler={updatePosts} replyHandler={replyPost} thread_id={id} id={elem.Creator["id"]} username={elem.Creator["username"]} desc={elem.Body} timestamp={parseInt ((d.getTime() - Date.parse(elem.TimeStamp)) / 3600000)}/>
                                    )
                                }else{
                                    return(
                                        <PostCardLogged replyHandler={replyPost} post_id={elem.id} id={elem.Creator["id"]} username={elem.Creator["username"]} desc={elem.Body} timestamp={parseInt ((d.getTime() - Date.parse(elem.TimeStamp)) / 3600000)}/>
                                    )
                                }
                            }
                        })
                    }
                </Results>

                
                </Lower>

                    
                {(reply == '') && <RichTextEditor post_id={postToEdit} editHandler={editPost} ID={id} original={reply} replyHandler={replyPost} postHandler={updatePosts} isEdit={editFlag}/>}
                {(reply != '') && <ReplyTextEditor post_id={postToEdit} editHandler={editPost} ID={id} original={reply} replyHandler={replyPost} postHandler={updatePosts} isEdit={editFlag}/>}
            </Container>
        )
    }
    
}

export default ThreadAdmin

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
margin-top: 2%;
margin-bottom: 2%;
`

const Results = styled.div`
    width:1100px;
    display:grid;
    height: 200px;
    padding-top: 65px;
    margin: 0 auto;
    grid-template-rows: 200px 200px 200px 200px;//one 200px for each card, should be bigger than the card
`
const Lower = styled.div`
background: #DCF2F8;
width:90%;
height: 1000px;
border-radius: 20px;
margin-bottom:100px;
margin-left:3%;
margin-right:3%;
`

const Results1 = styled.div`
    padding-top: 20px;
    width:1100px;
    display:grid;
    height: 200px;
    margin: 0 auto;
    grid-template-rows: 200px 200px 200px 200px;//one 200px for each card, should be bigger than the card
`
const Container = styled.div`


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
text-align: center;
`

const DText = styled.h3`
width: 125px;
margin-left: 13px;
padding-top: 13px;
text-align: center;
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
text-align: center;
font-family: Manrope;
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 25px;
color: #FFFFFF;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
cursor: pointer;
`

const RP = styled.h3`
text-align: center;
height: 25px;
padding-top: 13px;
display:flex;
flex-direction:row;
margin-left: 779px;
margin-top: 13px;
`