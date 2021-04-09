import React from 'react'
import styled from 'styled-components'
import Activity from './ActivityContainer'

function MyActivity() {
    return (
        <Container>
            <ActivityHeader>
                <ActivityText>My Activity</ActivityText>
            </ActivityHeader>
            <ViewNextButtonContainer>
                             <NextPrevious>Buttons</NextPrevious>
            </ViewNextButtonContainer>
            <ActivityContainer>
                <Activity/>
                <Activity/>
                <Activity/>
                <Activity/>
                <Activity/>
                <Activity/>
                <Activity/>
                <Activity/>
                <Activity/>
                <Activity/>
                <Activity/>
                <Activity/>
                <Activity/>
                <Activity/>
                <Activity/>
            </ActivityContainer>
        </Container>
    )
}


export default MyActivity

const Container = styled.div`
max-width: 1570px;
margin: 0 auto;
height: auto;
background-color: white;
`
const ActivityHeader = styled.h3`
width: 1050px;
height: 80px;
margin-left:150px;
margin-right:150px;
padding-left: 10px;
padding-right: 10px;
margin-top:150px;
border-radius: 20px;
background: #0A3977;
`
const ActivityText = styled.h3`
max-height:50px;
max-width:380px;
background-color: #0A3977;
color:white;
font-size:50px;
font-weight:bold;
border:1px;
padding-left:335px;
padding-top:15px;
text-align: center;
letter-spacing: -1px;
border-radius:6px;
`

const ActivityContainer = styled.h3`
width:1050px;
height: 1155px;
margin-left:160px;
margin-top:75px;
margin-bottom:200px;
border-radius:10px;

background: #DCF2F8;

box-shadow: 0px 8px 8px rgba(38, 50, 56, 0.12), 0px 16px 24px rgba(38, 50, 56, 0.08);
`

const ViewNextButtonContainer = styled.div`
display:flex;
margin-left:150px;
`
const NextPrevious = styled.h4`
align-items:center;
margin-left:500px;
`
