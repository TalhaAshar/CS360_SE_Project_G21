import React from 'react'
import styled from 'styled-components'
import Card from '../Cards'
import {useEffect, useState} from "react";
import axios from 'axios';
import { useLocation, useParams} from "react-router-dom"
import ViewPub from './ViewPublications'
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
import {HashRouter as Router, Route, Switch, Link} from 'react-router-dom'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function Publications(props) {
    const { id } = useParams();
    const [pubs, setPubs] = React.useState([{'id' : 0, 'Title' : '', 'Authors' : '', 'Front_Cover' : '../images/publications/Screenshot_1.png'}])
    const [profile, setProfile] = React.useState({"User_Type":"LOGGEDOUT"})
    const [PopView, setPopView] = useState(false)    
    const [start, setStart] = useState(0)

    useEffect(() => {
        //getData(id)
        let isComponentMounted = true;
        let url1 = "api/main/catalogue_columnar/"
        axios.get(url1).then((res) => {
            if (isComponentMounted){
                setPubs(res.data)
                console.log('ye boi', res.data)
                console.log('nu boi', pubs.length)
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

    function leftClick(){
        if(start > 0){
            setStart(start - 16)
        }
    }

    function rightClick(){
        if(start + 16 < pubs.length){
            setStart(start + 16)
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
                    <Cards>
                         {
                             pubs.map((elem, index) => {
                                 console.log(elem.id)
                                 if(index >= start && index < (start + 16) && index < pubs.length){
                                     return(
                                         <Card title={elem.Title} author={elem.Authors} front_cover={elem.Front_Cover} id={elem.id}/>
                                         )
                                 }
                             })
                         }
                    </Cards>
                    <ViewNextButtonContainer >
                        <View style={{background:"white"}}></View>
                        <NextPrevious>
                            <SkipPreviousRoundedIcon onClick={leftClick}/>
                            <SkipNextRoundedIcon onClick={rightClick}/>
                        </NextPrevious>
                        <View style={{background:"white"}}></View>
                    </ViewNextButtonContainer>
                </Container>
             )
            break;
        case 'VERIFIED':
        case 'ADMIN':
        case 'MODERATOR':
            return (
                <Container>
                    <BookTitleContainer><h1>Publications</h1></BookTitleContainer>
                    <ViewNextButtonContainer >
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
                    <Cards>
                         {
                             pubs.map((elem, index) => {
                                 if(index >= start && index < (start + 16) && index < pubs.length){
                                     return(
                                        <CardDiv>
                                            <Card title={elem.Title} author={elem.Authors} front_cover={elem.Front_Cover} id={elem.id}/>
                                        </CardDiv>
                                    )
                                 }
                             })
                         }
                    </Cards>
                    
                    <ViewNextButtonContainer >
                        <View style={{background:"white"}}></View>
                        <NextPrevious>
                            <SkipPreviousRoundedIcon onClick={leftClick}/>
                            <SkipNextRoundedIcon onClick={rightClick}/>
                        </NextPrevious>
                        <View style={{background:"white"}}></View>
                    </ViewNextButtonContainer>
                </Container>
            )
            break;
            default:
                return (<div></div>)
    }
}

export default Publications

const BookTitleContainer = styled.div`
    background: #0A3977;
    border-radius:20px;
    color:white;
    min-width: 55%;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top: 2%;

margin-bottom: 2%;
`

const Container = styled.div`
    width:90%;
    height:90%;
    margin-left:3%;
    margin-right:3%;
    margin-top:5%;
    margin-bottom:3%;
    @media only screen and (max-width: 1200px) {
        top-margin: 5%;
        height:90%;
    }
    background: white;
`
const ViewNextButtonContainer = styled.div`
    display:flex;
    margin-left:2%;
    margin-right:2%;
    justify-content:space-between;
    align-items:center;
    `

const DropdownDiv = styled.div`
    position:relative;
    top:-85%;
    @media only screen and (max-width: 1000px) {
        top:-100%;
    }
    
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
`

const ViewText = styled.h4`
    z-index:2;
    display:flex;
    justify-content:center;
    align-items:center;
    text-align: center;
    cursor: pointer;
`
const View = styled.div`
    background:#3B058B;
    width:10%;
    height:30px;
    color:white;
    border-radius:6px;
    margin-top:1%;
    cursor: pointer;

    
`
const GuestNextPrevious = styled.h4`
    margin-top:1%;
    margin-right:48.5%;
    cursor: pointer;
`

const NextPrevious = styled.h4`
    margin-top:1%;
    cursor: pointer;
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
const Cards = styled.div`
    margin-top:4%;
    margin-bottom:4%;
    display:flex;
    flex-basis:10%;
    flex-flow: row wrap;
    background:#DCF2F8;
    height: auto;
    @media only screen and (max-width: 1200px) {
        height:auto;
        display:flex;
        justify-content:left;
        flex-wrap:wrap;
        flex:1;
        padding-bottom: 5%;
    }
    padding-bottom: 4%;

    
`

const CardDiv = styled.div`
    margin: 2% 2% 2% 2%;
    padding: 1% 1% 1% 1%;

    @media only screen and (max-width: 670px) {
        padding: 3% 3% 3% 3%;
        margin: 4% 4% 4% 4%;
    }
`