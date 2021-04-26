import React from 'react'
import styled from 'styled-components'
import {useEffect, useState} from "react";
import axios from 'axios';
import {HashRouter as Router, Route, Switch, Link} from 'react-router-dom'
import ProfileManagement from "./ProfileManagement";
import SecurityIcon from '@material-ui/icons/Security';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

//User profile type icon needs to be added.

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function Profile() {
    const [Details, setDetails] = useState( {'User_Type':'', 'ProfileImage':'', 'biography':'', 'education':'', 'institution':'', 'profession':'', 'company':'', 'location':'', 'age':'', 'user':{} } )
    const [User, setUser] = useState('')
    const [flag, setFlag] = React.useState(false)

    useEffect(() => {
        let isComponentMounted = true;
        axios.get(`api/accounts/profile`).then((res) => {
            if (isComponentMounted){
                setDetails(res.data)
                setUser(res.data['user']['username'])
            };
        })
        .catch(error => console.log('Error:', error))
        return () => {
            isComponentMounted = false;
        }
    }, [flag])

    function MouseDown(Flag){
        setFlag(!Flag)
    }

    function changeFlag(Flag){
        setFlag(!Flag)
    }

    switch (flag) {
        case false:
            return (
                <Overall>
                <Container>
                <Upper>
                        <Profilepicture src={Details['ProfileImage']}
                            width="200px"
                            height = "200px"
                        /> 
                        <Name  style={{marginLeft:"5%"}}>
                            {User}
                        </Name>

                        <Admintag>
                            {  (Details['User_Type'] === 'ADMIN') && <SecurityIcon style = {{ color:"#00FF00", height:"100%", width:"100%" }}/>    }
                            {  (Details['User_Type'] === 'MODERATOR') && <SecurityIcon style = {{ color:"#FFFF00", height:"100%", width:"100%" }}/>    }
                            {  (Details['User_Type'] === 'VERIFIED') && <VerifiedUserIcon style = {{ color:"#00FF00", height:"100%", width:"100%" }}/>    }
                            {  (Details['User_Type'] === 'UNVERIFIED') && <VerifiedUserIcon style = {{ color:"#FFFF00", height:"100%", width:"100%" }}/>    }
                            <UserType>{Details['User_Type']}</UserType>
                        </Admintag>
                </Upper>

                <Lower>
                        <Descone>
                            {  (Details['User_Type'] === 'ADMIN') && <Profession>Profession</Profession>    }
                            {  (Details['User_Type'] === 'ADMIN') && <Professionfilled>{Details['profession']}</Professionfilled>   }
                            {  (Details['User_Type'] === 'ADMIN') && <Company>Company</Company> }
                            {  (Details['User_Type'] === 'ADMIN') && <Companyfilled>{Details['company']}</Companyfilled> }
                            {  (Details['User_Type'] != 'ADMIN') && <Profession>Education</Profession>    }
                            {  (Details['User_Type'] != 'ADMIN') && <Professionfilled>{Details['education']}</Professionfilled>   }
                            {  (Details['User_Type'] != 'ADMIN') && <Company>Institution</Company>  }
                            {  (Details['User_Type'] != 'ADMIN') && <Companyfilled>{Details['institution']}</Companyfilled>   }

                            <Location>
                                Location
                            </Location>
                            <Locationfilled>
                                {Details['location']}
                            </Locationfilled>

                            <Age>
                                Age
                            </Age>
                            <Agefilled>
                                {Details['age']}
                            </Agefilled>
                        </Descone>

                        <Biography>
                            <BioText>
                                Biography
                            </BioText>

                            <TellUsAboutYourself>
                                {Details['biography']}
                            </TellUsAboutYourself>
                        </Biography>
                        <ButtonsActivity>
                            <Link to="/List" value="My List" style={{textDecoration:"none"}}>
                                <MyList>
                                    <MyListBackground>
                                        My List
                                    </MyListBackground>
                                </MyList>
                            </Link>
                            <Link to={'/reports'} value="Reports" style={{textDecoration:"none"}}>
                                <Report>
                                    <ReportBackground>
                                        Report History
                                    </ReportBackground>
                                </Report>
                            </Link>
                            <Settings onMouseDownCapture={() => MouseDown(flag)}>
                                <SettingsBackground>
                                    Manage Profile
                                </SettingsBackground>
                            </Settings>
                        {
                            ((Details['User_Type'] === 'MODERATOR') || (Details['User_Type'] === 'ADMIN')) &&
                            <Link to={'/modhist'} value="Moderator Applications" style={{textDecoration:"none"}}>
                                <ModApp>
                                    <ModAppBackground>
                                        Moderator Applications
                                    </ModAppBackground>
                                </ModApp>
                            </Link>
                        }
                        {
                            ((Details['User_Type'] === 'VERIFIED') || (Details['User_Type'] === 'UNVERIFIED')) &&
                            <Link to='/modapps' value="Moderator Applications" style={{textDecoration:"none"}}>
                                <ModApp>
                                    <ModAppBackground>
                                        Moderator Application Form
                                    </ModAppBackground>
                                </ModApp>
                            </Link>
                        }

                        <Activity>
                            <Activitytext>
                                Activity
                            </Activitytext>
                            <Link to='/my_activity' value="My Activity" style={{textDecoration:"none"}}>
                                <MyActivity>
                                    <ActivityBackground>
                                        My Activity
                                    </ActivityBackground>
                                </MyActivity>
                            </Link>
                            <Line></Line>
                            <Link to='/contributions' value="Publications" style={{textDecoration:"none"}}>
                                <Publications>
                                    <PublicationsBackground>
                                        Contributions
                                    </PublicationsBackground>
                                </Publications>
                            </Link>
                            <Line></Line>
                            <Link to='/' value="Private Messages" style={{textDecoration:"none"}}>
                            <PrivateMessages>
                                <PMBackground>
                                    Private Messages
                                </PMBackground>
                            </PrivateMessages>
                            </Link>
                        </Activity>
                        </ButtonsActivity>
                </Lower>
                </Container>
                </Overall>
            )
        case true:
            return (
                <ProfileManagement passDetails={Details} passUsername={User} passID={User['id']} onChange={changeFlag} val={flag} />
            )
        default:
            return (
                <Overall>
                <Container>
                <Upper>
                        <Profilepicture src={Details['ProfileImage']}
                            width="200px"
                            height = "200px"
                        /> 
                        <Name>
                            {User}
                        </Name>

                        <Admintag>
                            {  (Details['User_Type'] === 'ADMIN') && <SecurityIcon style = {{ color:"#00FF00", height:"100%", width:"100%" }}/>    }
                            {  (Details['User_Type'] === 'MODERATOR') && <SecurityIcon style = {{ color:"#FFFF00", height:"100%", width:"100%" }}/>    }
                            {  (Details['User_Type'] === 'VERIFIED') && <VerifiedUserIcon style = {{ color:"#00FF00", height:"100%", width:"100%" }}/>    }
                            {  (Details['User_Type'] === 'UNVERIFIED') && <VerifiedUserIcon style = {{ color:"#FFFF00", height:"100%", width:"100%" }}/>    }
                            {Details['User_Type']}
                        </Admintag>
                </Upper>

                <Lower>
                        <Descone>
                            {  (Details['User_Type'] === 'ADMIN') && <Profession>Profession</Profession>    }
                            {  (Details['User_Type'] === 'ADMIN') && <Professionfilled>{Details['profession']}</Professionfilled>   }
                            {  (Details['User_Type'] === 'ADMIN') && <Company>Company</Company> }
                            {  (Details['User_Type'] === 'ADMIN') && <Companyfilled>{Details['company']}</Companyfilled> }
                            {  (Details['User_Type'] === 'MODERATOR') && <Profession>Education</Profession>    }
                            {  (Details['User_Type'] === 'MODERATOR') && <Professionfilled>{Details['education']}</Professionfilled>   }
                            {  (Details['User_Type'] === 'MODERATOR') && <Company>Institution</Company>  }
                            {  (Details['User_Type'] === 'MODERATOR') && <Companyfilled>{Details['institution']}</Companyfilled>   }

                            <Location>
                                Location
                            </Location>
                            <Locationfilled>
                                {Details['location']}
                            </Locationfilled>

                            <Age>
                                Age
                            </Age>
                            <Agefilled>
                                {Details['age']}
                            </Agefilled>
                        </Descone>

                        <Biography>
                            <BioText>
                                Biography
                            </BioText>

                            <TellUsAboutYourself>
                                {Details['biography']}
                            </TellUsAboutYourself>
                        </Biography>
                        <ButtonsActivity>
                        <Buttons>
                            <Link to={ID_List} value="My List" style={{textDecoration:"none"}}>
                                <MyList>
                                    <MyListBackground>
                                        My List
                                    </MyListBackground>
                                </MyList>
                            </Link>
                            <Link to={{
                                pathname : '/reports',
                                state : Details['User_Type'],
                            }} value="Reports" style={{textDecoration:"none"}}>
                                <Report>
                                    <ReportBackground>
                                        Report History
                                    </ReportBackground>
                                </Report>
                            </Link>
                            <Settings onMouseDownCapture={() => MouseDown(flag)} style={{textDecoration:"none"}}>
                                <SettingsBackground>
                                    Manage Profile
                                </SettingsBackground>
                            </Settings>
                        {
                            ((Details['User_Type'] === 'MODERATOR') || (Details['User_Type'] === 'ADMIN')) &&
                            <Link to={{
                                pathname : '/modhist',
                                state : Details['User_Type'],
                            }} value="Moderator Applications" style={{textDecoration:"none"}}>
                                <ModApp>
                                    <ModAppBackground>
                                        View Moderator Applications
                                    </ModAppBackground>
                                </ModApp>
                            </Link>
                        }
                        {
                            ((Details['User_Type'] === 'VERIFIED') || (Details['User_Type'] === 'UNVERIFIED')) &&
                            <Link to='/modapps' value="Moderator Applications" style={{textDecoration:"none"}}>
                                <ModApp>
                                    <ModAppBackground>
                                        Moderator Application Form
                                    </ModAppBackground>
                                </ModApp>
                            </Link>
                        }
                        </Buttons>

                        <Activity>
                            <Activitytext>
                                Activity
                            </Activitytext>
                            <Link to='/my_activity' value="My Activity" style={{textDecoration:"none"}}>
                                <MyActivity>
                                    <ActivityBackground>
                                        My Activity
                                    </ActivityBackground>
                                </MyActivity>
                            </Link>
                            <Line></Line>
                            <Link to='/contributions' value="Publications" style={{textDecoration:"none"}}>
                                <Publications>
                                    <PublicationsBackground>
                                        Contributions
                                    </PublicationsBackground>
                                </Publications>
                            </Link>
                            <Line></Line>
                            <Link to='/' value="Private Messages" style={{textDecoration:"none"}}>
                            <PrivateMessages>
                                <PMBackground>
                                    Private Messages
                                </PMBackground>
                            </PrivateMessages>
                            </Link>
                        </Activity>
                        </ButtonsActivity>
                </Lower>
                </Container>
                </Overall>
            )
        }
}

