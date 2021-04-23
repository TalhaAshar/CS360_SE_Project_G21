import React from 'react';
import styled from 'styled-components';
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
import BlacklistButton from './BlacklistButton';

function Blacklist() {
    return (
        <Container>
            <Header>
                <HeaderText>Blacklisted Users</HeaderText>
            </Header>

            <BList>    
                <User>
                    <Username>Username</Username>
                    <BlacklistButton/>
                    <Nline></Nline>
                </User>

                <User>
                    <Username>Username</Username>
                    <BlacklistButton/>
                    <Nline></Nline>
                </User>

                <User>
                    <Username>Username</Username>
                    <BlacklistButton/>
                    <Nline></Nline>
                </User>

                <User>
                    <Username>Username</Username>
                    <BlacklistButton/>
                    <Nline></Nline>
                </User>

                <User>
                    <Username>Username</Username>
                    <BlacklistButton/>
                    <Nline></Nline>
                </User>

            </BList>

            <ViewNextButtonContainer>
                <SkipPreviousRoundedIcon style = {{marginLeft:'25px'}}/><SkipNextRoundedIcon style = {{}}/>
            </ViewNextButtonContainer>

        </Container>
    )
}

export default Blacklist

const Container = styled.div`
max-width: 700px;
margin: 0 auto;
height: auto;
background-color: white;
`
const BList = styled.h4`
heigth: 320px;
width: 600px;
background: white;
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
margin-top:2.5%;

font-family: Manrope;
font-style: normal;
font-weight: bold;
line-height: 14px;

display: flex;
align-items: center;
letter-spacing: 0.169679px;

color: #FAFAFA;
`
const User = styled.h4`
position: relative;
width: 600px;
height: 62px;
border-radius:2%;
background: #BCE2F6;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const Username = styled.text`
position: absolute;
margin-left:2%;
margin-top:4%;
font-family: Manrope;
font-style: normal;
font-weight: bold;
line-height: 14px;

display: flex;
align-items: center;
letter-spacing: 0.169679px;

color: #000000;
`

const ViewNextButtonContainer = styled.div`
display:flex;
position:relative;
width:100px;
height:50px;
align-items: Center;
margin-left:37%;
margin-top:7%;
background: #9888BE;
border-radius:10px;
`

const Nline = styled.line`
position:absolute;
width:598px;
heigth:0px;
margin-top: 60px;
border: 1px solid Black;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`