import React from 'react'
import styled from 'styled-components'
import {BrowserRouter as Router, Route, Switch , Link} from 'react-router-dom'
import CopyrightIcon from '@material-ui/icons/Copyright';

function Footer() {
    return (
        <Container>
            <Top>
                <LinkContainer>
                    <Link to="/dmca" style={{color:"white", textDecoration:"none"}}>
                        <FooterText>DMCA</FooterText>
                    </Link>
                    <Link to="/rules" style={{color:"white",textDecoration:"none"}}>
                        <FooterText>Community Guidelines</FooterText>
                    </Link>
                    <Link to="/contact" style={{color:"white",textDecoration:"none"}}>
                        <FooterText>Contact Us</FooterText>
                    </Link>
                </LinkContainer>
                <LogoContainer>
                    <img src="https://www.w3schools.com/images/lamp.jpg" width="60" height="60"
                    style={{paddingBottom:"10px"}} />
                </LogoContainer>
            </Top>
            <Bottom>
                <CopyrightContainer>
                    <CopyrightIcon style={{color:"white"}} />2021-22 BookBound
                </CopyrightContainer>
            </Bottom>
        </Container>
    )
}

export default Footer

const Container = styled.div`
    
`
const Top = styled.nav`
    height:80px;
    background:#04396B;
    display:flex;
    align-items:center;
    justify-content:space-between;
`
const LinkContainer = styled.div`

`
const FooterText = styled.h6`
    color:white;
    margin-left:30px;

`
const LogoContainer = styled.div`
    padding-top:10px;
    padding-right:10px;
    padding-left:10px;
`
const Bottom = styled.div`
    width:100%;
    height:30px;
    background:#03204C;
    display:flex;
    margin-bottom:-6px;
    justify-content:flex-end;
    align-items:center;
    filter:drop-shadow(0px 2px 4px rgba(38, 50, 56, 0.16)), drop-shadow(0px 4px 8px rgba(38, 50, 56, 0.08));

`
const CopyrightContainer = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding-right:4px;
    color:white;
    font-size:10px;
`