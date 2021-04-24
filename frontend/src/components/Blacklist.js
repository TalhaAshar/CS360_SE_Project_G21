import React from 'react';
import styled from 'styled-components';
import BlacklistButton from "./BlacklistButton";
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function Blacklist() {
    const [apps, setApps] = useState([])
    const [flag, setFlag] = useState(false)
    const [start, setStart] = useState(0)

    useEffect(() => {
        let isComponentMounted = true;
        let url = "api/register/blacklist"
        axios.get(url).then((res) => {
            if (isComponentMounted){
                setApps(res.data)
                console.log(res.data, "UMAMAM")
            };
        })
        .catch(error => console.log('Error:', error))

        return () => {
            isComponentMounted = false;
        }
    }, [])

    function leftClick(){
        if(start > 0){
            setStart(start - 15)
        }
    }

    function rightClick(){
        if(start + 15 < apps.length){
            setStart(start + 15)
        }
    }

    function changeStatus(id){
        let url = "api/register/blacklist/delete/" + id
        console.log("am here")
        axios.post(url).then((res) => {
            console.log("success")
            setApps(res.data)
        })
        .catch(error => console.log('Error:', error))
        console.log("big data")
    }

    return (
        <Container>
            <MDAHeader>
                <MDAText>Blacklisted Users</MDAText>
            </MDAHeader>
            <ViewNextButtonContainer>
                <SkipPreviousRoundedIcon style = {{marginLeft:'25px'}} onClick={leftClick}/><SkipNextRoundedIcon style = {{}} onClick={rightClick}/>
            </ViewNextButtonContainer>
            <MDAContainer>
                {
                    apps.map((elem, index) => {
                        let placeholder = "/profile/" + elem.user["id"]
                        return(
                            <Flag >
                                <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                                <Text><Link to={placeholder} style={{textDecoration:"none"}}>{elem.user["username"]}</Link></Text>
                                
                                <BlacklistContainer onClick={() => changeStatus(elem.user["id"])}>
                                    <TextContainer>Remove from blacklist</TextContainer>
                                </BlacklistContainer>
                                <NLine></NLine>
                            </Flag>
                        )
                    })
                }   
                 {(apps.length == 0) && <Flag>
                    <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                    <Text>There are no blacklisted users.</Text>
                    <NLine></NLine> 
                </Flag>}       
            </MDAContainer>
        </Container>
    )
}

export default Blacklist

const Container = styled.div`
max-width: 1570px;
margin: 3% auto;
height: auto;
background-color: white;
margin-bottom: 20%;
`
const MDAHeader = styled.h3`
width: 1050px;
height: 80px;
margin-left:150px;
margin-right:150px;
padding-left: 10px;
padding-right: 10px;
margin-top:150px;
border-radius: 20px;
background: #0A3977;
`
const MDAText = styled.h3`
max-height:50px;
background-color: #0A3977;
color:white;
font-size:50px;
font-weight:bold;
border:1px;
padding-top:15px;
text-align: center;
letter-spacing: -1px;
border-radius:6px;
`

const MDAContainer = styled.div`
width:1050px;
height: 100%;
margin-left:160px;
margin-top:1%;
border-radius:10px;
`

const ViewNextButtonContainer = styled.div`
display:flex;
width:100px;
height:50px;
margin-left:635px;
align-items: Center;
margin-top: 3%;
background: #DCF2F8;
border-radius:10px;
`

const Flag = styled.div`
width:1050px;
height:60px;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 32px;
display: flex;
align-items: center;
color: Black;
margin-bottom : 5%;
background: #DCF2F8;
`


const NLine = styled.line`
position:absolute;
width:1050px;
heigth:0px;
margin-top: 60px;
border: 1px solid #F9F7FC;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const Text = styled.text`
margin-left:40px;
position:absolute;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 32px;
color: #060606;
`

const BlacklistContainer = styled.div`
height: 35px;
width:90px;
align:center;
margin-left:920px;
border-radius:5px; 
background: #583192;
`
const TextContainer = styled.text`
color:white;
align:center;
font-style: normal;
font-weight: bold;
margin-left:8px;

display: flex;
align-items: center;
text-align: center;
letter-spacing: -1px;

color: #FFFFFF;
`
// import React from 'react';
// import styled from 'styled-components';
// import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
// import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
// import BlacklistButton from './BlacklistButton';

// function Blacklist() {
//     return (
//         <Container>
//             <Header>
//                 <HeaderText>Blacklisted Users</HeaderText>
//             </Header>

//             <BList>    
//                 <User>
//                     <Username>Username</Username>
//                     <BlacklistButton/>
//                     <Nline></Nline>
//                 </User>

//                 <User>
//                     <Username>Username</Username>
//                     <BlacklistButton/>
//                     <Nline></Nline>
//                 </User>

//                 <User>
//                     <Username>Username</Username>
//                     <BlacklistButton/>
//                     <Nline></Nline>
//                 </User>

//                 <User>
//                     <Username>Username</Username>
//                     <BlacklistButton/>
//                     <Nline></Nline>
//                 </User>

//                 <User>
//                     <Username>Username</Username>
//                     <BlacklistButton/>
//                     <Nline></Nline>
//                 </User>

//             </BList>

//             <ViewNextButtonContainer>
//                 <SkipPreviousRoundedIcon style = {{marginLeft:'25px'}}/><SkipNextRoundedIcon style = {{}}/>
//             </ViewNextButtonContainer>

//         </Container>
//     )
// }

// export default Blacklist

// const Container = styled.div`
// max-width: 700px;
// margin: 0 auto;
// height: auto;
// background-color: white;
// `
// const BList = styled.h4`
// heigth: 320px;
// width: 600px;
// background: white;
// `
// const Header = styled.h3`
// position:relative;
// height: 50px;
// width: 600px;
// background: #9888BE;
// border-radius: 10px 10px 0px 0px;
// `

// const HeaderText = styled.text`
// position: absolute;
// margin-left:40%;
// margin-top:3%;

// font-family: Manrope;
// font-style: normal;
// font-weight: bold;
// font-size:28px;
// line-height: 14px;

// display: flex;
// align-items: center;
// letter-spacing: 0.169679px;

// color: #FAFAFA;
// `
// const User = styled.h4`
// position: relative;
// width: 600px;
// height: 62px;
// border-radius:2%;
// background: #BCE2F6;
// box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
// `
// const Username = styled.text`
// position: absolute;
// margin-left:2%;
// margin-top:4%;
// font-family: Manrope;
// font-style: normal;
// font-weight: bold;
// line-height: 14px;

// display: flex;
// align-items: center;
// letter-spacing: 0.169679px;

// color: #000000;
// `

// const ViewNextButtonContainer = styled.div`
// display:flex;
// position:relative;
// width:100px;
// height:50px;
// align-items: Center;
// margin-left:37%;
// margin-top:7%;
// background: #9888BE;
// border-radius:10px;
// `

// const Nline = styled.line`
// position:absolute;
// width:598px;
// heigth:0px;
// margin-top: 60px;
// border: 1px solid Black;
// box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
// `
