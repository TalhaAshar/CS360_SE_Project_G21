import React from 'react';
import styled from 'styled-components';
import AcceptedButton from './Buttons(ModReport)/AcceptedButton';
import RejectedButton from './Buttons(ModReport)/RejectedButton';
import PendingButton from './Buttons(ModReport)/PendingButton';
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';

function ModAppHistoryUser() {
    return (
        <Container>
            <MDAHeader>
                <MDAText>Moderator Applications</MDAText>
            </MDAHeader>
            <MDAContainer>
                <Flag>
                    <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                    <Text></Text>
                    <AcceptedButton/>
                    <NLine></NLine>
                </Flag>

                <Flag>
                    <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                    <Text></Text>
                    <RejectedButton/>
                    <NLine></NLine>
                </Flag>

                <Flag>
                    <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                    <Text></Text>
                    <RejectedButton/>
                    <NLine></NLine>
                </Flag>

                <Flag>
                    <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                    <Text>Fuck</Text>
                    <RejectedButton/>
                    <NLine></NLine>
                </Flag>

            </MDAContainer>

            <ViewNextButtonContainer>
                <SkipPreviousRoundedIcon style = {{marginLeft:'25px'}}/><SkipNextRoundedIcon style = {{}}/>
            </ViewNextButtonContainer>

        </Container>
    )
}


export default ModAppHistoryUser

const Container = styled.div`
max-width: 1570px;
margin: 0 auto;
height: auto;
background-color: white;
`
const MDAHeader = styled.h3`
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
const MDAText = styled.h3`
max-height:50px;
background-color: #0A3977;
color:white;
font-size:50px;
font-weight:bold;
border:1px;
padding-top:15px;
text-align: center;
letter-spacing: -1px;
border-radius:6px;
`

const MDAContainer = styled.h3`
width:1050px;
height: 300px;
margin-left:160px;
margin-top:75px;
border-radius:10px;

`

const ViewNextButtonContainer = styled.div`
display:flex;
width:100px;
height:50px;
margin-left:635px;
align-items: Center;
margin-top:40px;
background: #DCF2F8;
border-radius:10px;
`

const Flag = styled.h3`
width:1050px;
height:60px;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 32px;

display: flex;
align-items: center;

color: Black;
background: #DCF2F8;
`


const NLine = styled.line`
position:absolute;
width:1050px;
heigth:0px;
margin-top: 60px;
border: 1px solid #F9F7FC;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const Text = styled.text`
margin-left:40px;
position:absolute;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 32px;


color: #060606;
`