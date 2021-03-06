import React from 'react'
import styled from 'styled-components'
import CommentIcon from '@material-ui/icons/Comment';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import CardMedia from '@material-ui/core/CardMedia';


function ForumGuestThreadCard({username, title, category, postcount, timestamp, desc}) {
    return (
        
        <Container>
        <ImageUserNameContainer>
            <ImageContainer>
                <Image src="http://www.pngall.com/wp-content/uploads/5/Aesthetic-Anime-Girl-PNG-File-Download-Free.png"
                    width="100px" height="100px"
                />
            </ImageContainer>
            <Link to="/profile/guest">
                <UserName>
                    {username}
                </UserName>
            </Link>
        </ImageUserNameContainer>
        
        <ThreadDetailContainer>
            <ThreadTitle>{title}</ThreadTitle>
            <ThreadCategory>{category}</ThreadCategory>
            <ThreadMinorDetail>{desc}</ThreadMinorDetail>
        </ThreadDetailContainer>
        
        <ThreadTimePostContainer>
            <Comment>
                <CommentIcon/>
                <h5 style={{paddingTop:"4px"}}>{postcount}</h5>
            </Comment>
            <TimeIcon>
                <QueryBuilderIcon/>
                <h5 style={{paddingTop:"4px"}}>
                    {
                        timestamp
                    }
                </h5>
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
    margin-left:2%;
    margin-top:2%;

`
const ImageContainer = styled.div`

`
const Image = styled.img`
    border-radius:30px;
`
const UserName = styled.h3`
`
const ThreadDetailContainer = styled.div`
    margin-top:2.5%;
    margin-left:2%;
    display:flex;
    flex-grow:3;
`
const ThreadTitle = styled.h4`
    
`
const ThreadCategory = styled.h4`
`
const ThreadMinorDetail = styled.h6`
`
const ThreadTimePostContainer = styled.div`
    margin-top:2.5%;
    margin-right:2%;


`
const Comment = styled.div`
display:flex;
margin-bottom:1%;


`
const TimeIcon = styled.div`
display:flex;
`
