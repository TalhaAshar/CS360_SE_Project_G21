import React from 'react'
import styled from 'styled-components'
import {HashRouter as Router, Route, Switch , Link} from 'react-router-dom'
import { useHistory } from "react-router-dom";
import Popup from 'reactjs-popup';
import LogIn from './LogIn'
import SignUp from './SignUp'
import NavBar from './NavBarGuest'


import NotificationsIcon from '@material-ui/icons/Notifications';
import HomeOutlined from '@material-ui/icons/HomeOutlined';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ForumIcon from '@material-ui/icons/Forum';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';



function Header(props) {
    const [temp, setTemp] = React.useState(props.auth)
    const [searched, setSearched] = React.useState('')
    const [flag, setFlag] = React.useState(false)
    const [NavStatus, setNavStatus] = React.useState(false)
    const history = useHistory();

    const handleChange = (event) => {
        let temp = "/search/" + event.target.value
        setSearched(temp);
    }

    function updateParent(event){
        props.onChange(event)
        history.push("/");
    }

    function handleClick(event) {
        setTemp(event)
        updateParent(event)
    }
    function handleNav(event){

        setNavStatus(!NavStatus)
    }
    function handleKeyPress(e){
        if(e.key==="Enter"){
            history.push(searched)
        }
    }
    return (
        <Overall>
        <Container>
          <Top>
          </Top>

          <Bottom>
            
            <Link to="/"> 
                <LogoContainer>
                        <img src="\frontend\src\images\icons\Logo.png"
                        style={{borderRadius:"10px"}} />
                </LogoContainer>
            </Link>
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
                        <Link to="/forum/guest" style={{color:"#04396B"}}> 
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
                            
            <Popup trigger={
                <SignUpContainer>
                    <PersonAddIcon
                    style={{
                        color:"white",
                        fontSize:30,
                        marginLeft:"9px"
                        
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
                        marginLeft:"7px"}}/>
                    <IconText>Log In</IconText> 
                </LogInContainer>
            
            }
            contentStyle={{ padding: '0px', border: 'none', width:'420px',height:'570px',borderRadius:'30px' }}
            >
            <LogIn auth={temp} onChange={handleClick}/>
            </Popup>

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
                    <SearchInput type="text" maxLength="255" placeholder="Search Publications..." onChange={event => setSearched("/searched/" + event.target.value)} onKeyPress={e => handleKeyPress(e)}></SearchInput>
                    <Link to={searched}  style={{textDecoration:"none"}}>
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
          <ContainerMini>
                        <Top></Top>

                        <Bottom style={{justifyContent:"flex-start"}}>
                            <Link to="/" >  
                                <LogoContainer>
                                        <img src="\frontend\src\images\icons\Logo.png"
                                        style={{borderRadius:"10px"}} />
                                </LogoContainer>
                            </Link>
                            <MenuIcon color="white" style={{marginRight:"2%", marginLeft:"5%"}} onClick={handleNav}/>
                            <Popup trigger={
                                <SignUpContainer style={{marginRight:"3.5%", marginTop:"4%",marginLeft:"1%"}}>
                                    <PersonAddIcon
                                    style={{
                                        color:"white",
                                        fontSize:30,
                                        marginLeft:"1px"
                                        
                                        }}
                                        />
                                </SignUpContainer>
                            }
                                contentStyle={{ padding: '0px', border: 'none', width:'420px',height:'570px',borderRadius:'30px' }}
                                >
                                <SignUp/>
                            </Popup> 
                            <Popup trigger={
                                    <LogInContainer style={{marginRight:"3.5%", marginTop:"4%",marginLeft:"1%"}}>
                                        <AccountCircleIcon
                                            style={{
                                            color:"white",
                                            fontSize:30,
                                            marginLeft:"1px"
                                            }}/>
                                    </LogInContainer>
            
                            }
                                contentStyle={{ padding: '0px', border: 'none', width:'420px',height:'570px',borderRadius:'30px' }}
                            >
                                <LogIn auth={temp} onChange={handleClick}/>
                            </Popup>

                            <SearchContainer style ={{marginLeft:"5%", marginRight:"6%"}} >
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
                                        <SearchInput type="text" maxLength="255" placeholder="Search Publications..." onChange={event => setSearched("/searched/" + event.target.value)} onKeyPress={e => handleKeyPress(e)}></SearchInput>
                                    </Search>
                                </SearchContainer>
                        </Bottom>
                        <BottomNew>
                            <NavBar trigger={NavStatus} setTrigger={handleNav}/>
                        </BottomNew>
        </ContainerMini>
        </Overall>
        
       
    )
}

export default Header
const Overall = styled.div`
    height:150px;
    color:white;
    width:100%;
`
const Container = styled.div`
    height:150px;
    color:white;
    @media only screen and (max-width: 800px){
        display:none;
    }
`
const ContainerMini = styled.div`
    display:none;
    @media only screen and (max-width: 800px){
    display:block;
    height:150px;
    color:white;
    width:100%;
}
`
const BottomNew = styled.div`
    height:20px;
    margin-bottom:3%;
    background:#04396B;
    display:flex;
    flex-flow:row wrap;
    
`
const Top = styled.div`
    margin-top:-20px;
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
    margin-top:25px;
    margin-left:40px;
    cursor: pointer;
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
    cursor: pointer;

`
const LogInContainer = styled.div`
    height:60px;
    cursor: pointer;

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
      cursor: pointer;

`