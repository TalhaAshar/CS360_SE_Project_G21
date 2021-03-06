import React from 'react'
import styled from 'styled-components'
import {HashRouter as Router, Route, Switch , Link} from 'react-router-dom'
import CopyrightIcon from '@material-ui/icons/Copyright';

function Footer() {
    return (
        <Container>
            <Top>
                <LinkContainer>
                    <Link to="/DMCA" style={{color:"white", textDecoration:"none"}}>
                        <FooterText>DMCA</FooterText>
                    </Link>
                    <Link to="/Rules" style={{color:"white",textDecoration:"none"}}>
                        <FooterText>Community Guidelines</FooterText>
                    </Link>
                    <Link to="/Contact" style={{color:"white",textDecoration:"none"}}>
                        <FooterText>Contact Us</FooterText>
                    </Link>
                </LinkContainer>
                <LogoContainer>
                    <img src="\frontend\src\images\icons\Logo.png"
                    style={{borderRadius:"10px"}} />
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
    margin-top:2%;
    width:100%;
    position:relative;
    top:0%;
`
const Top = styled.nav`
    height:80px;
    background:#04396B;
    display:flex;
    align-items:center;
    justify-content:space-between;
`
const LinkContainer = styled.div`
    margin-top: 4px;
    margin-left:10px;
`
const FooterText = styled.h6`
    color:white;
    margin-left:30px;
`
const LogoContainer = styled.div`
    padding-top:10px;
    padding-right:40px;
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