import React from 'react'
import styled from 'styled-components'
import Card from '../Cards'
import {useEffect, useState} from "react";
import axios from 'axios';
import { useLocation, useParams} from "react-router-dom"
import ViewPub from './ViewPublications'
import EditPub from './PubEditDropDown'
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function Publications(props) {
    const { id } = useParams();
    const [pubs, setPubs] = React.useState([{'id' : 0, 'Title' : '', 'Authors' : '', 'Front_Cover' : '../images/publications/Screenshot_1.png'}])
    const [flag, setFlag] = React.useState(props.logged)
    
    const [PopView, setPopView] = useState(false)
    const [PopEdit, setPopEdit] = useState([false, false,false, false,false, false,false, false,false, false,false, false,false, false,false, false])    
    const [start, setStart] = useState(0)

    useEffect(() => {
        //getData(id)
        let isComponentMounted = true;
        let url = "api/main/catalogue_columnar/"
        axios.get(url).then((res) => {
            if (isComponentMounted){
                setPubs(res.data)
                console.log('ye boi', res.data)
                console.log('nu boi', pubs.length)
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
            setStart(start - 16)
        }
    }

    function rightClick(){
        if(start + 16 < pubs.length){
            setStart(start + 16)
        }
    }

    switch (flag) {
        case 'Unauthentic':
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
                            <View style = {{width:"15%"}}>
                                <ViewText>Add Publication</ViewText>
                            </View>
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
                 
                </Container>
             )
            break;
        case 'Authentic':
            return (
                <Container>
                    
                    <PublicationTitle>
                        <Heading>Publications</Heading>
                    </PublicationTitle>
                    <ViewNextButtonContainer >
                            <View onClick = {handleClick} onMouseLeave={handleClick}>
                                <ViewText>View</ViewText>
                            <Svg  width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 20L0.411545 0.5H31.5885L16 20Z" fill="#66CEF2"/>
                            </Svg>
                            <ViewPopContainer >
                            <ViewPub className = "view" trigger={PopView} setTrigger={handleClick}/>
                            </ViewPopContainer>
                            </View>
                            <NextPrevious>
                                <SkipPreviousRoundedIcon/>
                                <SkipNextRoundedIcon/>
                            </NextPrevious>
                            <View style = {{width:"15%"}}>
                                <ViewText>Add Publication</ViewText>
                            </View>
                    </ViewNextButtonContainer>
                    <Cards>
                         {
                             pubs.map((elem, index) => {
                                 console.log(elem.id)
                                 if(index >= start && index < (start + 16) && index < pubs.length){
                                     return(
                                        <CardContent>
                                            <Card title={elem.Title} author={elem.Authors} front_cover={elem.Front_Cover} id={elem.id}/>
                                            <CardSvg onClick = {() => editClick(index)} width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16 20L0.411545 0.5H31.5885L16 20Z" fill="#66CEF2"/>
                                                <PopContainer>
                                                <EditPub className = "view" trigger={PopEdit[index]} setTrigger={() => editClick(index)} id={elem.id}/>
                                                </PopContainer>
                                            </CardSvg>
                                            
                                        </CardContent>
                                         )

                                 }
                             })
                         }
                    </Cards>
                 
                </Container>
            )
        break;
        default:
            return (
                <Container>
                    
                    <PublicationTitle>
                        <Heading>Publications</Heading>
                    </PublicationTitle>
                    <ViewNextButtonContainer>
                            <View onClick = {handleClick} onMouseLeave={handleClick}>
                                <ViewText>View</ViewText>
                            <Svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 20L0.411545 0.5H31.5885L16 20Z" fill="#66CEF2"/>
                            </Svg>
                            <ViewPopContainer>
                            <ViewPub className = "view" trigger={PopView} setTrigger={handleClick}/>
                            </ViewPopContainer>
                            </View>
                            <NextPrevious>
                                <SkipPreviousRoundedIcon/>
                                <SkipNextRoundedIcon/>
                            </NextPrevious>
                            <View style = {{width:"15%"}}>
                                <ViewText>Add Publication</ViewText>
                            </View>
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
                 
                </Container>
             )
    }
    
}

export default Publications

const Container = styled.div`
    max-width:100%;
    max-height:100%;
    margin-left:3%;
    margin-right:3%;
    @media only screen and (max-width: 1200px) {
        height:auto;
    }
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
    margin-left:1.3%;
    margin-right:1.3%;
    margin-top:4%;
    margin-bottom:4%;
    display:flex;
    flex-basis:10%;
    flex-flow: row wrap;
    background:#DCF2F8;
    @media only screen and (max-width: 1200px) {
        height:auto;
        display:flex;
        justify-content:left;
        flex-wrap:wrap;
        flex:1;
        background:black;
    }

`
const CardContent = styled.div`
    margin-left:2%;
    margin-right:2%;
    margin-top:2%;
    margin-bottom:2%;
    padding-right:1%;
    padding-bottom:2%;
    padding-right: 2%;
`
const PopContainer = styled.div`
    position:relative;
    z-index:2;
    left:1%;
    bottom:1%;
`

const CardSvg = styled.svg`
    position:relative;
    bottom:91%;
    left:85%;
    z-index:1;

`
