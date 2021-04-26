import React from 'react';
import styled from 'styled-components';
import NotificationButton from './NotificationButton';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


function NotificationDropdown(props) {
    
    const [notifs, setNotifs] = useState([])

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

    return(props.trigger) ? (
        <Container onMouseLeave={props.setTrigger}>
            <Header>
                <HeaderText>Notifications</HeaderText>
            </Header>

            <NotificationContainer>
                {
                    notifs.map((elem, index) => {
                        if(index < 5){
                            let threadLink = "/thread/user/" + elem.ParentThread["id"]                            
                            return(
                                <Link to={threadLink} style={{textDecoration:"none"}}>
                                <Notification key={elem.id}>
                                    <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'1%', marginTop: '2%',alignItems:'center', position: 'absolute'}}/> 
                                    <NotificationText>{elem.Body}</NotificationText>
                                </Notification>
                                </Link>
                            )
                        }
                    })
                }   
                

                {(notifs.length == 0) && <Notification>
                    <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'1%', marginTop: '2%',alignItems:'center', position: 'absolute'}}/>
                    <NotificationText>You have no new notifications</NotificationText>
                </Notification>}
                
                <NotificationButton/>

            </NotificationContainer>

            

        </Container>
    ) : null;
}

export default NotificationDropdown

const Container = styled.div`
max-width: 700px;
margin: 0 auto;
height: auto;
background-color: white;
border-radius: 10px;
`
const NotificationContainer = styled.h4`
heigth: 320px;
width: 600px;
background: white;
padding-bottom: 4%;
`
const Header = styled.h3`
position:relative;
height: 50px;
width: 600px;
background: #9888BE;
border-radius: 10px 10px 0px 0px;
`

const HeaderText = styled.text`
position: absolute;
margin-left:40%;
margin-top:3%;

font-family: Manrope;
font-style: normal;
font-weight: bold;
font-size:25px;
line-height: 14px;

display: flex;
align-items: center;
letter-spacing: 0.169679px;

color: #FAFAFA;
`
const Notification = styled.h4`
position: relative;
width: 600px;
height: 50px;
border-radius:2%;
`
const NotificationText = styled.text`
position: absolute;
margin-left:6%;
margin-top:2.8%;
font-family: Manrope;
font-style: normal;
font-weight: bold;
line-height: 14px;

display: flex;
align-items: center;
letter-spacing: 0.169679px;

color: #000000;
`

