import React from 'react';
import styled from 'styled-components';
import NotificationButton from './NotificationButton';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';


function NotificationDropdown(props) {
    return(props.trigger) ? (
        <Container onMouseLeave={props.setTrigger}>
            <Header>
                <HeaderText>Notifications</HeaderText>
            </Header>

            <NotificationContainer>    
                <Notification>
                    <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'1%', marginTop: '2%',alignItems:'center', position: 'absolute'}}/> 
                    <NotificationText>Notification</NotificationText>
                </Notification>

                <Notification>
                    <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'1%', marginTop: '2%',alignItems:'center', position: 'absolute'}}/>
                    <NotificationText>Notification</NotificationText>
                </Notification>

                <Notification>
                    <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'1%', marginTop: '2%',alignItems:'center', position: 'absolute'}}/>
                    <NotificationText>Notification</NotificationText>
                </Notification>

                <Notification>
                    <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'1%', marginTop: '2%',alignItems:'center', position: 'absolute'}}/>
                    <NotificationText>Notification</NotificationText>
                </Notification>

                <Notification>
                    <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'1%', marginTop: '2%',alignItems:'center', position: 'absolute'}}/>
                    <NotificationText>Notification</NotificationText>
                </Notification>
                
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

