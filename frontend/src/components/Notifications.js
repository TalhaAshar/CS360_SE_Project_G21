import React from 'react'
import styled from 'styled-components'
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function Notifications() {

    const [notifs, setNotifs] = useState([])
    const [start, setStart] = useState(0)

    useEffect(() => {
        let isComponentMounted = true;
        let url = "api/forum/notifications"
        axios.get(url).then((res) => {
            if (isComponentMounted){
                setNotifs(res.data)
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
            <NotificationsHeader>
                <h1>Notifications</h1>
            </NotificationsHeader>
            <ButtonContainer>
                <div></div>
            <ViewNextButtonContainer>
                <SkipPreviousRoundedIcon style = {{marginLeft:'25px'}} onClick={leftClick}/><SkipNextRoundedIcon style = {{}} onClick={rightClick}/>
            </ViewNextButtonContainer>
            <div></div>
            </ButtonContainer>
            <FormContainer>
            <NotificationsContainer>
                {
                    notifs.map((elem, index) => {
                        if(index >= start && index < (start + 15) && index < notifs.length){
                            let threadLink = "/thread/user/" + elem.ParentThread["id"]
                            return(
                                    <div>
                                        <Flag key={elem.id}>
                                            <Link to={threadLink} style={{textDecoration:"none"}}>
                                            <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                                            <Text>{elem.Body}</Text>  
                                            </Link>
                                        </Flag>
                                        <NLine></NLine>
                                    </div>
                                
                            )
                        }
                    })
                }
                

                {(notifs.length == 0) && <Flag>
                    <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                    <Text>You have no new notifications</Text>
                </Flag>}<NLine></NLine>

            </NotificationsContainer>
            </FormContainer>
        </Container>
    )
}


export default Notifications

const Container = styled.div`
width: 100%;
height: 100%;
background-color: white;
margin-bottom:5%;
`
const NotificationsHeader = styled.h3`
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
const NotificationsText = styled.h3`
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

const NotificationsContainer = styled.h3`
width:100%;
height:85%;
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
const FormContainer = styled.div`
margin-left: 3%;
margin-right: 3%;
  max-width: 100%;
  max-height: 90%;
  margin-top: 2%;
  display:flex;
  justify-content:center;
  background:white;
  border-radius: 16px;
  align-items: center;
  padding-bottom: 3%;
  padding-left: 3%;
`


const Flag = styled.h3`
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
width:85%;
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
const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`