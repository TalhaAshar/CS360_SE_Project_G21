import React from 'react'
import styled from 'styled-components'
import {BrowserRouter as Router, Route, Switch , Link} from 'react-router-dom'
import Popup from 'reactjs-popup';
import LogIn from './LogIn'
import SignUp from './SignUp'

import NotificationsIcon from '@material-ui/icons/Notifications';
import HomeOutlined from '@material-ui/icons/HomeOutlined';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ForumIcon from '@material-ui/icons/Forum';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';

const StyledPopup = styled(Popup)`

//   // use your custom style for ".popup-overlay"
//   &-overlay {
//     ...;
//   }
//   // use your custom style for ".popup-content"
//   &-content {
//     ...;
//   }
`;

function Header() {
    return (
        
        <Container>
          <Top>
            <NotificationIconContainer>
                <Link to="/Notification" style={{color:"white"}}>
                <NotificationsIcon/>
                </Link>
            </NotificationIconContainer>
            <UserAccountIconContainer>
                <Link to="/UserAccount" style={{color:"white"}}>
                <AccountCircleIcon/>
                </Link>
            </UserAccountIconContainer>
          </Top>

          <Bottom>
            
              <LogoContainer>
                    <img src="https://www.w3schools.com/images/lamp.jpg" width="80" height="80"
                    style={{paddingBottom:"10px",paddingTop:"10px"}} />
              </LogoContainer>
                    <Link to="/" style={{color:"#04396B"}}>
                      <Home>
                        <HomeOutlined
                        style={{
                            color:"white",
                            fontSize:30,
                            marginLeft:"6px"                       
                            }}
                            />
                            <IconText>Home</IconText>
                        </Home>
                    </Link>
                        <Link to="/Forum" style={{color:"#04396B"}}> 
                            <Forum>
                                <ForumIcon
                                    style={{
                                        color:"white",
                                        fontSize:30,
                                        marginLeft:"6px"
                                    
                                        }}
                                />
                                <IconText>Forum</IconText>
                            </Forum>
                        </Link>
                        <Link to="/Publications" style={{color:"#04396B"}}>
                            <Publications>
                                <LibraryBooksIcon
                                style={{
                                    color:"white",
                                    fontSize:30,
                                    marginLeft:"25px"
                                
                                    }}
                                    />
                                    <IconText>Publications</IconText>
                            </Publications>
                        </Link>
                    <Popup trigger={
                            <SignUpContainer>
                                <PersonAddIcon
                                style={{
                                    color:"white",
                                    fontSize:30,
                                    marginLeft:"5px"
                                    
                                    }}
                                    />
                                    <IconText>Sign Up</IconText>
                            </SignUpContainer>
                        }
                    contentStyle={{ padding: '0px', border: 'none', width:'420px',height:'570px',borderRadius:'30px' }}
                    >
                    <SignUp/>
                    </Popup> 
                        <Popup trigger={
                            <LogInContainer>
                                <AccountCircleIcon
                                    style={{
                                    color:"white",
                                    fontSize:30,
                                    marginLeft:"5px"}}/>
                                <IconText>Log In</IconText> 
                            </LogInContainer>
                        
                        }
                        contentStyle={{ padding: '0px', border: 'none', width:'420px',height:'570px',borderRadius:'30px' }}
                        >
                        <LogIn/>
                        </Popup>

              <SearchContainer>
                 <SearchIconContainer> 
                     <SearchIcon
                  style={{
                      color:"white",
                      fontSize:30,
                      display:"flex",
                      justify:"center",
                      alignItems:"center"
                  }}
                  />
                  </SearchIconContainer>
                  <Search>
                        <SearchInput type="text" placeholder="Search Publications...">
                        </SearchInput>
                        <IconText style={{
                            display:"flex",
                            justify:"center",
                            alignItems:"center"
                        }}
                        >Search</IconText>
                  </Search>

              </SearchContainer>
          </Bottom>

        </Container>
        
       
    )
}

export default Header

const Container = styled.div`
height:150px;
color:white;
`

const Top = styled.div`
    width:100%;
    height:35px;
    background:#03204C;
    display:flex;
    justify-content:flex-end;
    align-items:center;
    filter:drop-shadow(0px 2px 4px rgba(38, 50, 56, 0.16)), drop-shadow(0px 4px 8px rgba(38, 50, 56, 0.08));

`
const NotificationIconContainer = styled.div`
padding-right:10px;

`
const UserAccountIconContainer = styled.div`
padding-right:10px;

`


const Bottom = styled.nav`
    height:80px;
    background:#04396B;
    display:flex;
    align-items:center;
    justify-content:space-between;


    
`

const LogoContainer = styled.div`
    height: 80px;
    margin-left:10px;

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
const SignUpContainer = styled.div`
    height:60px;
`
const LogInContainer = styled.div`
    height:60px;
`
const SearchContainer = styled.div`
    height:60px;
    display:flex;
    align-items:center;
    border-radius:10px;
    overflow:hidden;
    &:focus-within {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
      }
    
`
const SearchIconContainer = styled.div`
background:#04396B;

`
const SearchInput = styled.input`
background:transparent;
color:white;
border:none;
flex-grow:1;
height:40px;
border:0;
border-radius:10px;
overflow:hidden;
&:focus {
    outline:none;
}

`
const Search = styled.div`
    display:flex;
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