export default Profile;
const Overall = styled.div`
    width: 90%;
    height: auto;
    margin-top:5%;
    margin-left:3%;
    margin-right:3%;
    margin-bottom:4%;
    background:white;
`
const Container = styled.div`
width: 90%;
height:auto;
margin-top:3%;
margin-left:3%;
margin-right:3%;
margin-bottom:4%;
background: #DCF2F8;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 24px;
padding-bottom:5%;
`
const Upper = styled.div`
display:flex;
width: 100%;
height: 186px;
    background: linear-gradient(90deg, #03204C 10.42%, rgba(70, 51, 138, 0.88) 97.92%);
`

const Profilepicture = styled.img`
width: 20%;
height: 115%;
border-radius: 50px;
margin-left:5%;
margin-top:5%;
`

const Name = styled.h3`
width:30%;
height: 55px;
margin-top:5%;
margin-left:2%;
font-family: Manrope;
font-style: normal;
font-weight: bold;
font-size: 40px;
line-height: 55px;
color: #FFFFFF;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`


const Admintag = styled.div`
left: 25%;
bottom: 7%;
top: 10%;
width: 82px;
height: 82px;
color:white;
display: flex;
flex-flow: row wrap;
align-items: center;
justify-content: center;
position: relative;
@media only screen and (max-width: 800px){
    left:20%;
    margin-left:2%;
}
@media only screen and (max-width: 900px){
    display:none;
}
`
const UserType = styled.h4`
@media only screen and (max-width: 900px){
        display:none;
    }
`
const Lower = styled.div`
margin-top:80px;
margin-left:20px;
display:flex;
@media only screen and (max-width: 1000px){
    display:flex;
    flex-flow:row wrap;
    height:auto;
}
`

