import React from 'react'
import styled from 'styled-components'
import ResolvedButton from './Buttons(ModReport)/ResolvedButton';
import UnresolvedButton from './Buttons(ModReport)/UnresolvedButton';
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';

function ReportsUser() {
    return (
        <Container>
            <ReportsHeader>
                <ReportsText>Reports</ReportsText>
            </ReportsHeader>
            <ReportsContainer>
                <Flag>
                    <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                    <Text></Text>
                    <ResolvedButton/>
                    <NLine></NLine>
                </Flag>

                <Flag>
                    <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                    <Text></Text>
                    <UnresolvedButton/>
                    <NLine></NLine>
                </Flag>

                <Flag>
                    <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                    <Text></Text>
                    <ResolvedButton/>
                    <NLine></NLine>
                </Flag>

                <Flag>
                    <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                    <Text></Text>
                    <UnresolvedButton/>
                    <NLine></NLine>
                </Flag>

                <Flag>
                    <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                    <Text></Text>
                    <ResolvedButton/>
                    <NLine></NLine>
                </Flag>

                <Flag>
                    <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                    <Text></Text>
                    <ResolvedButton/>
                    <NLine></NLine>
                </Flag>

                <Flag>
                    <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                    <Text></Text>
                    <UnresolvedButton/>
                    <NLine></NLine>
                </Flag>

                <Flag>
                    <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                    <Text></Text>
                    <ResolvedButton/>
                    <NLine></NLine>
                </Flag>

                <Flag>
                    <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                    <Text></Text>
                    <UnresolvedButton/>
                    <NLine></NLine>
                </Flag>

                <Flag>
                    <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                    <Text></Text>
                    <UnresolvedButton/>
                    <NLine></NLine>
                </Flag>

                <Flag>
                    <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                    <Text></Text>
                    <ResolvedButton/>
                    <NLine></NLine>
                </Flag>

                <Flag>
                    <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                    <Text></Text>
                    <ResolvedButton/>
                    <NLine></NLine>
                </Flag>

                <Flag>
                    <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                    <Text></Text>
                    <ResolvedButton/>
                    <NLine></NLine>
                </Flag>

                <Flag>
                    <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                    <Text></Text>
                    <UnresolvedButton/>
                    <NLine></NLine>
                </Flag>

                <Flag>
                    <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                    <Text></Text>
                    <ResolvedButton/>
                    <NLine></NLine>
                </Flag>

            </ReportsContainer>
            <ViewNextButtonContainer>
                <SkipPreviousRoundedIcon style = {{marginLeft:'25px'}}/><SkipNextRoundedIcon style = {{}}/>
            </ViewNextButtonContainer>
        </Container>
    )
}


export default ReportsUser

const Container = styled.div`
max-width: 1570px;
margin: 0 auto;
height: auto;
background-color: white;
`
const ReportsHeader = styled.h3`
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
const ReportsText = styled.h3`
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

const ReportsContainer = styled.h3`
width:1050px;
height: 0 auto;
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
margin-top: 3%;
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