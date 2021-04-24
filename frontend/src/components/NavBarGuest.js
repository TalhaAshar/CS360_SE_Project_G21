import React from 'react'
import styled from 'styled-components'
import {useState } from 'react'
import {HashRouter as Router, Route, Switch , Link} from 'react-router-dom'
import Popup from 'reactjs-popup';
import LogIn from './LogIn'
import SignUp from './SignUp'
import NavBar from './NavBar'

import NotificationsIcon from '@material-ui/icons/Notifications';
import HomeOutlined from '@material-ui/icons/HomeOutlined';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ForumIcon from '@material-ui/icons/Forum';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';



function Modal(props) {
    
    function updateParent(event){
        props.onChange(event)
    }
    
    function logUserOut(){
        const url = `api/register/logout`
        axios.post(url).then((res) => {
            props.onChange({'Status' : 'Unauthentic'})
        })
    }

    return (props.trigger) ? (
            <ContentContainer>
                <Content>
                        <Container>
                            <Link to="/" style={{color:"#04396B"}} onClick = {props.setTrigger}>
                                <Home>
                                    <HomeOutlined
                                    style={{
                                        color:"white",
                                        fontSize:30,
                                        marginLeft:"8px"                       
                                        }}
                                        />
                                        <IconText>Home</IconText>
                                    </Home>
                            </Link>
                            <Link to="/forum/user" style={{color:"#04396B"}} onClick = {props.setTrigger}> 
                                    <Forum>
                                            <ForumIcon
                                                style={{
                                                    color:"white",
                                                    fontSize:30,
                                                    marginLeft:"8px"
                                                
                                                    }}
                                            />
                                            <IconText>Forum</IconText>
                                        </Forum>
                            </Link>
                            <Link to="/Columnar/" style={{color:"#04396B"}} onClick = {props.setTrigger}>
                                        <Publications>
                                            <LibraryBooksIcon
                                            style={{
                                                color:"white",
                                                fontSize:30,
                                                marginLeft:"12px"
                                            
                                                }}
                                                />
                                                <IconText>Publications</IconText>
                                        </Publications>
                            </Link>
                        </Container>
                </Content>
            </ContentContainer>
    ) : null;
}

export default Modal
const Container = styled.div`

`

const Form = styled.form`

`
const Spann = styled.span`
    color:black;
    margin-left:60px;

`
const Input = styled.input`
    width: 400px;
    height: 41px;
    background: #F9F7FC;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    border:2px solid #ccc;
    :focus{
        outline:2px;   
    }
`
const Label = styled.label`
    margin-left:60px;
    input[type="file"] {
        display: none;
    }
    width: 400px;
    height: 41px;
    background: #F9F7FC;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    border: 2px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer

`

const Button = styled.button`
    position:relative;
    top:16px;
    right:16px;

`
const ContentContainer = styled.div`

position: fixed; /* Stay in place */
z-index: 1; /* Sit on top */
left: 0;
top: 0;
width: 100%; /* Full width */
height: 100%; /* Full height */
overflow: auto; /* Enable scroll if needed */
background-color: rgb(0,0,10); /* Fallback color */
background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`
const Content = styled.div`
  background-color:#04396B;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 30%; /* Could be more or less, depending on screen size */
`
const Span = styled.span`
color: #aaa;
float: right;
font-size: 28px;
font-weight: bold;
:hover, :focus{
    color: black;
    text-decoration: none;
    cursor: pointer;
}

`
const Para = styled.p`

`
const Home = styled.div`
    height:60px;

`
const Forum = styled.div`
    height:60px;
`
const Publications = styled.div`
    height:60px;
`

const LogOutContainer = styled.div`
    height:60px;
    cursor: pointer;

`
const IconText = styled.h5`
    color:white;
    border-style: double;
    border-color:#04396B;
    border-radius:6px;

    &:hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
      }
`
