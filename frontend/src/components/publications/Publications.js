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

function Publications() {
    const { id } = useParams();
    const [pubs, setPubs] = React.useState([{'id' : 0, 'Title' : '', 'Authors' : '', 'Front_Cover' : '../images/publications/Screenshot_1.png'}])
    const [flag, setFlag] = React.useState(false)
    
    const [PopView, setPopView] = useState(false)
    const [PopEdit, setPopEdit] = useState(false)    
    
    function getData(id){
        let url = "api/main/catalogue_columnar/" + id
        console.log(url)
        axios.get(url).then((res) => {
            setPubs(res.data)
            console.log('ye boi', res.data)
            console.log('nu boi', pubs.length)
        })
        .catch(error => console.log('Error:', error))
    }

    useEffect(() => {
        getData(id)
    }, [id])
    
    
    
    const handleClick = () =>{
        setPopView(!PopView)
    }
    const editClick = () =>{
        setPopEdit(!PopEdit)
    }

    switch (flag) {
        case false:
            return (
                <Container>
                    
                    <PublicationTitle>
                        <Heading>Publications</Heading>
                    </PublicationTitle>
                    <ViewNextButtonContainer>
                             <View>View</View>
                             <NextPrevious>Buttons</NextPrevious>
                    </ViewNextButtonContainer>
                    <Cards>
                         {
                             pubs.map((elem, index) => {
                                 console.log(elem.id)
                                 if(index < 16){
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
        case true:
            return (
                <div>IT REAALLY WORKS BRO</div>
            )
        break;
        default:
            return (
                <Container>
                    
                    <PublicationTitle>
                        <Heading>Publications</Heading>
                    </PublicationTitle>
                    <ViewNextButtonContainer>
                            <View>
                                <ViewText>View</ViewText>
                            <Svg onClick = {handleClick} width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 20L0.411545 0.5H31.5885L16 20Z" fill="#66CEF2"/>
                            </Svg>
                            <ViewPopContainer>
                            <EditPub className = "view" trigger={PopView} setTrigger={handleClick}/>
                            </ViewPopContainer>
                            </View>
                            <NextPrevious>
                                <SkipPreviousRoundedIcon/>
                                <SkipNextRoundedIcon/>
                            </NextPrevious>
                    </ViewNextButtonContainer>
                    <Cards>
                         {
                             pubs.map((elem, index) => {
                                 console.log(elem.id)
                                 if(index < 16){
                                     return(
                                        <CardContent>
                                            <Card title={elem.Title} author={elem.Authors} front_cover={elem.Front_Cover} id={elem.id}/>
                                            <CardSvg onClick = {handleClick} width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16 20L0.411545 0.5H31.5885L16 20Z" fill="#66CEF2"/>
                                            </CardSvg>
                                            <PopContainer>
                                            <ViewPub className = "view" trigger={PopEdit} setTrigger={editClick}/>
                                            </PopContainer>
                                        </CardContent>
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
    width:1200px;
    max-height:2500px;
`
const ViewNextButtonContainer = styled.div`
    display:flex;
    margin-left:150px;
   
`
const Svg = styled.svg`
    position:relative;
    top:-5.49px;
    right:-14px;
`
const ViewPopContainer = styled.div`
position:relative;
top:58px;
left:6px;
z-index:1;
`

const ViewText = styled.h4`
    z-index:2;
`
const View = styled.h4`
    background:#3B058B;
    width:110px;
    height:30px;
    color:white;
    border-radius:6px;
    margin-top:10px;
    display:flex;
    justify-content:center;
    align-items:center;
`
const NextPrevious = styled.h4`
    margin-left:330px;
    margin-top:10px;
`

const PublicationTitle = styled.div`
    background: #0A3977;
    margin-left:150px;
    margin-right:150px;
    margin-top:20px;
    width:600px;
    color:white;
    border-radius:12px;
    height:50px;
    width:1000px;
    display:flex;
    align-items:center;
    justify-content:center;

`

const Heading = styled.h3`
    display:flex;
    align-items:center;
    justify-content:center;
`
const Cards = styled.div`
    margin-left:150px;
    margin-right:50px;
    margin-top:20px;
    margin-bottom:20px;
    display:grid;
    grid-template-rows: 375px 375px 375px 375px;
    grid-template-columns: 250px 250px 250px 250px;
    background:#DCF2F8;

`
const CardContent = styled.div`

`
const PopContainer = styled.div`
    position:relative;
    left:40px;
    bottom:399px;
    z-index:2;
`

const CardSvg = styled.svg`
    position:relative;
    bottom:373px;
    left:200px;
    z-index:1;

`