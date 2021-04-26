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
            window.scrollTo(0, 0)
        }
    }

    function rightClick(){
        if(start + 15 < pubs.length){
            setStart(start + 15)
            window.scrollTo(0, 0)
        }
    }

    return (
        <Container>
            
            <ActivityHeader>
                <h1>My Activity</h1>
            </ActivityHeader>

            <ButtonContainer>
                <div></div>
            <ViewNextButtonContainer>
                <SkipPreviousRoundedIcon style = {{marginLeft:'25px'}} onClick={leftClick}/><SkipNextRoundedIcon style = {{}} onClick={rightClick}/>
            </ViewNextButtonContainer>
            <div></div>
            </ButtonContainer>
            
            <FormContainer>
            
            
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
            </FormContainer>
        </Container>
    )
}


export default MyActivity

const Container = styled.div`
width: 100%
height: 95%;
background-color: white;
`

const FormContainer = styled.div`
margin-left: 3%;
margin-right: 3%;
  max-width: 100%;
  max-height: 100%;
  margin-top: 2%;
  display:flex;
  justify-content:center;
  background:white;
  border-radius: 16px;
  align-items: center;
  padding-bottom: 3%;
  padding-left: 3%;
`

const ActivityHeader = styled.h3`
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
const ActivityText = styled.h3`
max-height:50px;
color:white;
font-size:25px;
font-weight:bold;
border:1px;
margin-top:2%;
text-align: center;
letter-spacing: -1px;
border-radius:6px;
`

const ActivityContainer = styled.h3`
width:95%;
height: 100%;
margin-top:3%;
border-radius:10px;
`

const ViewNextButtonContainer = styled.div`
display:flex;
width:100px;
height:50px;
align-items: Center;
margin-top:3%;
border-radius:10px;
`

const Flag = styled.div`
width:95%;
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
width:82%;
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

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`