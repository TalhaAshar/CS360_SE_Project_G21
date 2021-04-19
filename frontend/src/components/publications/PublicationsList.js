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

    const [PopView, setPopView] = useState(false)
    const [PopEdit, setPopEdit] = useState([false, false,false, false,false, false,false, false,false, false,false, false,false, false,false, false])    
    
    useEffect(() => {
        let isComponentMounted = true;
        let url = "api/main/catalogue_list/"
        axios.get(url).then((res) => {
            if (isComponentMounted){
                setPubs(res.data)
            };
        })
        .catch(error => console.log('Error:', error))
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

    return (
        <Container>

        
            <PublicationTitle>
                <Heading>Publications</Heading>
            </PublicationTitle>
            <ViewNextButtonContainer>
                    <View onClick = {handleClick} onMouseLeave={handleClick}>
                                <ViewText>View</ViewText>
                            <Svg  width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 20L0.411545 0.5H31.5885L16 20Z" fill="#66CEF2"/>
                            </Svg>
                            <ViewPopContainer>
                            <ViewPub className = "view" trigger={PopView} setTrigger={handleClick}/>
                            </ViewPopContainer>
                            </View>
                            <NextPrevious>
                                <SkipPreviousRoundedIcon onClick={leftClick}/>
                                <SkipNextRoundedIcon onClick={rightClick}/>
                            </NextPrevious>
                            <Link to="/addpublication">
                                <View style = {{width:"15%"}}>
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
                                <NewLinearCard title={elem.Title} author={elem.Authors} front={elem.Front_Cover} id={elem.id}/>
                                )
                        }
                        console.log(index)
                    })
                }
            </Results>
            </Colour>
        </Container>
    )
}

export default PublicationsList


const Container = styled.div`
    max-width:100%;
    max-height:100%;
    margin-left:3%;
    margin-right:3%;
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
    padding-left:13%;
    width:1100px;
    height:1600px;
    display:grid;
    grid-template-rows: 200px 200px 200px 200px;//one 200px for each card, should be bigger than the card
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
left:30%;
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
