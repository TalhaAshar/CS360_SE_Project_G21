import React from 'react'
import styled from 'styled-components'
import ResolvedButton from './Buttons(ModReport)/ResolvedButton';
import UnresolvedButton from './Buttons(ModReport)/UnresolvedButton';
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
        }
    }

    function rightClick(){
        if(start + 15 < reports.length){
            setStart(start + 15)
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
                <ReportsText>Reports</ReportsText>
            </ReportsHeader>
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
                                return(
                                    <Flag>
                                        <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>

                                        <Text>{placeholder} reported the publication, <Link to={dest}> {elem.Relevant_Pub["Title"]} </Link>, for {elem.Reason}.</Text>
                                        <UnresolvedButton onClick={changeStatus(elem.id)}/>
                                        <NLine></NLine>
                                    </Flag>
                                )
                            }
                            else if (elem.Status == 'RESOLVED' && elem.Relevant_Post == null){
                                let dest = "/publication/" + elem.Relevant_Pub["id"]
                                return(
                                    <Flag>
                                        <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                                        <Text>{placeholder} reported the publication, <Link to={dest}> {elem.Relevant_Pub["Title"]} </Link>, for {elem.Reason}.</Text>
                                        <ResolvedButton onClick={changeStatus(elem.id)}/>
                                        <NLine></NLine>
                                    </Flag>
                                )
                            }
                            else if (elem.Status == 'UNRESOLVED'){
                                console.log(elem)
                                return(
                                    <Flag>
                                        <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                                        <Text>{placeholder} reported a post for {elem.Reason}.</Text>
                                        <UnresolvedButton onClick={changeStatus(elem.id)}/>
                                        <NLine></NLine>
                                    </Flag>
                                )
                            }
                            else{
                                return(
                                    <Flag>
                                        <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                                        <Text>{placeholder} reported a post for {elem.Reason}.</Text>
                                        <ResolvedButton onClick={changeStatus(elem.id)}/>
                                        <NLine></NLine>
                                    </Flag>
                                )
                            }
                        }
                    })
                }
                {(reports.length == 0) && <Flag>
                    <FiberManualRecordRoundedIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                    <Text>There are no submitted reports.</Text>
                    <NLine></NLine> 
                </Flag>} 
                
            </ReportsContainer>
            <ViewNextButtonContainer>
                <SkipPreviousRoundedIcon style = {{marginLeft:'25px'}} onClick={leftClick}/><SkipNextRoundedIcon style = {{}} onClick={rightClick}/>
            </ViewNextButtonContainer>
        </Container>
    )
}


export default ReportsUser

const Container = styled.div`
max-width: 1570px;
margin: 0 auto;
height: auto;
background-color: white;
`
const ReportsHeader = styled.h3`
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
const ReportsText = styled.h3`
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

const ReportsContainer = styled.h3`
width:1050px;
height: 0 auto;
margin-left:160px;
margin-top:75px;
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

const Flag = styled.h3`
width:1050px;
height:60px;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 32px;

display: flex;
align-items: center;
background: #DCF2F8;
color: Black;
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