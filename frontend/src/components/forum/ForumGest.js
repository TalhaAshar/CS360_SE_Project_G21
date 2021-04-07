import React from 'react'
import styled from 'styled-components'
import ForumGuestThreadCard from './ForumGuestThreadCard'


function ForumGest() {
    return (
        <Container>
            <ThreadBar>
                <Text>
                    Recent Thread
                </Text>
            </ThreadBar>
            <BodyRecent>
                    <ForumGuestThreadCard/>
                    <ForumGuestThreadCard/>

                    <ForumGuestThreadCard/>

                    <ForumGuestThreadCard/>

                    <ForumGuestThreadCard/>

                    <ForumGuestThreadCard/>

            </BodyRecent>
        </Container>
    )
}

export default ForumGest

const Container = styled.div`

`
const ThreadBar = styled.div`
    width: 1179px;
    height: 60px;
    color:white;
    background-color:#03204C;
    margin-top:20px;
    margin-left:50px;
    display:flex;
    justify-content:center;
    border-radius:12px;


`
const Text = styled.h3`
    display:flex;
    justify-content:center;
    align-items:center;
`

const BodyRecent = styled.div`
    margin-left:50px;
    margin-right:50px;
    margin-top:20px;
    margin-bottom:20px;
    display:grid;
    grid-template-rows: 200px 200px 200px 200px;
    background:#DCF2F8;
    padding-left:40px;
    padding-top:20px;
    padding-bottom:20px;
    padding-right:40px;
    height:1250px;
    border-radius:8px;

`
