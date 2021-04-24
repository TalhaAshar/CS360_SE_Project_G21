import React from 'react'
import LinearCard from '../LinearCard'
import styled from 'styled-components'
import './button.scss';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import { Rotate90DegreesCcw } from '@material-ui/icons';
import axios from 'axios';
import {useEffect, useState} from "react";
import { useLocation, useParams} from "react-router-dom"
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
import NewLinearCard from './NewLinearCard'
import ViewPub from './ViewPublications'
import {HashRouter as Router, Route, Switch, Link} from 'react-router-dom'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';




function PublicationsList() {

	const { id } = useParams();
    
    const [pubs, setPubs] = useState([{'id' : 0, 'Title' : '', 'Authors' : '', 'Publisher' : '', 'Edition_Number' : 0, 'Year_Publication' : 0, 'Lang' : '', 'ISBN' : 0, 'Description' : '', 'Reason_for_Best_Pub' : '' ,'Front_Cover' : '../images/publications/Screenshot_1.png'}])
    const [start, setStart] = useState(0) 
    const [profile, setProfile] = React.useState({"User_Type":"LOGGEDOUT"})

    const [PopView, setPopView] = useState(false)
    const [PopEdit, setPopEdit] = useState([false, false,false, false,false, false,false, false,false, false,false, false,false, false,false, false])    
    
    useEffect(() => {
        let isComponentMounted = true;
        let url1 = "api/main/catalogue_list/"
        axios.get(url1).then((res) => {
            if (isComponentMounted){
                setPubs(res.data)
            };
        })
        .catch(error => console.log('Error:', error))

        let url2 = "api/accounts/profile"
        axios.get(url2).then((res) => {
            if (isComponentMounted){
                setProfile(res.data["User_Type"])
            };
        })
        .catch(error => setProfile("LOGGEDOUT"))

        return () => {
            isComponentMounted = false;
        }
    }, [])
        
    const handleClick = () =>{
        setPopView(!PopView)
        console.log("NEW VIEW", PopView)
    }
    const editClick = (value) =>{
        const updated = [...PopEdit.slice(0, value), !PopEdit[value], ...PopEdit.slice(value+1)]
        console.log(updated)
        setPopEdit(updated)
    }
    const closeClick = () =>{
        const updated = [false, false,false, false,false, false,false, false,false, false,false, false,false, false,false, false]
        console.log(updated)
        setPopEdit(updated)
    }

    function leftClick(){
        if(start > 0){
            setStart(start - 8)
        }
    }

    function rightClick(){
        if(start + 8 < pubs.length){
            setStart(start + 8)
        }
    }

    switch (profile) {
        case 'UNVERIFIED':
        case 'LOGGEDOUT':
        return (
            <Container>
                <BookTitleContainer><h1>Publications</h1></BookTitleContainer>
                <ViewNextButtonContainer>
                        <View onClick = {handleClick} onMouseLeave={handleClick}>
                                    <ViewText>View</ViewText>
                                    <DropdownDiv>
                                    <Svg  width="20%" height="25%" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 20L0.411545 0.5H31.5885L16 20Z" fill="#66CEF2"/>
                                    </Svg>
                                    <ViewPopContainer>
                                    <ViewPub className = "view" trigger={PopView} setTrigger={handleClick}/>
                                    </ViewPopContainer>
                                    </DropdownDiv>
                                </View>
                                <GuestNextPrevious>
                                    <SkipPreviousRoundedIcon onClick={leftClick}/>
                                    <SkipNextRoundedIcon onClick={rightClick}/>
                                </GuestNextPrevious>
                        </ViewNextButtonContainer>
                <Colour>
                <Results>
                    {
                        pubs.map((elem, index) => {
                            if(index >= start && index < (start + 8) && index < pubs.length){
                                return(
                                    <CardDiv>
                                        <NewLinearCard title={elem.Title} author={elem.Authors} front={elem.Front_Cover} id={elem.id}/>
                                    </CardDiv>
                                    )
                            }
                            console.log(index)
                        })
                    }
                </Results>
                </Colour>
            </Container>
        )
            break;
        case 'VERIFIED':
        case 'ADMIN':
        case 'MODERATOR':
            return (
                <Container>
                <PublicationTitle>
                    <Heading>bruh</Heading>
                </PublicationTitle>
                <ViewNextButtonContainer>
                        <View onClick = {handleClick} onMouseLeave={handleClick}>
                                    <ViewText>View</ViewText>
                                    <DropdownDiv>
                                    <Svg  width="20%" height="25%" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 20L0.411545 0.5H31.5885L16 20Z" fill="#66CEF2"/>
                                    </Svg>
                                    <ViewPopContainer>
                                    <ViewPub className = "view" trigger={PopView} setTrigger={handleClick}/>
                                    </ViewPopContainer>
                                    </DropdownDiv>
                                </View>
                                <NextPrevious>
                                    <SkipPreviousRoundedIcon onClick={leftClick}/>
                                    <SkipNextRoundedIcon onClick={rightClick}/>
                                </NextPrevious>
                                <Link to="/addpublication" style ={{textDecoration:"none", paddingRight:"2%"}} >
                                    <View style ={{width:"120%", paddingLeft:"2 %"}} >
                                        <ViewText>Add Publication</ViewText>
                                    </View>
                                </Link>
                        </ViewNextButtonContainer>
                <Colour>
                <Results>
                    {
                        pubs.map((elem, index) => {
                            if(index >= start && index < (start + 8) && index < pubs.length){
                                return(
                                    <CardDiv>
                                        <NewLinearCard title={elem.Title} author={elem.Authors} front={elem.Front_Cover} id={elem.id}/>
                                    </CardDiv>
                                    )
                            }
                            console.log(index)
                        })
                    }
                </Results>
                </Colour>
            </Container>
            )
            break;
            default:
                return (<div></div>)
    }
}

