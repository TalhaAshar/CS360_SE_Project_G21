import React from 'react'
import styled from 'styled-components'
import ResolvedButton from './Buttons(ModReport)/ResolvedButton';
import UnresolvedButton from './Buttons(ModReport)/UnresolvedButton';
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';

import {useEffect, useState} from "react";
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function ReportsAdmin() {

    const [reports, setReports] = useState([])
    const [IDs, setIDs] = useState()
    const [start, setStart] = useState(0)

    useEffect(() => {
        let isComponentMounted = true;
        let url = "api/accounts/reports"
        axios.get(url).then((res) => {
            if (isComponentMounted){
                setReports(res.data)
                console.log(res.data, "UMAMAM")
            };
        })
        .catch(error => console.log('Error:', error))
        return () => {
            isComponentMounted = false;
        }
    }, [])

    function leftClick(){
        if(start > 0){
            setStart(start - 15)
        }
    }

    function rightClick(){
        if(start + 15 < pubs.length){
            setStart(start + 15)
        }
    }

    return (
        <Container>
            <ReportsHeader>
                <ReportsText>Reports</ReportsText>
            </ReportsHeader>
            <ReportsContainer>
                {
                    reports.map((elem, index) => {

                        if(index >= start && index < (start + 15) && index < reports.length)
                        {
                            if (elem.Status == 'UNRESOLVED' && elem.Relevant_Post == null){
                                return(
                                    <Flag>
                                        <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                                        <Text>{elem.Creator["username"]} reported the publication, {elem.Relevant_Pub["Title"]}, for "{elem.Reason}".</Text>
                                        <UnresolvedButton/>
                                        <NLine></NLine>
                                    </Flag>
                                )
                            }
                            else if (elem.Status == 'RESOLVED' && elem.Relevant_Post == null){
                                return(
                                    <Flag>
                                        <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                                        <Text>{elem.Creator["username"]} reported the publication, {elem.Relevant_Pub["Title"]}, for "{elem.Reason}".</Text>
                                        <ResolvedButton/>
                                        <NLine></NLine>
                                    </Flag>
                                )
                            }
                            else if (elem.Status == 'UNRESOLVED'){
                                return(
                                    <Flag>
                                        <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                                        <Text>{elem.Creator["username"]} reported {elem.Relevant_Post["Creator"]["username"]}'s post for "{elem.Reason}".</Text>
                                        <UnresolvedButton/>
                                        <NLine></NLine>
                                    </Flag>
                                )
                            }
                            else{
                                return(
                                    <Flag>
                                        <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                                        <Text>{elem.Creator["username"]} reported {elem.Relevant_Post["Creator"]["username"]}'s post for "{elem.Reason}".</Text>
                                        <ResolvedButton/>
                                        <NLine></NLine>
                                    </Flag>
                                )
                            }
                        }
                    })
                }
                
            </ReportsContainer>
            <ViewNextButtonContainer>
                <SkipPreviousRoundedIcon style = {{marginLeft:'25px'}} onClick={leftClick}/><SkipNextRoundedIcon style = {{}} onClick={rightClick}/>
            </ViewNextButtonContainer>
        </Container>
    )
}


export default ReportsAdmin

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
height: 1155px;
margin-left:160px;
margin-top:75px;
border-radius:10px;
background: #DCF2F8;
box-shadow: 0px 8px 8px rgba(38, 50, 56, 0.12), 0px 16px 24px rgba(38, 50, 56, 0.08);
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