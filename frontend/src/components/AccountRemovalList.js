import React from 'react';
import styled from 'styled-components';
import AcceptedButton from './Buttons(ModReport)/AcceptedButton';
import PendingButton from './Buttons(ModReport)/PendingButton';
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
import AccountRemovalFeedbackPopup from "./functionality/AccountRemovalFeedbackPopup"
import { useHistory } from "react-router-dom";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function AccountRemoval() {

    const [apps, setApps] = useState([])
    const [flag, setFlag] = useState(false)
    const [start, setStart] = useState(0)
    const history = useHistory();
    const [seen, setSeen] = useState(false)
  
    function togglePop () {
      setSeen(!seen)
    }

    useEffect(() => {
        let isComponentMounted = true;
        let url = "api/register/admin/delete"
        axios.get(url).then((res) => {
            if (isComponentMounted){
                setApps(res.data)
            };
        })
        .catch(error => console.log('Error:', error))
        window.scrollTo(0, 0)
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
        let url = "api/register/admin/delete/" + id
        axios.post(url).then((res) => {
            setApps(res.data)
            togglePop()
            history.push("/remove_account/admin")
        })
    }


    return (
        <Container>
            <MDAHeader>
                <MDAText>Account Removal Requests</MDAText>
            </MDAHeader>
            <ViewNextButtonContainer>
                <SkipPreviousRoundedIcon style = {{marginLeft:'25px'}} onClick={leftClick}/><SkipNextRoundedIcon style = {{}} onClick={rightClick}/>
            </ViewNextButtonContainer>
            <MDAContainer>
                {
                    apps.map((elem, index) => {
                        if(index >= start && index < (start + 15) && index < apps.length)
                        {
                            let placeholder = "/profile/" + elem.user["id"]
                            if(elem.Status == 'ACCEPTED'){
                                return(
                                    <Flag key={elem.id}>
                                        <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                                        <Text> <Link to={placeholder}>{elem.user["username"]} </Link>  made an account removal request.</Text>
                                        <AcceptedButton/>
                                        <NLine></NLine>
                                    </Flag>
                                )
                            }
                            else{
                                return(
                                    <Flag key={elem.id}>
                                        <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                                        <Text> <Link to={placeholder} style = {{textDecoration:'none'}}>{elem.user["username"]} </Link>  made an account removal request.</Text>
                                        <BlacklistContainer onClick={togglePop}>
                                            <TextContainer>Remove</TextContainer>
                                        </BlacklistContainer>
                                        { seen ? <AccountRemovalFeedbackPopup toggle={togglePop} remove={changeStatus} toRemove={elem.user["id"]}/> : null }
                                        <NLine></NLine>
                                    </Flag>
                                )
                            }
                        }
                    })
                }
                {(apps.length == 0) && <Flag>
                    <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                    <Text>There are no account removal requests.</Text>
                    <NLine></NLine> 
                </Flag>}        

            </MDAContainer>

            

        </Container>
    )
}


export default AccountRemoval

const Container = styled.div`
max-width: 1570px;
margin: 0 auto;
height: auto;
background-color: white;
`
const MDAHeader = styled.h3`
width: 1050px;
height: 40px;
margin-left:150px;
margin-right:150px;
padding-left: 10px;
padding-right: 10px;
border-radius: 20px;
background: #0A3977;
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
width:1050px;
height: 0 auto;
margin-left:160px;
margin-top:3%;
border-radius:10px;
`

const ViewNextButtonContainer = styled.div`
display:flex;
width:100px;
height:50px;
margin-left:635px;
align-items: Center;
margin-top:3%;
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

const BlacklistContainer = styled.div`
height: 35px;
width:90px;
align:center;
margin-left:920px;
border-radius:5px; 
background: #583192;
cursor:pointer;
`

const TextContainer = styled.text`
color:white;
align:center;
font-style: normal;
font-weight: bold;
margin-left:8px;
display: flex;
align-items: center;
text-align: center;
letter-spacing: -1px;
cursor:pointer;
color: #FFFFFF;
`