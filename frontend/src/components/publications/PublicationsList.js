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

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
    }
    }
}
}

function PublicationsList() {

	 const { id } = useParams();
    
    const [pubs, setPubs] = useState([{'id' : 0, 'Title' : '', 'Authors' : '', 'Publisher' : '', 'Edition_Number' : 0, 'Year_Publication' : 0, 'Lang' : '', 'ISBN' : 0, 'Description' : '', 'Reason_for_Best_Pub' : '' ,'Front_Cover' : '../images/publications/Screenshot_1.png'}])
    function getData(){
        console.log("jjj");
         let url = "api/main/catalogue_list/" + id
         console.log(url, "edfghtuehhe")
         axios.get(url).then((res) => {
             setPubs(res.data)
         })
         .catch(error => console.log('Error:', error))
     }
 
     useEffect(() => {
         getData()
         //setParams(useParams())
     }, [])

    return (
        <Container>

        
            <Heading>
                <Background>
                Publications
                </Background>
            </Heading>

            <Sort>
            <div class="dropdown">
                <button onclick="myFunction()" class="dropbtn">Dropdown</button>
                <div id="myDropdown" class="dropdown-content">
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
            </div>
                <Nextpage>

                
                    <PlayCircleFilledIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                    <PlayCircleFilledIcon style = {{color: "#0A3977", marginLeft:'10px',alignItems:'center'}}/>
                    </Nextpage>
            </Sort>

            <Colour>
            

            <Results>
                {
                    pubs.map((elem, index) => {
                        if(index < 8){
                            return(
                                <LinearCard title={elem.Title} author={elem.Authors} front={elem.Front_Cover} id={elem.id}/>
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

const Results = styled.div`
padding-top:20px;
padding-left:20px;
    width:1100px;
    height:1600px;
    display:grid;
    grid-template-rows: 200px 200px 200px 200px;//one 200px for each card, should be bigger than the card
`
const Container = styled.div`

`
const Nextpage = styled.div`
display:flex;
    flex-direction:row;
    margin-left: 260px;

`

const Sort = styled.div`
margin-top:15px;
margin-bottom:15px;
display:flex;
    flex-direction:row;
`

const Colour = styled.div`
margin-left: 100px;
background: #DCF2F8;
width:1140px;
height:1700px;
border-radius: 20px;
`

const Heading = styled.div`
margin-left: 120px;
`
const Background = styled.div`

border-radius: 20px 20px 20px 20px;
color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    width:1100px;
    height:80px;
    background: #0A3977;
    left: 8.56%;
    font-family: Manrope;
font-style: normal;
font-weight: bold;
font-size: 45px;
line-height: 142%;
right: 8.43%;
top: 9.11%;
bottom: 87.28%;
    
`
const Text = styled.h3`
width: 769px;
height: 62px;

font-family: Manrope;
font-style: normal;
font-weight: bold;
font-size: 45px;
line-height: 142%;

text-align: center;
letter-spacing: 0.005em;
font-feature-settings: 'tnum' on, 'lnum' on;

color: black;
`