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
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const StyledPopup = styled(Popup)`

//   // use your custom style for ".popup-overlay"
//   &-overlay {
//     ...;
//   }
//   // use your custom style for ".popup-content"
//   &-content {
//     ...;
//   }
`

function Header(props) {
    const [temp, setTemp] = React.useState(props.auth)
    const [logged, setLogged] = React.useState(true)
    const [searched, setSearched] = React.useState('')

    console.log(searched, "kakak")

    const handleChange = (event) => {
        let temp = "/search/" + event.target.value
        setSearched(temp);
        console.log(temp, searched, "SEARCHED")
    }
    
    function logUserOut(){
        const url = `api/register/logout`
        axios.post(url).then((res) => {
            props.onChange({'Status' : 'Unauthentic'})
        })
    }

    function updateParent(event){
        props.onChange(event)
    }

    function handleClick(event) {
        console.log(event.target.value, "mmmmm")
        //props.onChange(event.target.value); // pass any argument to the callback
        setTemp(event)
        updateParent(event)
    }

    function searchSubmit(event){

    }

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
                    <img src="\frontend\src\images\icons\Logo.png"
                    style={{borderRadius:"10px"}} />
              </LogoContainer>
                    <Link to="/" style={{color:"#04396B"}}>
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
                        <Link to="/forum/user" style={{color:"#04396B"}}> 
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
                        <Link to="/Columnar/" style={{color:"#04396B"}}>
                            <Publications>
                                <LibraryBooksIcon
                                style={{
                                    color:"white",
                                    fontSize:30,
                                    marginLeft:"27px"
                                
                                    }}
                                    />
                                    <IconText>Publications</IconText>
                            </Publications>
                        </Link>
            <Link to = "/" style={{color:"#04396B"}}>
                <LogOutContainer onClick={logUserOut}>
                        <ExitToAppIcon
                            style={{
                            color:"white",
                            fontSize:30,
                            marginLeft:"13px"}}/>
                        <IconText>Log Out</IconText> 
                </LogOutContainer>
            </Link>           

            <SearchContainer>
                <SearchIconContainer> 
                    <SearchIcon
                    style={{
                      color:"#5F6368",
                      fontSize:30,
                      display:"flex",
                      justify:"center",
                      alignItems:"center"
                    }}
                  />
            </SearchIconContainer>
                <Search>
                    <SearchInput type="text" maxLength="255" placeholder="Search Publications..." onChange={event => setSearched("/searched/" + event.target.value)} ></SearchInput>
                        
                        <Link to={searched}>
                        <Button style={{
                            display:"flex",
                            justify:"center",
                            alignItems:"center",
                            background:"#04396B",
                            marginTop:"10px",
                            marginRight:"5px",
                            borderRadius:"20px",
                            height: "20px"
                        }}
                    >Search</Button>
                    </Link>
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
margin-top:5px;
`
const UserAccountIconContainer = styled.div`
padding-right:10px;
margin-top:5px;
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
    margin-top:25px;
    margin-left:40px;
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
`
const SearchContainer = styled.div`
    margin-right: 45px;
    background:#D8E6EE;
    height:30px;
    display:flex;
    align-items:center;
    border-radius:20px;
    overflow:hidden;
    &:focus-within {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
`
const SearchIconContainer = styled.div`
    background:#D8E6EE;
`
const SearchInput = styled.input`
    background:#D8E6EE;
    color:black;
    border:none;
    flex-grow:1;
    height:40px;
    border:0;
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

const Button = styled.button`
    color:white;
    border-style: double;
    border-color:#04396B;
    border-radius:6px;

    &:hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
      }
`