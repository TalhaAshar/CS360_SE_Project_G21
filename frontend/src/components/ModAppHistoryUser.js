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
import PendingButtonUser from './Buttons(ModReport)/PendingButtonUser'


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
            window.scrollTo(0, 0)
        }
    }

    function rightClick(){
        if(start + 15 < apps.length){
            setStart(start + 15)
            window.scrollTo(0, 0)
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
                <h1>Moderator Applications</h1>
            </MDAHeader>
            <ButtonContainer>
                <div></div>
            <ViewNextButtonContainer>
                <SkipPreviousRoundedIcon style = {{marginLeft:'25px'}} onClick={leftClick}/><SkipNextRoundedIcon style = {{}} onClick={rightClick}/>
            </ViewNextButtonContainer>
            <div></div>
            </ButtonContainer>
            <FormContainer>
                <MDAContainer>
                    {
                        apps.map((elem, index) => {
                            if(index >= start && index < (start + 15) && index < apps.length)
                            {
                                if(type == 'ADMIN'){
                                    let placeholder = "/profile/" + elem.Creator["id"]
                                    if(elem.Status == 'ACCEPTED'){
                                        return(
                                            <div>
                                            <Flag key={elem.id}>
                                                <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                                                <TextContainer>
                                                    <Text> <Link to={placeholder}>{elem.Creator["username"]} </Link>  applied for moderatorship.</Text>
                                                    </TextContainer>
                                                <AcceptedButton/>
                                               
                                            </Flag>
                                            <NLine></NLine>
                                            </div>
                                        )
                                    }
                                    else if(elem.Status == 'REJECTED'){
                                        return(
                                            <div>
                                            <Flag key={elem.id}>
                                                <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                                                <TextContainer>
                                                    <Text><Link to={placeholder}>{elem.Creator["username"]} </Link> applied for moderatorship.</Text>
                                                </TextContainer>
                                                <RejectedButton/>     
                                            </Flag>
                                            <NLine></NLine>
                                            </div>
                                        )
                                    }
                                    else{
                                        let appLink = "/resolve/modapp/" + elem.id
                                        return(
                                            <div>
                                            <Flag key={elem.id}>
                                                <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                                                <TextContainer>
                                                    <Text><Link to={placeholder}>{elem.Creator["username"]} </Link> applied for moderatorship.</Text>
                                                </TextContainer>
                                                <Link to={appLink} style={{textDecoration:"none",marginLeft:"20%"}}>
                                                    <PendingButton/>
                                                </Link>
                                            </Flag>
                                            <NLine></NLine>
                                            </div>
                                        )
                                    }
                                    
                                }
                                else{
                                    if(elem.Status == 'ACCEPTED'){
                                        return(
                                            <div>
                                            <Flag key={elem.id}>
                                                <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                                                <Text>You applied for moderatorship.</Text>
                                                <AcceptedButton/>       
                                            </Flag>
                                            <NLine></NLine>
                                            </div>
                                        )
                                    }
                                    else if(elem.Status == 'REJECTED'){
                                        return(
                                            <div>
                                            <Flag key={elem.id}>
                                                <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                                                <Text>You applied for moderatorship.</Text>
                                                <RejectedButton/>
                                            </Flag>
                                            <NLine></NLine>
                                            </div>
                                        )
                                    }
                                    else{
                                        return(
                                            <div>
                                            <Flag key={elem.id}>
                                                <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                                                <Text>You applied for moderatorship.</Text>
                                                <PendingButtonUser/>
                                            </Flag>
                                            <NLine></NLine>
                                            </div>
                                        )
                                    }
                                }
                            }
                        })
                    }
                    {(apps.length == 0) && <Flag>
                        <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                        <Text>There are no submitted moderator application forms.</Text>
                        
                    </Flag>}
                    <NLine></NLine>        
                </MDAContainer>
            </FormContainer>    
        </Container>
    )
}

export default ModAppHistoryUser

const Container = styled.div`
width: 100%;
height: 100%;
background-color: white;
`

const MDAHeader = styled.h3`
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
const MDAText = styled.h3`
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

const MDAContainer = styled.h3`
width: 100%;
height: 95%;
margin-top:3%;
border-radius:10px;
`
const FormContainer = styled.div`
margin-left: 3%;
margin-right: 3%;
  max-width: 100%;
  max-height: 95%;
  margin-top: 1%;
  display:flex;
  justify-content:center;
  background:white;
  border-radius: 16px;
  align-items: center;
  padding-bottom: 3%;
  padding-left: 3%;
`


const ViewNextButtonContainer = styled.div`
display:flex;
width:100px;
height:50px;
align-items: Center;
margin-top:3%;
border-radius:10px;
`

const Flag = styled.h3`
width:95%;
height:auto;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 32px;
color: Black;
display: flex;
align-items: center;
background: #DCF2F8;
padding-top: 1%;
`


const NLine = styled.line`
position:absolute;
width:86%;
heigth:0px;
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
const TextContainer = styled.div`
    width: 68%;
    padding-bottom:2%;
`
const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`