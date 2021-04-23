import React from 'react'
import styled from 'styled-components'
import Activity from './ActivityContainer'
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function MyActivity() {

    const [pubs, setPubs] = useState([])
    const [flag, setFlag] = useState(false)
    const [start, setStart] = useState(0)

    useEffect(() => {
        let isComponentMounted = true;
        let url = "api/accounts/my_activity"
        axios.get(url).then((res) => {
            if (isComponentMounted){
                setPubs(res.data)
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
            <ActivityHeader>
                <ActivityText>My Activity</ActivityText>
            </ActivityHeader>
            <ActivityContainer>
                {
                    pubs.map((elem, index) => {
                        if(index >= start && index < (start + 15) && index < pubs.length){
                            let activity_type = ""
                            if(elem.FiledReport != null && elem.FiledReport["Relevant_Pub"] != null){
                                console.log("here")
                                activity_type = "ReportPub"
                            }
                            else if(elem.FiledReport != null && elem.FiledReport["Relevant_Pub"] == null){
                                console.log("here")
                                activity_type = "ReportPost"
                            }
                            else if(elem.ModApp != null){
                                activity_type = "Mod"
                            }
                            else if(elem.CreatedThread != null){
                                activity_type = "Thread"
                            }
                            else{
                                activity_type = "Post"
                            }
                            return(
                                <Flag>
                    <Activity key={index} pub={elem} type={activity_type}/>
                    <NLine></NLine>
                </Flag>
                            )
                        }
                    })
                }
                {(pubs.length == 0) && <Flag>
                    <Activity type={"Empty"}/>
                    <NLine></NLine> 
                </Flag>}

            </ActivityContainer>
            <ViewNextButtonContainer>
                <SkipPreviousRoundedIcon style = {{marginLeft:'25px'}} onClick={leftClick}/><SkipNextRoundedIcon style = {{}} onClick={rightClick}/>
            </ViewNextButtonContainer>
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

const ActivityContainer = styled.h3`
width:1050px;
height: 1155px;
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