const Descone = styled.div`
margin-top: 7%;
margin-left: 5%;
`
const ButtonsActivity = styled.div`
position:relative;
width:100%;
height:90%;
left:20%;
`

const Profession = styled.h3`
    width: 131px;
    height: 34px;
    margin-bottom: 10px;
    margin-top: 30px;
    font-family: Manrope;
    font-style: normal;
    font-weight: bold;
    font-size: 25px;
    line-height: 34px;
    color: #13AAFF;
`

const Professionfilled = styled.h3`
    width: 183px;
    height: 27px;
    margin-bottom: 30px;
    font-family: Manrope;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 27px;
    color: #000000;
`
const Company = styled.h3`
margin-bottom: 10px;
    margin-top: 30px;
    width: 121px;
    height: 34px;
   
    font-family: Manrope;
    font-style: normal;
    font-weight: bold;
    font-size: 25px;
    line-height: 34px;
    color: #13AAFF;
`
const Companyfilled = styled.h3`
margin-bottom: 30px;
    width: 0 auto;
    height: 27px;
   
    font-family: Manrope;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 27px;
    color: #000000;
`
const Location = styled.h3`
margin-bottom: 10px;
    margin-top: 30px;
    width: 107px;
    height: 34px;
    
    font-family: Manrope;
    font-style: normal;
    font-weight: bold;
    font-size: 25px;
    line-height: 34px;
    color: #13AAFF;
`
const Locationfilled = styled.h3`
margin-bottom: 30px;
    width: 72px;
    height: 27px;
   
    font-family: Manrope;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 27px;
    color: #000000;
`

