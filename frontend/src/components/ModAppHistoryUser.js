import React from 'react';
import styled from 'styled-components';
import AcceptedButton from './Buttons(ModReport)/AcceptedButton';
import RejectedButton from './Buttons(ModReport)/RejectedButton';
import PendingButton from './Buttons(ModReport)/PendingButton';
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function ModAppHistoryUser() {
    const [apps, setApps] = useState([])
    const [flag, setFlag] = useState(false)
    const [start, setStart] = useState(0)
    const [type, setType] = useState({'User_Type':''})

    useEffect(() => {
        let isComponentMounted = true;
        let url = "api/accounts/modapps"
        axios.get(url).then((res) => {
            if (isComponentMounted){
                setApps(res.data)
                console.log(res.data, "UMAMAM")
            };
        })
        .catch(error => console.log('Error:', error))

        axios.get(`api/accounts/profile`).then((res) => {
            if (isComponentMounted){
                setType(res.data['User_Type'])
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
        if(start + 15 < apps.length){
            setStart(start + 15)
        }
    }

    function changeStatus(id){
        // let url = "api/accounts/reports/" + id
        // console.log("am here")
        // axios.post(url).then((res) => {
        //     console.log("success")
        //     setFlag(!Flag)
        // })
        // .catch(error => console.log('Error:', error))
        console.log("big data")
    }


    return (
        <Container>
            <MDAHeader>
                <MDAText>Moderator Applications</MDAText>
            </MDAHeader>
            <MDAContainer>
                {
                    apps.map((elem, index) => {
                        if(index >= start && index < (start + 15) && index < apps.length)
                        {
                            if(type == 'ADMIN' || type == 'MODERATOR'){
                                let placeholder = "/profile/" + elem.Creator["id"]
                                if(elem.Status == 'ACCEPTED'){
                                    return(
                                        <Flag>
                                            <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                                            <Text> <Link to={placeholder}>{elem.Creator["username"]} </Link>  applied for moderatorship.</Text>
                                            <AcceptedButton/>
                                            <NLine></NLine>
                                        </Flag>
                                    )
                                }
                                else if(elem.Status == 'REJECTED'){
                                    return(
                                        <Flag>
                                            <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                                            <Text><Link to={placeholder}>{elem.Creator["username"]} </Link> applied for moderatorship.</Text>
                                            <RejectedButton/>
                                            <NLine></NLine>
                                        </Flag>
                                    )
                                }
                                else{
                                    return(
                                        <Flag>
                                            <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                                            <Text><Link to={placeholder}>{elem.Creator["username"]} </Link> applied for moderatorship.</Text>
                                            <PendingButton/>
                                            <NLine></NLine>
                                        </Flag>
                                    )
                                }
                                
                            }
                            else{
                                if(elem.Status == 'ACCEPTED'){
                                    return(
                                        <Flag>
                                            <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                                            <Text>You applied for moderatorship.</Text>
                                            <AcceptedButton/>
                                            <NLine></NLine>
                                        </Flag>
                                    )
                                }
                                else if(elem.Status == 'REJECTED'){
                                    return(
                                        <Flag>
                                            <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                                            <Text>You applied for moderatorship.</Text>
                                            <RejectedButton/>
                                            <NLine></NLine>
                                        </Flag>
                                    )
                                }
                                else{
                                    return(
                                        <Flag>
                                            <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                                            <Text>You applied for moderatorship.</Text>
                                            <PendingButton/>
                                            <NLine></NLine>
                                        </Flag>
                                    )
                                }
                            }
                        }
                    })
                }       
            </MDAContainer>
            <ViewNextButtonContainer>
                <SkipPreviousRoundedIcon style = {{marginLeft:'25px'}} onClick={leftClick}/><SkipNextRoundedIcon style = {{}} onClick={rightClick}/>
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