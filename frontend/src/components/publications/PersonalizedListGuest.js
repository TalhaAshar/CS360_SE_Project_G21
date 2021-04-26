import React from 'react'
import styled from 'styled-components'
import Card from '../Cards'
import { useEffect, useState } from "react";
import { useParams} from "react-router-dom"
import axios from 'axios';
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
import LowPriorityIcon from '@material-ui/icons/LowPriority';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function PersonalizedListGuest() {

    const { id } = useParams();  
    const [pubs, setPubs] = useState([])
    const [user, setUser] = useState('No Publications')
    const [start, setStart] = useState(0)

    useEffect(() => {
        let isComponentMounted = true;
        let url = "api/accounts/list/" + id
        axios.get(url).then((res) => {
            if(res.data.length > 0){
                setPubs(res.data)
                setUser(res.data[0]["ListOwner"]["username"] + "\'s List")
            }
            else{
                setPubs(res.data)
                setUser("No Publications")
            }
        })
        .catch(error => console.log('Error:', error))
        return () => {
            isComponentMounted = false;
        }
    }, [id])

    function leftClick(){
        if(start > 0){
            setStart(start - 8)
            window.scrollTo(0, 0)
        }
    }

    function rightClick(){
        if(start + 8 < pubs.length){
            setStart(start + 8)
            window.scrollTo(0, 0)
        }
    }

    return (
        <Container>
            <BookTitleContainer><h1>{user}</h1></BookTitleContainer>
            {(pubs.length > 0) &&<NextButtonContainer>
                 <NextPrevious>
                     <SkipPreviousRoundedIcon onClick={leftClick}/>
                     <SkipNextRoundedIcon onClick={rightClick}/>
                 </NextPrevious>
            </NextButtonContainer>}
            <RecentAdditionContainer>
 
            
            <Cards>
                 {
                     
                     pubs.map((elem, index) => {
                         if(index < 16){
                             return(
                                 <Card key={elem.id} title={elem.ListPub["Title"]} author={elem.ListPub["Authors"]} front_cover={elem.ListPub["Front_Cover"]} id={elem.ListPub["id"]}/>
                                 )
                         }
                         console.log(index)
                     })
                 }
                 {(pubs.length == 0) && <LowPriorityIcon style={{
                            color:"black",
                            fontSize:200,
                            marginLeft:"40%"                       
                            }}
                />}
                {(pubs.length == 0) && <IconText>There are no publications in your list.</IconText>}
            </Cards>
            </RecentAdditionContainer>
        </Container>
     )
 }
 
 const RecentAdditionContainer = styled.div`
     
 `
 
 const BookTitleContainer = styled.div`
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
 
 export default PersonalizedListGuest
 
 const Container = styled.div`
    margin-top:3%;
    margin-bottom:3%;
    background: white;
 `
 const NextButtonContainer = styled.div`
     display:flex;
     
    
 `
 
 const NextPrevious = styled.h4`
 cursor: pointer;
 display:flex;
 flex-direction:row;
 padding-bottom: 3%;
 margin: 0 auto;
 `
 const UserNameContainer = styled.div`
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
 margin-left:3%;
 margin-right:3%;
     margin-top:20px;
     margin-bottom:20px;
     display:grid;
     display:flex;
     flex-flow:row wrap;
     grid-template-rows: 375px 375px 375px 375px;
     grid-template-columns: 250px 250px 250px 250px;
     background:#DCF2F8;
 
 `
 
 const IconText = styled.h5`
color:black;
min-width: 55%;
display:flex;
justify-content:center;
align-items:center;
margin-left: 5%;
margin-right: 5%;
font-size: 35px;
margin: 0 auto;
`