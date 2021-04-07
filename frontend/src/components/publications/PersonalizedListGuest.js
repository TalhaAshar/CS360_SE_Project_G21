import React from 'react'
import styled from 'styled-components'
import Card from '../Cards'
import { useEffect, useState } from "react";
import { useParams} from "react-router-dom"
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function PersonalizedListGuest() {

    const { id } = useParams();  
    const [pubs, setPubs] = useState([{'id' : 0, 'ListOwner' : {}, 'ListPub' : {}, 'Status' : ''}])
    const [user, setUser] = useState('')

    function getData(id){
        let url = "api/accounts/list/" + id
        axios.get(url).then((res) => {
            setPubs(res.data)
            console.log(res.data)
            setUser(res.data[0]["ListOwner"]["username"])
        })
        
        .catch(error => console.log('Error:', error))
    }

    useEffect(() => {
        getData(id)
    }, [id])

    return (
       <Container>
           <UserNameContainer>
               <Heading>{user}</Heading>
           </UserNameContainer>
           <NextButtonContainer>
                    <NextPrevious>Buttons</NextPrevious>
           </NextButtonContainer>
           <Cards>
                {
                    
                    pubs.map((elem, index) => {
                        if(index < 16){
                            return(
                                <Card title={elem.ListPub["Title"]} author={elem.ListPub["Authors"]} front_cover={elem.ListPub["Front_Cover"]} id={elem.ListPub["id"]}/>
                                )
                        }
                        console.log(index)
                    })
                }
                
           </Cards>
       </Container>
    )
}

export default PersonalizedListGuest

const Container = styled.div`
    width:1200px;
    max-height:2500px;
`
const NextButtonContainer = styled.div`
    display:flex;
    margin-left:150px;
   
`

const NextPrevious = styled.h4`
    margin-left:470px;
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
    margin-left:150px;
    margin-right:50px;
    margin-top:20px;
    margin-bottom:20px;
    display:grid;
    grid-template-rows: 375px 375px 375px 375px;
    grid-template-columns: 250px 250px 250px 250px;
    background:#DCF2F8;

`