export default PublicationsList

const BookTitleContainer = styled.div`
    background: #0A3977;
    border-radius:20px;
    color:white;
    min-width: 55%;
    display:flex;
    justify-content:center;
    align-items:center;

margin-bottom: 2%;
`

const Container = styled.div`
    max-width:100%;
    max-height:100%;
    margin-left:3%;
    margin-right:3%;
    margin-top:3%;
    margin-bottom:3%;
    @media only screen and (max-width: 1200px) {
        height:auto;
    }
`
const Nextpage = styled.div`
display:flex;
    flex-direction:row;
    margin-left: 260px;
`

const Colour = styled.div`
margin-left:2%;
margin-right:3%;
margin-top:3%;
margin-bottom:20%;

background: #DCF2F8;
width:95%;
height:80%;
border-radius: 20px;
`
const Results = styled.div`
    padding-top:2%;
    width:100%;
    height:100%;
    display:grid;
    grid-template-rows: 200px 200px 200px 200px 200px 200px 200px 200px;//one 200px for each card, should be bigger than the card
`
const PublicationTitle = styled.div`
    min-width: 55%;
    min-height: 2%;
    margin-top: 2%;
    margin-left:2%;
    margin-right:2%;
    display:flex;
    justify-content:center;
    align-items:center;
    color:white;
    background: #03204C;
    border-radius: 8px;
`

const Heading = styled.h3`
    display:flex;
    justify-content:center;
    align-items:center;
    color:white;
    background: #03204C;
`
const ViewNextButtonContainer = styled.div`
    display:flex;
    margin-left:2%;
    margin-right:2%;
    justify-content:space-between;
    align-items:center;
    `
const Svg = styled.svg`
    position:relative;
    bottom:85%;
    left:70%;
`
const ViewPopContainer = styled.div`
position:relative;
margin-top:1%;
z-index:1;
top:6%;
`

const ViewText = styled.h4`
    z-index:2;
    display:flex;
    justify-content:center;
    align-items:center;
`
const View = styled.h4`
    background:#3B058B;
    width:10%;
    height:30px;
    color:white;
    border-radius:6px;
    margin-top:1%;
`
const NextPrevious = styled.h4`
    margin-top:1%;
`

const GuestNextPrevious = styled.h4`
    margin-top:1%;
    margin-right:48.5%;
    cursor: pointer;
`

const CardDiv = styled.div`
    position:relative;
    left:10%;
    right:10%;
    width:100%;

`
const DropdownDiv = styled.div`
    position:relative;
    top:-85%;
    @media only screen and (max-width: 1000px) {
        top:-100%;
    }
    
`