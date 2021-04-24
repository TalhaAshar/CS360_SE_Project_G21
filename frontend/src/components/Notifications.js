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
            <NotificationsHeader>
                <NotificationsText>Notifications</NotificationsText>
            </NotificationsHeader>
            <ViewNextButtonContainer>
                <SkipPreviousRoundedIcon style = {{marginLeft:'25px'}} onClick={leftClick} /><SkipNextRoundedIcon style = {{}} onClick={rightClick}/>
            </ViewNextButtonContainer>
            <NotificationsContainer>
                {
                    notifs.map((elem, index) => {
                        if(index >= start && index < (start + 15) && index < notifs.length){
                            let threadLink = "/thread/user/" + elem.ParentThread["id"]
                            return(
                                <Link to={threadLink} style={{textDecoration:"none"}}>
                                    <Flag>
                                        <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                                        <Text>{elem.Body}</Text>
                                        <NLine></NLine>
                                    </Flag>
                                </Link>
                            )
                        }
                    })
                }
                

                {(notifs.length == 0) && <Flag>
                    <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                    <Text>You have no new notifications</Text>
                    <NLine></NLine>
                </Flag>}

            </NotificationsContainer>
            
        </Container>
    )
}


export default Notifications

const Container = styled.div`
max-width: 1570px;
margin: 0 auto;
height: auto;
background-color: white;
`
const NotificationsHeader = styled.h3`
width: 1050px;
height: 40px;
margin-left:150px;
margin-right:150px;
padding-left: 10px;
padding-right: 10px;
border-radius: 20px;
background: #0A3977;
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