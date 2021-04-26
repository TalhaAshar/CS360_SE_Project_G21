import React from 'react'
import styled from 'styled-components'
import ResolvedButton from './Buttons(ModReport)/ResolvedButton';
import UnresolvedButton from './Buttons(ModReport)/UnresolvedButton';
import UnresolvedButtonUser from "./Buttons(ModReport)/UnresolvedButtonUser";
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function ReportsUser() {
    const [reports, setReports] = useState([])
    const [flag, setFlag] = useState(false)
    const [start, setStart] = useState(0)
    const [type, setType] = useState({'User_Type':''})

    useEffect(() => {
        let isComponentMounted = true;
        let url = "api/accounts/reports"
        axios.get(url).then((res) => {
            if (isComponentMounted){
                setReports(res.data)
            };
        })
        .catch(error => console.log('Error:', error))

        axios.get(`api/accounts/profile`).then((res) => {
            if (isComponentMounted){
                setType(res.data['User_Type'])
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
            window.scrollTo(0, 0)
        }
    }

    function rightClick(){
        if(start + 15 < reports.length){
            setStart(start + 15)
            window.scrollTo(0, 0)
        }
    }

    function changeStatus(id){
        // let url = "api/accounts/reports/" + id
        // console.log("am here")
        // axios.post(url).then((res) => {
        //     console.log("success")
        //     setFlag(!Flag)
        // })
        // .catch(error => console.log('Error:', error))
        console.log("big data")
    }

    return (
        <Container>
            <ReportsHeader>
                <h1>Reports</h1>
            </ReportsHeader>
            <ButtonContainer>
                <div></div>
            <ViewNextButtonContainer>
                <SkipPreviousRoundedIcon style = {{marginLeft:'25px'}} onClick={leftClick}/><SkipNextRoundedIcon style = {{}} onClick={rightClick}/>
            </ViewNextButtonContainer>
            <div></div>
            </ButtonContainer>

            <FormContainer>
            <ReportsContainer>
                {
                    reports.map((elem, index) => {
                        let placeholder = 'You'
                        if(type == 'ADMIN' || type == 'MODERATOR'){
                            placeholder = elem.Creator["username"]
                        }
                        if(index >= start && index < (start + 15) && index < reports.length)
                        {
                            if (elem.Status == 'UNRESOLVED' && elem.Relevant_Post == null){
                                let dest = "/publication/" + elem.Relevant_Pub["id"]
                                let reportLink = "/resolve/report/publication/" + elem.id
                                let userLink = "/profile/" + elem.Creator["id"]
                                return(
                                    <div>
                                        <Flag key={elem.id}>
                                            <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px', marginTop:'1%'}}/>
                                            <TextContainer>
                                            <Text><Link to={userLink} style={{textDecoration:'none', width:'150px'}}>{placeholder}</Link> reported the publication, <Link to={dest}> {elem.Relevant_Pub["Title"]} </Link>, for {elem.Reason}.</Text>
                                            </TextContainer>
                                            
                                            {(type == 'MODERATOR' || type == 'ADMIN') && <Link to={reportLink} style={{textDecoration:"none", marginLeft:"23%", marginRight:"1%"}}>
                                                <UnresolvedButton onClick={changeStatus(elem.id)}/>
                                            </Link>}
                                            {(type != 'MODERATOR' && type != 'ADMIN') && 
                                                <UnresolvedButtonUser onClick={changeStatus(elem.id)}/>
                                            }
                                            
                                        </Flag>
                                        <NLine></NLine>
                                        </div>
                                )
                            }
                            else if (elem.Status == 'RESOLVED' && elem.Relevant_Post == null){
                                let dest = "/publication/" + elem.Relevant_Pub["id"]
                                let reportLink = "/resolve/report/publication/" + elem.id
                                let userLink = "/profile/" + elem.Creator["id"]
                                return(
                                    <div>
                                        <Flag key={elem.id}>
                                            <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px', marginTop:'1%'}}/>
                                            <TextContainer>
                                            <Text><Link to={userLink} style={{textDecoration:'none', width:'150px'}}>{placeholder}</Link> reported the publication, <Link to={dest}> {elem.Relevant_Pub["Title"]} </Link>, for {elem.Reason}.</Text>
                                            </TextContainer>
                                                <ResolvedButton onClick={changeStatus(elem.id)}/>

                                            
                                        </Flag>
                                        <NLine></NLine>
                                        </div>
                                )
                            }
                            else if (elem.Status == 'UNRESOLVED'){
                                console.log(elem)
                                let reportLink = "/resolve/report/post/" + elem.id
                                let userLink = "/profile/" + elem.Creator["id"]
                                let postLink = "/thread/user/" + elem.Relevant_Thread
                                return(
                                    <div>
                                        <Flag key={elem.id}>
                                            <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px', marginTop:'1%'}}/>
                                            <TextContainer>
                                            <Text><Link to={userLink} style={{textDecoration:'none', width:'150px'}}>{placeholder}</Link> reported a <Link to={postLink} style={{textDecoration:'none'}}>post</Link> for {elem.Reason}.</Text>
                                            </TextContainer>
                                            {(type == 'MODERATOR' || type == 'ADMIN') && <Link to={reportLink} style={{textDecoration:"none", marginLeft:"23%", marginRight:"1%"}}>
                                                <UnresolvedButton onClick={changeStatus(elem.id)}/>
                                            </Link>}
                                            {(type != 'MODERATOR' && type != 'ADMIN') && 
                                                <UnresolvedButtonUser  onClick={changeStatus(elem.id)}/>
                                            }
                                            
                                        </Flag>
                                        <NLine></NLine>
                                        </div>
                                    
                                )
                            }
                            else{
                                let reportLink = "/resolve/report/post/" + elem.id
                                let userLink = "/profile/" + elem.Creator["id"]
                                let postLink = "/thread/user/" + elem.Relevant_Thread
                                return(
                                    <div>
                                        <Flag key={elem.id}>
                                            <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px', marginTop:'1%'}}/>
                                            <TextContainer>
                                            <Text><Link to={userLink} style={{textDecoration:'none', width:'150px'}}>{placeholder}</Link> reported a <Link to={postLink} style={{textDecoration:'none'}}>post</Link> for {elem.Reason}.</Text>
                                            </TextContainer>
                                                <ResolvedButton onClick={changeStatus(elem.id)}/>
                                            
                                        </Flag>
                                        <NLine></NLine>
                                        </div>
                                    
                                )
                            }
                        }
                    })
                }
                {(reports.length == 0) && <div><Flag>
                    <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px', marginTop:'1%'}}/>
                    <Text>There are no submitted reports.</Text>
                     
                </Flag>
                <NLine></NLine></div>} 
                
            </ReportsContainer>
            </FormContainer>
        </Container>
    )
}


export default ReportsUser

const Container = styled.div`
width: 100%;
height: 95%;
background-color: white;
`
const ReportsHeader = styled.h3`
background: #0A3977;
    border-radius:20px;
    color:white;
    min-width: 55%;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-left: 3%;
margin-right: 3%;
margin-top: 2%;
margin-bottom: 2%;
`

const FormContainer = styled.div`
margin-left: 3%;
margin-right: 3%;
  max-width: 100%;
  max-height: 100%;
  margin-top: 2%;
  display:flex;
  justify-content:center;
  background:white;
  border-radius: 16px;
  align-items: center;
  padding-bottom: 3%;
  padding-left: 3%;
`

const ReportsText = styled.h3`
max-height:50px;
color:white;
font-size:25px;
font-weight:bold;
border:1px;
margin-top:2%;
text-align: center;
letter-spacing: -1px;
border-radius:6px;
`

const ReportsContainer = styled.div`
width: 100%;
height: 95%;
margin-top:3%;
border-radius:10px;
`

const ViewNextButtonContainer = styled.div`
display:flex;
width:100px;
height:50px;
align-items: Center;
margin-top:3%;
border-radius:10px;
`

const Flag = styled.div`
width:95%;
height:auto;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 32px;
color: Black;
display: flex;
align-items: center;
background: #DCF2F8;
padding-top: 1%;
`


const NLine = styled.line`
position:absolute;
width:86%;
heigth:0px;
border: 1px solid #F9F7FC;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const Text = styled.text`
width:100%;
height:60px;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 32px;
color: Black;
`

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const TextContainer = styled.div`
    width: 68%;
`