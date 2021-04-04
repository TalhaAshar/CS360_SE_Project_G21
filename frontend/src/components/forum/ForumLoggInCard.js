import React from 'react'
import styled from 'styled-components'
import CommentIcon from '@material-ui/icons/Comment';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';

function ForumLoggInCard() {
    return (
        <Container>
        <ImageUserNameContainer>
            <ImageContainer>
               
                <Image src="http://www.pngall.com/wp-content/uploads/5/Aesthetic-Anime-Girl-PNG-File-Download-Free.png"
                    width="100px" height="100px"
                />
            </ImageContainer>
            <UserName>Alachigari</UserName>
        </ImageUserNameContainer>
        <ThreadDetailContainer>
            <TimeIcon>
                <QueryBuilderIcon/>
                <text style={{paddingTop:"1px"}}>12 Hours</text>
            </TimeIcon>
            <ThreadTitle>Forum Ruels:Must Read!!1</ThreadTitle>
            <ThreadCategory>Announcements</ThreadCategory>
            <ThreadMinorDetail>This thread is for new users</ThreadMinorDetail>
        </ThreadDetailContainer>
        <ThreadTimePostContainer>
            <Comment>
                <CommentIcon/>
                <text style={{paddingTop:"1px"}}>12 Posts</text>
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
    margin-top:10px;
    margin-left:10px;
`
const ThreadTitle = styled.h4`
    min-width:200px;
`
const ThreadCategory = styled.h4`
    min-width:200px;
`
const ThreadMinorDetail = styled.h6`
    min-width:200px;
`
const ThreadTimePostContainer = styled.div`
    margin-left:80px;
    margin-top:10px;
    padding-right:4px;
    

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
