import React from 'react'
import styled from 'styled-components'
import Activity from './ActivityContainer'
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
import {useEffect, useState} from "react";
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function PubActivity() {

    const [pubs, setPubs] = useState([])
    const [flag, setFlag] = useState(false)
    const [start, setStart] = useState(0)


    useEffect(() => {
        let isComponentMounted = true;
        let url = "api/accounts/pub_activity"
        axios.get(url).then((res) => {
            if (isComponentMounted){
                setPubs(res.data)
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
        if(start + 15 < pubs.length){
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
            <ActivityHeader>
                <ActivityText>My Activity</ActivityText>
            </ActivityHeader>
            <ActivityContainer>
                {
                    pubs.map((elem, index) => {
                        if(index >= start && index < (start + 15) && index < pubs.length){
                            return(
                                <Activity key={index} pub={elem} type="Pub"/>
                            )
                        }
                    })
                }
            </ActivityContainer>
            <ViewNextButtonContainer>
                <SkipPreviousRoundedIcon style = {{marginLeft:'25px'}} onClick={leftClick}/><SkipNextRoundedIcon style = {{}} onClick={rightClick}/>
            </ViewNextButtonContainer>
        </Container>
    )
}


export default PubActivity

const Container = styled.div`
max-width: 1570px;
margin: 0 auto;
height: auto;
background-color: white;
`
const ActivityHeader = styled.h3`
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
const ActivityText = styled.h3`
max-height:50px;
max-width:380px;
background-color: #0A3977;
color:white;
font-size:50px;
font-weight:bold;
border:1px;
padding-left:335px;
padding-top:15px;
text-align: center;
letter-spacing: -1px;
border-radius:6px;
`

const ActivityContainer = styled.h3`
width:1050px;
height: 1155px;
margin-left:160px;
margin-top:75px;
border-radius:10px;
background: #DCF2F8;
box-shadow: 0px 8px 8px rgba(38, 50, 56, 0.12), 0px 16px 24px rgba(38, 50, 56, 0.08);
`

const ViewNextButtonContainer = styled.div`
display:flex;
width:100px;
height:50px;
margin-left:635px;
align-items: Center;
margin-top:40px;
background: #DCF2F8;
border-radius:10px;
`