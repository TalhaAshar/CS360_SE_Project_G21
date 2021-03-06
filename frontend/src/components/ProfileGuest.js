import React from 'react'
import styled from 'styled-components'
import {useEffect, useState} from "react";
import axios from 'axios';
import {HashRouter as Router, Route, Switch, Link} from 'react-router-dom'
import SecurityIcon from '@material-ui/icons/Security';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { useLocation, useParams} from "react-router-dom"

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function Profile() {
    const { id } = useParams();
    const [Details, setDetails] = useState( {'User_Type':'', 'ProfileImage':'', 'biography':'', 'education':'', 'institution':'', 'profession':'', 'company':'', 'location':'', 'age':'', 'user':{}, 'blacklisted' : false } )
    const [User, setUser] = useState('')
    const [visitor, setVisitor] = useState({'User_Type':'', 'ProfileImage':'', 'biography':'', 'education':'', 'institution':'', 'profession':'', 'company':'', 'location':'', 'age':'', 'user':{}, 'blacklisted' : false })

    let Path = "/List/guest/" + id

    useEffect(() => {
        let isComponentMounted = true;
        let url = `api/accounts/profile/` + id
        axios.get(url).then((res) => {
            if (isComponentMounted){
                setDetails(res.data)
                console.log(res.data)
                setUser(res.data['user']['username'])
            };
        })
        .catch(error => console.log('Error:', error))

        url = `api/accounts/profile`
        axios.get(url).then((res) => {
            if (isComponentMounted){
                console.log(res.data)
                setVisitor(res.data)
            };
        })
        .catch(error => console.log('Error:', error))
        return () => {
            isComponentMounted = false;
        }
    }, [id])

    function addBlacklist(){
        let url = `api/register/blacklist/add/` + id
        axios.post(url).then((res) => {
            
                setDetails(res.data)
                setUser(res.data['user']['username'])
            
        })
        .catch(error => console.log('Error:', error))
    }

            return (
                <OuterContainer>
                <Container>
                <Upper>
                        <Profilepicture src={Details['ProfileImage']}
                            width="200px"
                            height = "200px"
                        /> 
                        <Name style={{marginLeft:"5%"}}>
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
                            <Activity>
                                <Activitytext>
                                    Activity
                                </Activitytext>
                                <Link to={Path} value="My List" style={{textDecoration:"none"}}>
                                    <MyList>
                                        <MyListBackground>
                                            {User}'s List
                                        </MyListBackground>
                                    </MyList>
                                </Link>
                                <Line></Line>
                                
                                    {((visitor['User_Type'] === 'ADMIN' || visitor['User_Type'] === 'MODERATOR') && Details["blacklisted"] === false && Details['User_Type'] != 'ADMIN') && <PrivateMessages onClick={addBlacklist}>
                                        <PMBackground>
                                            Add to Blacklist
                                        </PMBackground>
                                    </PrivateMessages> }
                            </Activity>
                        </ButtonsActivity>
                </Lower>
                </Container>
                </OuterContainer>
            )
}

export default Profile;

const OuterContainer = styled.div`
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
const UserType = styled.h4`
@media only screen and (max-width: 800px){
        display:none;
    }
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
@media only screen and (max-width: 500px){
    display:none;
}
`

const Lower = styled.div`
    margin-top:80px;
    margin-left:20px;
    display:flex;
    @media only screen and (max-width: 800px){
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
left:7%;
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
    width: 52px;
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
    margin-left:20%;
    margin-right:2%;
    margin-bottom:5%;
    @media only screen and (max-width: 800px){
        margin-left:4%;
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

const Activitytext = styled.h3`
width: 100%;
height: 48px;
font-family: Manrope;
font-style: normal;
font-weight: bold;
font-size: 30px;
line-height: 41px;
color: #13AAFF;
`

const Activity = styled.div`
    width:76%;
`
const Line = styled.div`
    height:0px;
    width:100%;
    border: solid 1px;
`

const MyList = styled.div`
`

const MyListBackground = styled.div`
color:black;
display:flex;
justify-content:center;
align-items:center;
width: 100%;
height: 86px;
background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const MyListText = styled.h3`
    width: 108px;
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

const PrivateMessages = styled.div`
`