const Age = styled.h3`
margin-bottom: 10px;
    margin-top: 30px;
    width: 48px;
    height: 34px;
  
    font-family: Manrope;
    font-style: normal;
    font-weight: bold;
    font-size: 25px;
    line-height: 34px;
    color: #13AAFF;
`

const Agefilled = styled.h3`
margin-bottom: 30px;
    width: 22px;
    height: 62px;
    
    font-family: Manrope;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 27px;
    color: #000000;
`

const Biography = styled.div`
margin-left:10%;
margin-right:2%;
margin-bottom:5%;
@media only screen and (max-width: 800px){
    margin-left:8%;
}
`

const BioText = styled.h3`
width: 100%;
height: 48px;
font-family: Manrope;
font-style: normal;
font-weight: bold;
font-size: 30px;
line-height: 41px;
color: #13AAFF;
`

const TellUsAboutYourself = styled.div`
`

const Buttons = styled.div`
`

const MyList = styled.div`
`

const MyListBackground = styled.div`
color:white;
display:flex;
justify-content:center;
align-items:center;
margin-bottom:20px;
width: 250px;
height: 30px;
background: #03204C;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;
`
const MyListText = styled.h3`
width: 243px;
height: 24px;
font-family: Inter;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 24px;
color: #FFFFFF;
`

const Report = styled.div`
`

const ReportBackground = styled.div`
color:white;
display:flex;
justify-content:center;
align-items:center;
margin-bottom:20px;
width: 250px;
height: 30px;
background: #03204C;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;
`

const ReportText = styled.h3`
    width: 81px;
    height: 24px;
   
    font-family: Manrope;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 27px;
    color: #FFFFFF;
`
const Settings = styled.div`
cursor: pointer;
`
const SettingsBackground = styled.div`
color:white;
display:flex;
justify-content:center;
align-items:center;
margin-bottom:20px;
width: 250px;
height: 30px;
background: #03204C;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;
`
const SettingsText = styled.h3`
    width: 95px;
    height: 24px;
   
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    color: #FFFFFF;
`
const ModApp = styled.div`
`
const ModAppBackground = styled.div`
color:white;
display:flex;
justify-content:center;
align-items:center;
margin-bottom:20px;
width: 250px;
height: 30px;
background: #03204C;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;
`

const Activitytext = styled.h3`
width: 273px;
height: 48px;
font-family: Manrope;
font-style: normal;
font-weight: bold;
font-size: 30px;
line-height: 41px;
color: #13AAFF;
`

const ModAppText = styled.h3`
    width: 243px;
    height: 24px;
   
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    color: #FFFFFF;
`

const Activity = styled.div`
    width:250px;
`
const Line = styled.div`
    height:0px;
    width:100%;
    border: solid 1px;
`

const MyActivity = styled.div`
width:100%;
`

const ActivityBackground = styled.div`
color:black;
display:flex;
justify-content:center;
align-items:center;
    width: 100%;
    height: 86px;
  
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const MyActivityText = styled.h3`
    width: 108px;
    height: 27px;
    
    font-family: Manrope;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 27px;
    color: #000000;
`

const PublicationsBackground = styled.div`
color:black;
display:flex;
justify-content:center;
align-items:center;
    width: 100%;
    height: 86px;
  
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const PublicationsText = styled.h3`
    width: 122px;
    height: 27px;
   
    font-family: Manrope;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 27px;
    color: #000000;
`

const PMBackground = styled.div`
color:black;
display:flex;
justify-content:center;
align-items:center;
    width: 100%;
    height: 86px;
    
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const PMText = styled.h3`
    width: 170px;
    height: 27px;
   
    font-family: Manrope;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 27px;
    color: #000000;
`

const Publications = styled.div`
`

const PrivateMessages = styled.div`
`